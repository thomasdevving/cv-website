/* Thomas Nguyen — CV. Vanilla JS, no dependencies. Content comes from data.js.
 * The header is the show; everything below it moves quietly. */
(() => {
  "use strict";

  const CV = window.CV;
  const PATTERNS = window.PATTERNS;
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
     Text helpers (header only)
     ------------------------------------------------------------------------ */
  function splitChars(text, startIndex = 0) {
    return [...text]
      .map((c, i) => (c === " " ? " " : `<span class="char" style="--i:${startIndex + i}">${esc(c)}</span>`))
      .join("");
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
        out += i < reveal || c === " " ? c : GLYPHS[(Math.random() * GLYPHS.length) | 0];
      }
      el.textContent = out;
      if (p < 1) el._scr = requestAnimationFrame(tick);
    };
    el._scr = requestAnimationFrame(tick);
  }

  /* ------------------------------------------------------------------------
     Render content
     ------------------------------------------------------------------------ */
  function media(p, cls = "") {
    const img = p.images && p.images[0];
    return img
      ? `<img class="${cls}" src="${esc(img.src)}" alt="${esc(img.alt)}" loading="lazy" decoding="async">`
      : `<canvas class="${cls}" data-pattern="${esc(p.pattern)}" aria-hidden="true"></canvas>`;
  }

  function render() {
    $("[data-role]").textContent = CV.role;
    $("[data-study]").textContent = CV.study;
    $("[data-location]").textContent = CV.location;
    $("[data-headline]").textContent = CV.headline;
    $("[data-intro]").textContent = CV.intro;
    $("[data-year]").textContent = new Date().getFullYear();
    $$("[data-link]").forEach((a) => (a.href = CV.links[a.dataset.link]));

    const [first, ...rest] = CV.name.split(" ");
    $("[data-name]").innerHTML =
      `<span class="line" aria-hidden="true">${splitChars(first, 0)}</span>` +
      `<span class="line" aria-hidden="true">${splitChars(rest.join(" "), first.length)}</span>`;

    $("[data-principles]").innerHTML = CV.principles
      .map(
        (p, i) => `
        <div class="principle reveal" style="--d:${i * 0.08}s">
          <div class="principle__k"><span>${esc(p.k)}</span><span class="mono">${pad(i + 1)}</span></div>
          <p class="principle__v">${esc(p.v)}</p>
        </div>`
      )
      .join("");

    $("[data-disciplines]").innerHTML = CV.disciplines
      .map(
        (d, i) => `
        <article class="disc reveal" style="--d:${i * 0.06}s">
          <span class="disc__n mono">${esc(d.n)}</span>
          <h3 class="disc__t">${esc(d.t)}</h3>
          <p class="disc__d">${esc(d.d)}</p>
        </article>`
      )
      .join("");

    $("[data-stats]").innerHTML = CV.stats
      .map(
        (s, i) => `
        <div class="stat reveal" style="--d:${i * 0.06}s">
          <span class="stat__v" data-count="${s.v}" data-suffix="${esc(s.s)}">0${esc(s.s)}</span>
          <span class="stat__l mono">${esc(s.l)}</span>
        </div>`
      )
      .join("");

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

    const eduItem = (e) => `
      <li class="edu__item reveal">
        <span class="edu__when mono">${esc(e.when)}</span>
        <div><span class="edu__t">${esc(e.t)}</span><span class="edu__o">${esc(e.o)}</span></div>
      </li>`;
    $("[data-education]").innerHTML = CV.education.map(eduItem).join("");
    $("[data-extras]").innerHTML = CV.extras.map(eduItem).join("");

    const kinds = ["All", ...new Set(CV.projects.map((p) => p.kind))];
    $("[data-filters]").innerHTML = kinds
      .map((k, i) => {
        const n = k === "All" ? CV.projects.length : CV.projects.filter((p) => p.kind === k).length;
        return `<button class="filter" role="tab" aria-selected="${i === 0}" data-filter="${esc(k)}">${esc(k)}<sup>${pad(n)}</sup></button>`;
      })
      .join("");

    $("[data-projects]").innerHTML = CV.projects
      .map(
        (p, i) => `
        <article class="pcard reveal${i === 0 ? " pcard--feature" : ""}" data-kind="${esc(p.kind)}">
          <button class="pcard__btn" data-open="${i}" aria-haspopup="dialog">
            <span class="pcard__media">${media(p)}</span>
            <span class="pcard__meta mono"><span>${pad(i + 1)}</span><span>${esc(p.kind)} · ${esc(p.year)}</span></span>
            <span class="pcard__name">${esc(p.name)}${p.award ? '<span class="pcard__award mono">Winner</span>' : ""}</span>
            <span class="pcard__line">${esc(p.line)}</span>
            <span class="pcard__for mono">${esc(p.builtFor)}</span>
          </button>
        </article>`
      )
      .join("");

    $("[data-hackathons]").innerHTML = CV.hackathons
      .map(
        (h, i) => `
        <article class="hack reveal${h.win ? " hack--win" : ""}">
          <div class="hack__top mono"><span>${pad(i + 1)}</span><span>${esc(h.date)}</span></div>
          <h3 class="hack__name">${esc(h.name)}</h3>
          <span class="hack__project">→ ${esc(h.project)}</span>
          ${h.result ? `<span class="hack__result mono">${esc(h.result)}</span>` : ""}
        </article>`
      )
      .join("");

    $("[data-photos]").innerHTML = CV.photos
      .map(
        (ph, i) => `
        <figure class="photo photo--${i + 1} reveal">
          <img src="${esc(ph.src)}" alt="${esc(ph.alt)}" loading="lazy" decoding="async">
          <figcaption class="mono"><span>${pad(i + 1)}</span><span>${esc(ph.caption)}</span></figcaption>
        </figure>`
      )
      .join("");

    $("[data-stack]").innerHTML = CV.stack
      .map(
        (g) => `
        <div class="sgroup reveal">
          <div class="sgroup__g mono"><span>${esc(g.g)}</span><span>${pad(g.items.length)}</span></div>
          <ul class="sgroup__items">${g.items.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
        </div>`
      )
      .join("");

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
      if (!reduced) requestAnimationFrame(frame);
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

      if (mouse.active && pointer.x > 0 && pointer.y > 0 && pointer.y < h) {
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

    requestAnimationFrame(frame);
  }

  /* ------------------------------------------------------------------------
     Pattern canvases (projects without screenshots)
     ------------------------------------------------------------------------ */
  function drawPattern(canvas, type, t) {
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(devicePixelRatio || 1, 2);
    const { width, height } = canvas.getBoundingClientRect();
    if (!width || !height) return;
    if (canvas.width !== Math.round(width * dpr)) {
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "#fff";
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 1;
    ctx.globalAlpha = 1;
    (PATTERNS[type] || PATTERNS.rings)(ctx, width, height, t);
  }

  // Cards get a still frame; the drawer animates.
  function stillPatterns(root = document) {
    $$("canvas[data-pattern]", root).forEach((c) => drawPattern(c, c.dataset.pattern, 2.4));
  }

  function livePattern(canvas, type) {
    let raf = 0;
    const t0 = performance.now();
    const loop = (now) => {
      drawPattern(canvas, type, (now - t0) / 1000 + 2.4);
      if (!reduced) raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }

  /* ------------------------------------------------------------------------
     Projects: filters + detail drawer
     ------------------------------------------------------------------------ */
  function projects() {
    $("[data-filters]").addEventListener("click", (e) => {
      const btn = e.target.closest("[data-filter]");
      if (!btn) return;
      $$("[data-filter]").forEach((b) => b.setAttribute("aria-selected", b === btn));
      const k = btn.dataset.filter;
      $$(".pcard").forEach((card) => card.classList.toggle("is-filtered", !(k === "All" || card.dataset.kind === k)));
      $(".pgrid").classList.toggle("is-filtered-view", k !== "All");
      stillPatterns($(".pgrid"));
    });

    const drawer = $(".drawer");
    const body = $("[data-drawer]");
    let stopLive = null, lastFocus = null;

    function open(i) {
      const p = CV.projects[i];
      const next = CV.projects[(i + 1) % CV.projects.length];
      if (!drawer.classList.contains("is-open")) lastFocus = document.activeElement;
      const imgs = p.images || [];
      const gallery = imgs.length
        ? `<div class="d__gallery">${imgs
            .map((im, k) => `<figure class="d__shot${k === 0 ? " d__shot--lead" : ""}"><img src="${esc(im.src)}" alt="${esc(im.alt)}" loading="lazy" decoding="async"><figcaption class="mono">${esc(im.alt)}</figcaption></figure>`)
            .join("")}</div>`
        : `<div class="d__visual"><canvas aria-hidden="true"></canvas></div>`;

      body.innerHTML = `
        <div class="d__kicker mono"><span>${pad(i + 1)} / ${pad(CV.projects.length)}</span><span>${esc(p.kind)}</span><span>${esc(p.year)}</span></div>
        <h2 class="d__title" id="drawer-title">${esc(p.name)}</h2>
        <p class="d__line">${esc(p.line)}</p>
        ${p.award ? `<span class="d__award mono">★ ${esc(p.award)}</span>` : ""}
        ${gallery}
        <div class="d__grid">
          <span class="d__label mono">Built for</span><p class="d__text">${esc(p.builtFor)}</p>
          <span class="d__label mono">What it is</span><p class="d__text">${esc(p.summary)}</p>
          <span class="d__label mono">Highlights</span><ul class="d__list">${p.highlights.map((h) => `<li>${esc(h)}</li>`).join("")}</ul>
          <span class="d__label mono">By the numbers</span>
          <div class="d__metrics">${p.metrics.map((m) => `<div class="d__metric"><b>${esc(m.v)}</b><span class="mono">${esc(m.l)}</span></div>`).join("")}</div>
          <span class="d__label mono">Stack</span><div class="tags" style="margin-top:0">${p.stack.map((s) => `<span class="tag">${esc(s)}</span>`).join("")}</div>
          <span class="d__label mono">Links</span>
          <div class="d__links">${p.links.map((l) => `<a class="btn" href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)} ↗</a>`).join("")}</div>
        </div>
        <div class="d__grid">
          <span class="d__label mono">Next</span>
          <button class="btn btn--ghost" data-next="${(i + 1) % CV.projects.length}">${esc(next.name)} →</button>
        </div>`;

      drawer.hidden = false;
      $(".drawer__panel").scrollTop = 0;
      document.body.style.overflow = "hidden";
      requestAnimationFrame(() => {
        drawer.classList.add("is-open");
        stopLive && stopLive();
        stopLive = null;
        const c = $(".d__visual canvas", body);
        if (c) stopLive = livePattern(c, p.pattern);
        $(".drawer__close").focus({ preventScroll: true });
      });
    }

    function close() {
      drawer.classList.remove("is-open");
      document.body.style.overflow = "";
      setTimeout(() => {
        if (!drawer.classList.contains("is-open")) {
          drawer.hidden = true;
          stopLive && stopLive();
          stopLive = null;
        }
      }, reduced ? 0 : 700);
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
     Cursor: a small difference-blended square
     ------------------------------------------------------------------------ */
  function cursorLoop() {
    if (!finePointer) return;
    const cursor = $(".cursor");
    const c = { x: mouse.x, y: mouse.y };
    (function loop() {
      requestAnimationFrame(loop);
      c.x = lerp(c.x, mouse.x, reduced ? 1 : 0.25);
      c.y = lerp(c.y, mouse.y, reduced ? 1 : 0.25);
      cursor.style.transform = `translate3d(${c.x}px, ${c.y}px, 0)`;
    })();
    document.addEventListener("pointerover", (e) => cursor.classList.toggle("is-hover", !!e.target.closest("a, button")));
    document.addEventListener("pointerleave", () => (cursor.style.opacity = 0));
    document.addEventListener("pointerenter", () => (cursor.style.opacity = 1));
  }

  /* ------------------------------------------------------------------------
     Scroll: reveals, counters, progress, nav state
     ------------------------------------------------------------------------ */
  function counters(el) {
    const target = +el.dataset.count;
    const suffix = el.dataset.suffix || "";
    if (reduced) return (el.textContent = target + suffix);
    const start = performance.now();
    (function tick(now) {
      const p = clamp((now - start) / 1400, 0, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 4))) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    })(start);
  }

  function observe() {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add("in");
          $$("[data-count]", e.target).forEach(counters);
          io.unobserve(e.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    $$(".reveal, .section__head").forEach((el) => io.observe(el));
  }

  function scrollFx() {
    const bar = $(".progress");
    const nav = $(".nav");
    const rail = $("[data-rail]");
    const timeline = $(".timeline");
    const sections = $$("[data-section]");
    const navLinks = $$(".nav__links a");
    const num = $("[data-section-num]");
    let lastY = scrollY, current = -1, ticking = false;

    function update() {
      ticking = false;
      const y = scrollY;
      const dy = y - lastY;
      lastY = y;
      const max = document.documentElement.scrollHeight - innerHeight;
      bar.style.setProperty("--p", max > 0 ? y / max : 0);
      if (Math.abs(dy) > 2) nav.classList.toggle("is-hidden", dy > 0 && y > innerHeight * 0.6);

      const tr = timeline.getBoundingClientRect();
      rail.style.setProperty("--p", clamp((innerHeight * 0.6 - tr.top) / tr.height, 0, 1));

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
    }
    addEventListener("scroll", () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    }, { passive: true });
    update();
  }

  function clock() {
    const el = $("[data-clock]");
    const fmt = new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Amsterdam", hour: "2-digit", minute: "2-digit", second: "2-digit" });
    const tick = () => (el.textContent = fmt.format(new Date()));
    tick();
    setInterval(tick, 1000);
  }

  function headerHovers() {
    $$(".nav [data-scramble]").forEach((el) => el.addEventListener("pointerenter", () => scramble(el, 450)));
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
  clock();
  headerHovers();
  scrollFx();
  addEventListener("resize", () => stillPatterns());

  const start = () => {
    runLoader(() => {
      $(".hero").classList.add("is-ready");
      observe();
      stillPatterns();
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
