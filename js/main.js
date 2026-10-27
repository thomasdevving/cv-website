/* Thomas Nguyen — CV. Vanilla JS, no dependencies. Content comes from data.js. */
(() => {
  "use strict";

  const CV = window.CV;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const lerp = (a, b, t) => a + (b - a) * t;
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const pad = (n, l = 2) => String(n).padStart(l, "0");
  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

  const mouse = { x: innerWidth / 2, y: innerHeight / 2, active: false };
  addEventListener("pointermove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    mouse.active = true;
  }, { passive: true });

  /* ------------------------------------------------------------------------
     Text helpers
     ------------------------------------------------------------------------ */
  let charIndex = 0;
  function splitChars(text, startIndex = 0) {
    return [...text]
      .map((c, i) =>
        c === " "
          ? " "
          : `<span class="char" style="--i:${startIndex + i}">${esc(c)}</span>`
      )
      .join("");
  }

  function splitTitle(el) {
    const words = el.textContent.trim().split(/\s+/);
    charIndex = 0;
    el.setAttribute("aria-label", el.textContent.trim());
    el.innerHTML = words
      .map((w) => {
        const html = `<span class="word" aria-hidden="true">${splitChars(w, charIndex)}</span>`;
        charIndex += w.length;
        return html;
      })
      .join(" ");
  }

  const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*+=/<>";
  function scramble(el, duration = 600) {
    if (reduced) return;
    const final = el.dataset.text || (el.dataset.text = el.textContent);
    const start = performance.now();
    cancelAnimationFrame(el._scr);
    const tick = (now) => {
      const p = clamp((now - start) / duration, 0, 1);
      const reveal = Math.floor(p * final.length);
      let out = "";
      for (let i = 0; i < final.length; i++) {
        const c = final[i];
        out += i < reveal || c === " " || c === "↗" || c === "↑" ? c : GLYPHS[(Math.random() * GLYPHS.length) | 0];
      }
      el.textContent = out;
      if (p < 1) el._scr = requestAnimationFrame(tick);
    };
    el._scr = requestAnimationFrame(tick);
  }

  /* ------------------------------------------------------------------------
     Render content
     ------------------------------------------------------------------------ */
  function render() {
    $("[data-role]").textContent = CV.role;
    $("[data-study]").textContent = CV.study;
    $("[data-location]").textContent = CV.location;
    $("[data-headline]").textContent = CV.headline;
    $("[data-intro]").textContent = CV.intro;
    $("[data-year]").textContent = new Date().getFullYear();
    $$("[data-link]").forEach((a) => (a.href = CV.links[a.dataset.link]));

    // Hero name, one line per word
    const [first, ...rest] = CV.name.split(" ");
    const name = $("[data-name]");
    name.innerHTML =
      `<span class="line" aria-hidden="true">${splitChars(first, 0)}</span>` +
      `<span class="line" aria-hidden="true">${splitChars(rest.join(" "), first.length)}</span>`;

    // Marquee
    const words = ["AI agents", "Security", "Automation", "Solana", "Verification", "Azure", "Privacy", "Hackathons"];
    const chunk = words.map((w) => `<span class="marquee__item">${esc(w)}</span>`).join("");
    $("[data-marquee]").innerHTML = `<div style="display:inline-flex">${chunk}</div><div style="display:inline-flex">${chunk}</div>`;

    // Principles
    $("[data-principles]").innerHTML = CV.principles
      .map(
        (p, i) => `
        <div class="principle reveal" style="--d:${i * 0.1}s">
          <div class="principle__k"><span>${esc(p.k)}</span><span class="mono">${pad(i + 1)}</span></div>
          <p class="principle__v">${esc(p.v)}</p>
        </div>`
      )
      .join("");

    // Disciplines
    const icons = [
      // agents: three linked nodes
      '<svg viewBox="0 0 28 28" fill="none" stroke="currentColor"><rect x="2" y="2" width="8" height="8"/><rect x="18" y="2" width="8" height="8"/><rect x="10" y="18" width="8" height="8"/><path d="M10 6h8M6 10l6 8M22 10l-6 8"/></svg>',
      // security: shield square
      '<svg viewBox="0 0 28 28" fill="none" stroke="currentColor"><path d="M4 3h20v12L14 25 4 15z"/><path d="M9 13l4 4 7-8"/></svg>',
      // chain: blocks
      '<svg viewBox="0 0 28 28" fill="none" stroke="currentColor"><rect x="2" y="9" width="10" height="10"/><rect x="16" y="9" width="10" height="10"/><path d="M12 14h4"/></svg>',
      // web: window
      '<svg viewBox="0 0 28 28" fill="none" stroke="currentColor"><rect x="2" y="4" width="24" height="20"/><path d="M2 9h24M6 6.5h1M9 6.5h1"/></svg>',
    ];
    $("[data-disciplines]").innerHTML = CV.disciplines
      .map(
        (d, i) => `
        <article class="disc reveal" style="--d:${i * 0.08}s">
          <div class="disc__n mono"><span>${esc(d.n)}</span><span class="disc__icon">${icons[i % icons.length]}</span></div>
          <h3 class="disc__t">${esc(d.t)}</h3>
          <p class="disc__d">${esc(d.d)}</p>
        </article>`
      )
      .join("");

    // Stats
    $("[data-stats]").innerHTML = CV.stats
      .map(
        (s, i) => `
        <div class="stat reveal" style="--d:${i * 0.08}s">
          <span class="stat__v" data-count="${s.v}" data-suffix="${esc(s.s)}">0${esc(s.s)}</span>
          <span class="stat__l mono">${esc(s.l)}</span>
        </div>`
      )
      .join("");

    // Experience
    $("[data-experience]").innerHTML = CV.experience
      .map(
        (j) => `
        <li class="job reveal">
          <span class="job__when mono">${esc(j.when)}</span>
          <div>
            <h3 class="job__role">${esc(j.role)}</h3>
            <span class="job__org">${esc(j.org)}</span>
            ${j.meta ? `<span class="job__meta mono">${esc(j.meta)}</span>` : ""}
          </div>
          <div>
            <p class="job__d">${esc(j.d)}</p>
            <div class="tags">${j.tags.map((t) => `<span class="tag">${esc(t)}</span>`).join("")}</div>
          </div>
        </li>`
      )
      .join("");

    const eduItem = (e, i) => `
      <li class="edu__item reveal" style="--d:${i * 0.08}s">
        <span class="edu__when mono">${esc(e.when)}</span>
        <div><span class="edu__t">${esc(e.t)}</span><span class="edu__o">${esc(e.o)}</span></div>
      </li>`;
    $("[data-education]").innerHTML = CV.education.map(eduItem).join("");
    $("[data-extras]").innerHTML = CV.extras.map(eduItem).join("");

    // Project filters
    const kinds = ["All", ...new Set(CV.projects.map((p) => p.kind))];
    $("[data-filters]").innerHTML = kinds
      .map((k, i) => {
        const n = k === "All" ? CV.projects.length : CV.projects.filter((p) => p.kind === k).length;
        return `<button class="filter" role="tab" aria-selected="${i === 0}" data-filter="${esc(k)}">${esc(k)}<sup>${pad(n)}</sup></button>`;
      })
      .join("");

    // Projects
    $("[data-projects]").innerHTML = CV.projects
      .map(
        (p, i) => `
        <li class="prow reveal" data-kind="${esc(p.kind)}" data-id="${esc(p.id)}">
          <button class="prow__btn" data-open="${i}" data-cursor="Open" aria-haspopup="dialog">
            <span class="prow__idx mono prow__muted">${pad(i + 1)}</span>
            <span class="prow__name">${esc(p.name)}${p.award ? '<span class="prow__award">Winner</span>' : ""}</span>
            <span class="prow__line prow__muted">${esc(p.line)}</span>
            <span class="prow__kind mono prow__muted">${esc(p.kind)} · ${esc(p.year)}</span>
            <span class="prow__arrow" aria-hidden="true">→</span>
          </button>
        </li>`
      )
      .join("");

    // Hackathons
    $("[data-hackathons]").innerHTML = CV.hackathons
      .map(
        (h, i) => `
        <article class="hack reveal${h.win ? " hack--win" : ""}" style="--d:${(i % 4) * 0.07}s">
          <div class="hack__top mono"><span>${pad(i + 1)}</span><span>${esc(h.date)}</span></div>
          ${h.win ? '<span class="hack__trophy" aria-hidden="true">1st</span>' : ""}
          <h3 class="hack__name">${esc(h.name)}</h3>
          <span class="hack__project">→ ${esc(h.project)}</span>
          ${h.result ? `<span class="hack__result mono">${esc(h.result)}</span>` : ""}
        </article>`
      )
      .join("");

    // Stack
    $("[data-stack]").innerHTML = CV.stack
      .map(
        (g, i) => `
        <div class="sgroup reveal" style="--d:${(i % 3) * 0.08}s">
          <div class="sgroup__g mono"><span>${esc(g.g)}</span><span>${pad(g.items.length)}</span></div>
          <ul class="sgroup__items">${g.items.map((t) => `<li data-t="${esc(t)}"><span>${esc(t)}</span></li>`).join("")}</ul>
        </div>`
      )
      .join("");

    $$("[data-split]").forEach(splitTitle);
    $("[data-section-total]").textContent = pad($$("[data-section]").length - 1);
  }

  /* ------------------------------------------------------------------------
     Loader
     ------------------------------------------------------------------------ */
  function runLoader(done) {
    const loader = $(".loader");
    const count = $("[data-loader-count]");
    const bar = $(".loader__bar");
    const total = reduced ? 1 : 1500;
    const start = performance.now();
    const tick = (now) => {
      const p = clamp((now - start) / total, 0, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      count.textContent = pad(Math.round(eased * 100), 3);
      bar.style.setProperty("--p", eased);
      if (p < 1) return requestAnimationFrame(tick);
      setTimeout(() => {
        loader.classList.add("is-done");
        document.body.classList.remove("is-loading");
        done();
        setTimeout(() => loader.remove(), 1200);
      }, reduced ? 0 : 180);
    };
    requestAnimationFrame(tick);
  }

  /* ------------------------------------------------------------------------
     Hero field: a grid of squares that bends away from the cursor and
     breathes on a slow interference wave.
     ------------------------------------------------------------------------ */
  function heroField() {
    const canvas = $(".hero__canvas");
    const ctx = canvas.getContext("2d");
    const hero = $(".hero");
    let w, h, dpr, pts = [], visible = true;
    const pointer = { x: -9999, y: -9999 };

    function resize() {
      dpr = Math.min(devicePixelRatio || 1, 2);
      w = hero.clientWidth;
      h = hero.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const gap = w < 600 ? 22 : 30;
      pts = [];
      for (let y = gap / 2; y < h; y += gap)
        for (let x = gap / 2; x < w; x += gap) pts.push({ x, y, ox: x, oy: y, vx: 0, vy: 0 });
    }

    new IntersectionObserver(([e]) => (visible = e.isIntersecting)).observe(hero);
    addEventListener("resize", resize);
    resize();

    function frame(t) {
      requestAnimationFrame(frame);
      if (!visible) return;
      const r = hero.getBoundingClientRect();
      const tx = mouse.active ? mouse.x - r.left : -9999;
      const ty = mouse.active ? mouse.y - r.top : -9999;
      pointer.x = lerp(pointer.x < -9000 ? tx : pointer.x, tx, 0.15);
      pointer.y = lerp(pointer.y < -9000 ? ty : pointer.y, ty, 0.15);

      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "#fff";
      const time = t * 0.001;
      const R = Math.min(220, w * 0.25);

      for (const p of pts) {
        const dx = p.ox - pointer.x;
        const dy = p.oy - pointer.y;
        const d = Math.hypot(dx, dy);
        let tx2 = p.ox, ty2 = p.oy, boost = 0;
        if (d < R) {
          const f = (1 - d / R) ** 2;
          tx2 += (dx / (d || 1)) * f * 40;
          ty2 += (dy / (d || 1)) * f * 40;
          boost = f;
        }
        p.vx = (p.vx + (tx2 - p.x) * 0.08) * 0.82;
        p.vy = (p.vy + (ty2 - p.y) * 0.08) * 0.82;
        p.x += p.vx;
        p.y += p.vy;

        const wave = Math.sin(p.ox * 0.008 + time * 0.9) * Math.cos(p.oy * 0.011 - time * 0.6);
        const s = 0.6 + Math.max(0, wave) * 1.6 + boost * 4.5;
        ctx.globalAlpha = 0.12 + Math.max(0, wave) * 0.28 + boost * 0.6;
        ctx.fillRect(p.x - s / 2, p.y - s / 2, s, s);
      }

      // crosshair readout around the cursor
      if (mouse.active && pointer.x > 0 && pointer.y > 0 && pointer.y < h) {
        ctx.globalAlpha = 0.5;
        ctx.strokeStyle = "#fff";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(pointer.x, 0);
        ctx.lineTo(pointer.x, h);
        ctx.moveTo(0, pointer.y);
        ctx.lineTo(w, pointer.y);
        ctx.globalAlpha = 0.08;
        ctx.stroke();
        ctx.globalAlpha = 0.6;
        ctx.font = "10px JetBrains Mono, monospace";
        ctx.fillText(`X ${pad(Math.round(pointer.x), 4)}  Y ${pad(Math.round(pointer.y), 4)}`, pointer.x + 14, pointer.y - 12);
      }
      ctx.globalAlpha = 1;
    }

    if (reduced) {
      frame(0);
    } else {
      requestAnimationFrame(frame);
    }
  }

  /* ------------------------------------------------------------------------
     Generative project visuals. One small animation per project.
     ------------------------------------------------------------------------ */
  const patterns = {
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

  function makeVisual(canvas) {
    const ctx = canvas.getContext("2d");
    let type = "rings", raf = 0, running = false, t0 = performance.now();
    const fit = () => {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, width * dpr);
      canvas.height = Math.max(1, height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      return [width, height];
    };
    let size = [0, 0];
    const draw = (now) => {
      const [w, h] = size;
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "#fff";
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 1;
      ctx.globalAlpha = 1;
      (patterns[type] || patterns.rings)(ctx, w, h, (now - t0) / 1000);
      if (running && !reduced) raf = requestAnimationFrame(draw);
    };
    return {
      set(next) {
        type = next;
      },
      start() {
        size = fit();
        if (running) return;
        running = true;
        raf = requestAnimationFrame(draw);
      },
      stop() {
        running = false;
        cancelAnimationFrame(raf);
      },
    };
  }

  /* ------------------------------------------------------------------------
     Projects: filters, hover preview, detail drawer
     ------------------------------------------------------------------------ */
  function projects() {
    const preview = $(".preview");
    const pv = makeVisual($(".preview__canvas"));
    const pos = { x: 0, y: 0, tx: 0, ty: 0, r: 0 };
    let hovering = false;

    $$(".prow").forEach((row) => {
      const p = CV.projects.find((x) => x.id === row.dataset.id);
      row.addEventListener("pointerenter", () => {
        if (!finePointer) return;
        hovering = true;
        pv.set(p.pattern);
        $("[data-preview-kind]").textContent = p.kind;
        $("[data-preview-year]").textContent = p.name;
        preview.classList.add("is-on");
        pv.start();
      });
      row.addEventListener("pointerleave", () => {
        hovering = false;
        preview.classList.remove("is-on");
      });
    });

    (function follow() {
      requestAnimationFrame(follow);
      pos.tx = mouse.x + 28;
      pos.ty = mouse.y - 110;
      if (pos.tx + 300 > innerWidth - 12) pos.tx = mouse.x - 328;
      const px = pos.x;
      pos.x = lerp(pos.x, pos.tx, 0.14);
      pos.y = lerp(pos.y, clamp(pos.ty, 12, innerHeight - 232), 0.14);
      pos.r = lerp(pos.r, clamp((pos.x - px) * 0.4, -10, 10), 0.1);
      preview.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) rotate(${pos.r}deg)`;
      if (!hovering && !preview.classList.contains("is-on")) pv.stop();
    })();

    // Filters, with a FLIP-style fade so the list reflows smoothly
    $("[data-filters]").addEventListener("click", (e) => {
      const btn = e.target.closest("[data-filter]");
      if (!btn) return;
      $$("[data-filter]").forEach((b) => b.setAttribute("aria-selected", b === btn));
      const k = btn.dataset.filter;
      let i = 0;
      $$(".prow").forEach((row) => {
        const show = k === "All" || row.dataset.kind === k;
        row.classList.toggle("is-filtered", !show);
        if (show && !reduced) {
          row.animate(
            [{ opacity: 0, transform: "translateY(24px)" }, { opacity: 1, transform: "none" }],
            { duration: 700, delay: i++ * 60, easing: "cubic-bezier(0.16,1,0.3,1)", fill: "backwards" }
          );
        }
      });
    });

    // Drawer
    const drawer = $(".drawer");
    const body = $("[data-drawer]");
    let dv = null, lastFocus = null;

    function open(i) {
      const p = CV.projects[i];
      lastFocus = document.activeElement;
      body.innerHTML = `
        <div class="d__kicker mono"><span>${pad(i + 1)} / ${pad(CV.projects.length)}</span><span>${esc(p.kind)}</span><span>${esc(p.year)}</span></div>
        <h2 class="d__title" id="drawer-title">${esc(p.name)}</h2>
        <p class="d__line">${esc(p.line)}</p>
        ${p.award ? `<span class="d__award mono">★ ${esc(p.award)}</span>` : ""}
        <div class="d__visual"><canvas></canvas></div>
        <div class="d__grid">
          <span class="d__label mono">Built for</span><p class="d__text">${esc(p.builtFor)}</p>
          <span class="d__label mono">What it is</span><p class="d__text">${esc(p.summary)}</p>
          <span class="d__label mono">Highlights</span><ul class="d__list">${p.highlights.map((h) => `<li>${esc(h)}</li>`).join("")}</ul>
          <span class="d__label mono">By the numbers</span>
          <div class="d__metrics">${p.metrics.map((m) => `<div class="d__metric"><b>${esc(m.v)}</b><span class="mono">${esc(m.l)}</span></div>`).join("")}</div>
          <span class="d__label mono">Stack</span><div class="tags" style="margin-top:0">${p.stack.map((s) => `<span class="tag">${esc(s)}</span>`).join("")}</div>
          <span class="d__label mono">Links</span>
          <div class="d__links">${p.links.map((l) => `<a class="btn" href="${esc(l.url)}" target="_blank" rel="noopener" data-cursor="Open">${esc(l.label)} ↗</a>`).join("")}</div>
        </div>
        <div class="d__grid">
          <span class="d__label mono">Next</span>
          <button class="btn btn--ghost" data-next="${(i + 1) % CV.projects.length}" data-cursor="Next">${esc(CV.projects[(i + 1) % CV.projects.length].name)} →</button>
        </div>`;
      drawer.hidden = false;
      $(".drawer__panel").scrollTop = 0;
      document.body.style.overflow = "hidden";
      requestAnimationFrame(() => {
        drawer.classList.add("is-open");
        dv && dv.stop();
        dv = makeVisual($(".d__visual canvas", body));
        dv.set(p.pattern);
        dv.start();
        $(".drawer__close").focus({ preventScroll: true });
      });
      bindCursorTargets(drawer);
    }

    function close() {
      drawer.classList.remove("is-open");
      document.body.style.overflow = "";
      setTimeout(() => {
        if (!drawer.classList.contains("is-open")) {
          drawer.hidden = true;
          dv && dv.stop();
        }
      }, reduced ? 0 : 800);
      lastFocus && lastFocus.focus({ preventScroll: true });
    }

    $("[data-projects]").addEventListener("click", (e) => {
      const b = e.target.closest("[data-open]");
      if (b) open(+b.dataset.open);
    });
    drawer.addEventListener("click", (e) => {
      if (e.target.closest("[data-close]")) close();
      const n = e.target.closest("[data-next]");
      if (n) open(+n.dataset.next);
    });
    addEventListener("keydown", (e) => {
      if (drawer.hidden) return;
      if (e.key === "Escape") close();
      if (e.key === "Tab") {
        const f = $$("a, button", drawer).filter((x) => x.offsetParent !== null);
        if (!f.length) return;
        if (e.shiftKey && document.activeElement === f[0]) {
          e.preventDefault();
          f[f.length - 1].focus();
        } else if (!e.shiftKey && document.activeElement === f[f.length - 1]) {
          e.preventDefault();
          f[0].focus();
        }
      }
    });
  }

  /* ------------------------------------------------------------------------
     Cursor + magnetic elements
     ------------------------------------------------------------------------ */
  const cursor = $(".cursor");
  const cursorLabel = $(".cursor__label");

  function bindCursorTargets(root = document) {
    if (!finePointer) return;
    $$("[data-cursor], a, button", root).forEach((el) => {
      if (el._cur) return;
      el._cur = true;
      el.addEventListener("pointerenter", () => {
        cursor.classList.add("is-hover");
        cursorLabel.textContent = el.dataset.cursor || "";
      });
      el.addEventListener("pointerleave", () => cursor.classList.remove("is-hover"));
    });
  }

  function cursorLoop() {
    if (!finePointer) return;
    const c = { x: mouse.x, y: mouse.y };
    (function loop() {
      requestAnimationFrame(loop);
      c.x = lerp(c.x, mouse.x, reduced ? 1 : 0.22);
      c.y = lerp(c.y, mouse.y, reduced ? 1 : 0.22);
      cursor.style.transform = `translate3d(${c.x}px, ${c.y}px, 0)`;
    })();
    addEventListener("pointerdown", () => cursor.classList.add("is-down"));
    addEventListener("pointerup", () => cursor.classList.remove("is-down"));
    document.addEventListener("pointerleave", () => (cursor.style.opacity = 0));
    document.addEventListener("pointerenter", () => (cursor.style.opacity = 1));
    bindCursorTargets();
  }

  function magnetic() {
    if (!finePointer || reduced) return;
    $$("[data-magnetic]").forEach((el) => {
      el.style.transition = "transform 0.5s cubic-bezier(0.16,1,0.3,1)";
      el.addEventListener("pointermove", (e) => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) * 0.3;
        const y = (e.clientY - r.top - r.height / 2) * 0.4;
        el.style.transform = `translate(${x}px, ${y}px)`;
      });
      el.addEventListener("pointerleave", () => (el.style.transform = ""));
    });
  }

  function tilt() {
    if (!finePointer || reduced) return;
    $$(".hack").forEach((el) => {
      el.addEventListener("pointermove", (e) => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform = `perspective(700px) rotateX(${-y * 8}deg) rotateY(${x * 8}deg)`;
      });
      el.addEventListener("pointerleave", () => (el.style.transform = ""));
    });
  }

  /* ------------------------------------------------------------------------
     Scroll-driven motion
     ------------------------------------------------------------------------ */
  function counters(el) {
    const target = +el.dataset.count;
    const suffix = el.dataset.suffix || "";
    if (reduced) return (el.textContent = target + suffix);
    const start = performance.now();
    const dur = 1600;
    (function tick(now) {
      const p = clamp((now - start) / dur, 0, 1);
      const e = 1 - Math.pow(1 - p, 4);
      el.textContent = Math.round(target * e) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    })(start);
  }

  function observe() {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target;
          el.classList.add("in");
          $$("[data-count]", el).forEach(counters);
          if (el.classList.contains("section__head")) $$(".section__num", el).forEach((n) => scramble(n, 500));
          io.unobserve(el);
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    $$(".reveal, .section__head").forEach((el) => io.observe(el));
  }

  function scrollFx() {
    const bar = $(".progress");
    const nav = $(".nav");
    const rail = $("[data-rail]");
    const timeline = $(".timeline");
    const track = $("[data-marquee]");
    const drifts = $$("[data-drift]");
    const sections = $$("[data-section]");
    const navLinks = $$(".nav__links a");
    const num = $("[data-section-num]");

    let lastY = scrollY, vel = 0, mx = 0, dir = 1, current = -1;

    (function loop() {
      requestAnimationFrame(loop);
      const y = scrollY;
      const dy = y - lastY;
      lastY = y;
      const max = document.documentElement.scrollHeight - innerHeight;
      bar.style.setProperty("--p", max > 0 ? y / max : 0);

      if (Math.abs(dy) > 2) {
        nav.classList.toggle("is-hidden", dy > 0 && y > innerHeight * 0.6);
        dir = dy > 0 ? 1 : -1;
      }

      // Marquee speed follows scroll velocity and direction
      vel = lerp(vel, dy, 0.1);
      if (!reduced) {
        const half = track.scrollWidth / 2 || 1;
        mx -= (0.6 + Math.abs(vel) * 0.35) * dir;
        if (mx <= -half) mx += half;
        if (mx > 0) mx -= half;
        track.style.transform = `translate3d(${mx}px,0,0) skewX(${clamp(-vel * 0.3, -12, 12)}deg)`;
      }

      // Timeline rail fills as you read
      const tr = timeline.getBoundingClientRect();
      rail.style.setProperty("--p", clamp((innerHeight * 0.6 - tr.top) / tr.height, 0, 1));

      // Contact rows drift horizontally against each other
      if (!reduced) {
        drifts.forEach((d) => {
          const r = d.getBoundingClientRect();
          const p = clamp((r.top + r.height / 2 - innerHeight / 2) / innerHeight, -1, 1);
          d.style.transform = `translate3d(${p * 14 * +d.dataset.drift}vw,0,0)`;
        });
      }

      // Active section indicator
      let idx = 0;
      sections.forEach((s, i) => {
        if (s.getBoundingClientRect().top < innerHeight * 0.45) idx = i;
      });
      if (idx !== current) {
        current = idx;
        num.textContent = pad(idx);
        const id = sections[idx].id;
        navLinks.forEach((a) => a.classList.toggle("is-active", a.getAttribute("href") === "#" + id));
      }
    })();
  }

  function clock() {
    const el = $("[data-clock]");
    const fmt = new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Amsterdam", hour: "2-digit", minute: "2-digit", second: "2-digit" });
    const tick = () => (el.textContent = fmt.format(new Date()));
    tick();
    setInterval(tick, 1000);
  }

  function hoverScramble() {
    $$("[data-scramble]").forEach((el) => {
      el.addEventListener("pointerenter", () => scramble(el, 450));
    });
    $$(".hero__name .char").forEach((ch) => {
      ch.addEventListener("pointerenter", () => {
        if (reduced || ch._busy) return;
        ch._busy = true;
        const orig = ch.textContent;
        let n = 0;
        const iv = setInterval(() => {
          ch.textContent = GLYPHS[(Math.random() * 26) | 0];
          if (++n > 6) {
            clearInterval(iv);
            ch.textContent = orig;
            ch._busy = false;
          }
        }, 45);
      });
    });
  }

  /* ------------------------------------------------------------------------
     Boot
     ------------------------------------------------------------------------ */
  render();
  heroField();
  projects();
  cursorLoop();
  magnetic();
  tilt();
  clock();
  hoverScramble();
  scrollFx();

  const start = () => {
    runLoader(() => {
      $(".hero").classList.add("is-ready");
      observe();
      scramble($("[data-role]"), 900);
      scramble($("[data-study]"), 900);
    });
  };
  if (document.fonts && document.fonts.ready) {
    Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 1500))]).then(start);
  } else {
    start();
  }
})();
