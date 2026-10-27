/* Small generative line drawings, one per project. Used where a project has no screenshots. */
(() => {
  "use strict";
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const pad = (n, l = 2) => String(n).padStart(l, "0");

  window.PATTERNS = {
    rings(c, w, h, t) {
      const cx = w / 2, cy = h / 2;
      for (let i = 1; i <= 7; i++) {
        c.globalAlpha = 0.15 + i * 0.08;
        c.beginPath();
        c.arc(cx, cy, i * Math.min(w, h) * 0.065, 0, Math.PI * 2);
        c.stroke();
      }
      const a = t * 1.4;
      c.globalAlpha = 1;
      c.lineWidth = 3;
      c.beginPath();
      c.arc(cx, cy, Math.min(w, h) * 0.455, a, a + 1.2);
      c.stroke();
      c.lineWidth = 1;
      const ex = cx + Math.cos(a + 1.2) * Math.min(w, h) * 0.455;
      const ey = cy + Math.sin(a + 1.2) * Math.min(w, h) * 0.455;
      c.fillRect(ex - 4, ey - 4, 8, 8);
      c.font = "10px JetBrains Mono, monospace";
      c.fillText("EXIT WINDOW " + (Math.abs(Math.sin(t * 0.5)) * 48).toFixed(1) + "H", 12, 18);
    },
    pitch(c, w, h, t) {
      const m = 14;
      c.globalAlpha = 0.5;
      c.strokeRect(m, m, w - m * 2, h - m * 2);
      c.beginPath();
      c.moveTo(w / 2, m);
      c.lineTo(w / 2, h - m);
      c.stroke();
      c.beginPath();
      c.arc(w / 2, h / 2, h * 0.16, 0, Math.PI * 2);
      c.stroke();
      c.strokeRect(m, h / 2 - h * 0.22, w * 0.12, h * 0.44);
      c.strokeRect(w - m - w * 0.12, h / 2 - h * 0.22, w * 0.12, h * 0.44);
      c.globalAlpha = 1;
      const players = 9;
      const pts = [];
      for (let i = 0; i < players; i++) {
        const x = w * (0.15 + 0.7 * ((i * 0.37 + Math.sin(t * 0.4 + i) * 0.05 + 1) % 1));
        const y = h * (0.2 + 0.6 * ((i * 0.61 + Math.cos(t * 0.5 + i * 2) * 0.05 + 1) % 1));
        pts.push([x, y]);
        c.fillRect(x - 3, y - 3, 6, 6);
      }
      const k = Math.floor(t * 0.8) % players;
      const [ax, ay] = pts[k];
      for (let j = 1; j <= 3; j++) {
        const [bx, by] = pts[(k + j * 2) % players];
        c.globalAlpha = j === 1 ? 1 : 0.3;
        c.setLineDash(j === 1 ? [] : [4, 4]);
        c.beginPath();
        c.moveTo(ax, ay);
        c.lineTo(bx, by);
        c.stroke();
      }
      c.setLineDash([]);
      c.globalAlpha = 1;
    },
    steps(c, w, h, t) {
      const n = 7, gap = 8, bw = (w - 24 - gap * (n - 1)) / n;
      const active = Math.floor(t * 1.2) % (n + 2);
      for (let i = 0; i < n; i++) {
        const x = 12 + i * (bw + gap), y = h * 0.3, bh = h * 0.4;
        c.globalAlpha = 1;
        c.strokeRect(x, y, bw, bh);
        if (i < active) c.fillRect(x + 3, y + 3, bw - 6, bh - 6);
        if (i === active) {
          const p = (t * 1.2) % 1;
          c.fillRect(x + 3, y + bh - 3 - (bh - 6) * p, bw - 6, (bh - 6) * p);
        }
      }
      c.font = "10px JetBrains Mono, monospace";
      c.fillText("STEP " + Math.min(active + 1, n) + "/7 · CAMERA OK", 12, 18);
    },
    scan(c, w, h, t) {
      c.globalAlpha = 0.4;
      for (let i = 0; i < 6; i++) c.strokeRect(w * 0.2 + i * 6, h * 0.22 + i * 4, w * 0.6 - i * 12, h * 0.5 - i * 8);
      c.globalAlpha = 1;
      const y = h * 0.15 + ((t * 0.5) % 1) * h * 0.7;
      c.fillRect(0, y, w, 1);
      c.globalAlpha = 0.12;
      c.fillRect(0, y - 20, w, 20);
      c.globalAlpha = 1;
      const on = Math.sin(t * 2) > 0;
      if (on) {
        const bx = w * 0.56, by = h * 0.4;
        c.lineWidth = 2;
        c.strokeRect(bx, by, w * 0.14, h * 0.18);
        c.lineWidth = 1;
        c.font = "10px JetBrains Mono, monospace";
        c.fillText("DEFECT 0.86", bx, by - 6);
      }
      c.font = "10px JetBrains Mono, monospace";
      c.fillText(on ? "FIX IT · STEP LOCKED" : "CHECKING…", 12, 18);
    },
    diff(c, w, h, t) {
      const rows = 12, rh = (h - 40) / rows;
      for (let i = 0; i < rows; i++) {
        const base = 0.25 + 0.6 * Math.abs(Math.sin(i * 1.7));
        const changed = i === (Math.floor(t * 0.7) % rows);
        c.globalAlpha = 0.7;
        c.fillRect(12, 28 + i * rh, (w / 2 - 24) * base, rh - 4);
        c.globalAlpha = changed ? 1 : 0.7;
        const nb = changed ? base * (0.4 + 0.3 * Math.sin(t * 6)) : base;
        c.fillRect(w / 2 + 12, 28 + i * rh, (w / 2 - 24) * nb, rh - 4);
        if (changed) c.strokeRect(w / 2 + 8, 26 + i * rh, w / 2 - 16, rh);
      }
      c.globalAlpha = 1;
      c.font = "10px JetBrains Mono, monospace";
      c.fillText("BASELINE", 12, 16);
      c.fillText("CANDIDATE", w / 2 + 12, 16);
    },
    graph(c, w, h, t) {
      const nodes = [];
      for (let i = 0; i < 6; i++) {
        const col = i % 3, row = (i / 3) | 0;
        nodes.push([w * (0.2 + col * 0.3), h * (0.32 + row * 0.38)]);
      }
      const edges = [[0, 1], [1, 2], [3, 4], [4, 5], [0, 3], [1, 4], [2, 5], [0, 4], [3, 2]];
      const bad = 8;
      edges.forEach(([a, b], i) => {
        const isBad = i === bad;
        c.globalAlpha = isBad ? (Math.sin(t * 5) > 0 ? 1 : 0.15) : 0.45;
        c.setLineDash(isBad ? [5, 4] : []);
        c.lineWidth = isBad ? 2 : 1;
        c.beginPath();
        c.moveTo(...nodes[a]);
        c.lineTo(...nodes[b]);
        c.stroke();
      });
      c.setLineDash([]);
      c.lineWidth = 1;
      c.globalAlpha = 1;
      nodes.forEach(([x, y], i) => {
        c.fillStyle = "#000";
        c.fillRect(x - 9, y - 9, 18, 18);
        c.fillStyle = "#fff";
        c.strokeRect(x - 9, y - 9, 18, 18);
        if (i === 2) c.fillRect(x - 5, y - 5, 10, 10);
      });
      c.font = "10px JetBrains Mono, monospace";
      c.fillText("reporting → finance-db  EXPOSED", 12, 18);
    },
    bars(c, w, h, t) {
      const n = 14, bw = (w - 24) / n;
      for (let i = 0; i < n; i++) {
        const v = 0.15 + 0.75 * Math.abs(Math.sin(i * 0.9 + t * 0.9));
        c.globalAlpha = i <= (Math.floor(t * 2) % n) ? 1 : 0.25;
        c.fillRect(12 + i * bw, h - 12 - (h - 40) * v, bw - 4, (h - 40) * v);
      }
      c.globalAlpha = 1;
      c.font = "10px JetBrains Mono, monospace";
      c.fillText("PHASE " + pad((Math.floor(t * 2) % n) + 1) + " / 14", 12, 18);
    },
    radar(c, w, h, t) {
      const cx = w / 2, cy = h / 2, R = Math.min(w, h) * 0.42;
      c.globalAlpha = 0.35;
      for (let i = 1; i <= 3; i++) {
        c.beginPath();
        c.arc(cx, cy, (R * i) / 3, 0, Math.PI * 2);
        c.stroke();
      }
      c.beginPath();
      c.moveTo(cx - R, cy);
      c.lineTo(cx + R, cy);
      c.moveTo(cx, cy - R);
      c.lineTo(cx, cy + R);
      c.stroke();
      const a = t * 1.6;
      for (let k = 0; k < 24; k++) {
        c.globalAlpha = (1 - k / 24) * 0.5;
        c.beginPath();
        c.moveTo(cx, cy);
        c.arc(cx, cy, R, a - k * 0.03 - 0.03, a - k * 0.03);
        c.closePath();
        c.fill();
      }
      c.globalAlpha = 1;
      [[0.5, 0.3], [-0.4, 0.6], [0.2, -0.7]].forEach(([dx, dy], i) => {
        const ang = Math.atan2(dy, dx);
        const diff = ((a - ang) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2);
        c.globalAlpha = clamp(1 - diff / 3, 0.15, 1);
        c.fillRect(cx + dx * R - 4, cy + dy * R - 4, 8, 8);
        if (diff < 0.6) {
          c.font = "10px JetBrains Mono, monospace";
          c.fillText(["FRONT DOOR", "REAR DOOR", "DRIVEWAY"][i], cx + dx * R + 8, cy + dy * R - 6);
        }
      });
      c.globalAlpha = 1;
    },
    waves(c, w, h, t) {
      for (let k = 0; k < 6; k++) {
        c.globalAlpha = 0.2 + k * 0.14;
        c.beginPath();
        for (let x = 0; x <= w; x += 4) {
          const y = h * 0.25 + k * h * 0.1 + Math.sin(x * 0.03 + t * (1 + k * 0.2) + k) * (6 + k * 2);
          x ? c.lineTo(x, y) : c.moveTo(x, y);
        }
        c.stroke();
      }
      c.globalAlpha = 1;
      c.font = "10px JetBrains Mono, monospace";
      c.fillText("CH₄ → tCO₂-e → ACCU", 12, 18);
    },
    compass(c, w, h, t) {
      const cx = w / 2, cy = h / 2, R = Math.min(w, h) * 0.4;
      for (let i = 0; i < 60; i++) {
        const a = (i / 60) * Math.PI * 2 + t * 0.15;
        const l = i % 5 ? 6 : 14;
        c.globalAlpha = i % 5 ? 0.4 : 1;
        c.beginPath();
        c.moveTo(cx + Math.cos(a) * R, cy + Math.sin(a) * R);
        c.lineTo(cx + Math.cos(a) * (R - l), cy + Math.sin(a) * (R - l));
        c.stroke();
      }
      c.globalAlpha = 1;
      const a = Math.sin(t * 0.9) * 1.2 - Math.PI / 2;
      c.lineWidth = 2;
      c.beginPath();
      c.moveTo(cx, cy);
      c.lineTo(cx + Math.cos(a) * R * 0.8, cy + Math.sin(a) * R * 0.8);
      c.stroke();
      c.lineWidth = 1;
      c.fillRect(cx - 4, cy - 4, 8, 8);
    },
    arc(c, w, h, t) {
      const cx = w / 2, cy = h * 0.72, R = Math.min(w, h) * 0.42;
      const p = (Math.sin(t * 0.8) + 1) / 2;
      c.lineWidth = 3;
      c.beginPath();
      c.arc(cx, cy, R, Math.PI, Math.PI + Math.PI * (0.2 + 0.8 * p));
      c.stroke();
      c.lineWidth = 1;
      for (let i = 0; i < 5; i++) {
        const bh = R * (0.25 + 0.12 * i) * (0.6 + 0.4 * p);
        c.fillRect(cx - R * 0.5 + i * R * 0.22, cy - bh, R * 0.12, bh);
      }
      c.globalAlpha = 0.4;
      c.beginPath();
      c.moveTo(12, cy);
      c.lineTo(w - 12, cy);
      c.stroke();
      c.globalAlpha = 1;
    },
    path(c, w, h, t) {
      const path = [[0, 0.3], [0.3, 0.3], [0.3, 0.7], [0.65, 0.7], [0.65, 0.35], [1, 0.35]].map(([x, y]) => [x * w, y * h]);
      c.globalAlpha = 0.5;
      c.lineWidth = 14;
      c.beginPath();
      path.forEach(([x, y], i) => (i ? c.lineTo(x, y) : c.moveTo(x, y)));
      c.stroke();
      c.lineWidth = 1;
      c.globalAlpha = 1;
      c.strokeStyle = "#000";
      c.beginPath();
      path.forEach(([x, y], i) => (i ? c.lineTo(x, y) : c.moveTo(x, y)));
      c.stroke();
      c.strokeStyle = "#fff";
      const lens = [];
      let L = 0;
      for (let i = 1; i < path.length; i++) {
        const d = Math.hypot(path[i][0] - path[i - 1][0], path[i][1] - path[i - 1][1]);
        lens.push(d);
        L += d;
      }
      for (let e = 0; e < 5; e++) {
        let s = ((t * 50 + e * L / 5) % L);
        let i = 0;
        while (s > lens[i]) s -= lens[i++];
        const [x1, y1] = path[i], [x2, y2] = path[i + 1];
        const f = s / lens[i];
        c.fillRect(x1 + (x2 - x1) * f - 4, y1 + (y2 - y1) * f - 4, 8, 8);
      }
      [[0.18, 0.5], [0.48, 0.5], [0.82, 0.55]].forEach(([x, y]) => {
        c.strokeRect(x * w - 8, y * h - 8, 16, 16);
        c.beginPath();
        c.moveTo(x * w - 8, y * h - 8);
        c.lineTo(x * w + 8, y * h + 8);
        c.stroke();
      });
      c.font = "10px JetBrains Mono, monospace";
      c.fillText("GPA " + (10 - (t * 0.2) % 4.5).toFixed(1), 12, 18);
    },
  };
})();
