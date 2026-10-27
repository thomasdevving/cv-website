# Thomas Nguyen — CV website

A hand-built, dependency-free CV site. Strict black and white, hard edges, lots of motion.

## Edit the content

Everything you read on the site lives in [`js/data.js`](js/data.js): roles, education,
projects, hackathons, stack. Change it there and the page re-renders from it. No build step.

## Run locally

```sh
python3 -m http.server 8080
# open http://localhost:8080
```

## Deploy

`.github/workflows/pages.yml` publishes the site to GitHub Pages on every push to `main`.
Enable it once under **Settings → Pages → Source: GitHub Actions**.

## What moves

- Loader counter that wipes away into the hero
- Hero dot field that bends around the cursor, with a live crosshair readout
- Letter-by-letter mask reveals and glyph scrambles on hover
- Marquee whose speed and direction follow your scroll
- Project list with a black/white wipe and a cursor-following preview that plays a
  generative animation unique to each project
- Slide-in project drawer, timeline rail that fills as you scroll, counting stats,
  tilting hackathon cards, magnetic buttons and a square difference-blend cursor

All of it respects `prefers-reduced-motion`.

## Structure

```
index.html        page skeleton
css/style.css     all styling
js/data.js        all content
js/main.js        rendering + animation
assets/           favicon
```
