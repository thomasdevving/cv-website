# Thomas Nguyen — CV website

A hand-built, dependency-free CV site. Strict black and white, hard edges, lots of motion.

## Edit the content

Everything you read on the site lives in [`js/data.js`](js/data.js): roles, education,
projects (with their `images`), hackathons, photos, stack. Change it there and the page re-renders from it. No build step.

## Run locally

```sh
python3 -m http.server 8080
# open http://localhost:8080
```

## Deploy

`.github/workflows/pages.yml` publishes the site to GitHub Pages on every push to `main`.
Enable it once under **Settings → Pages → Source: GitHub Actions**.

## What moves

The header is the show: a loader counter, a dot field that bends around the cursor with a
live crosshair, letter-by-letter name reveal and glyph scrambles. Below it, motion stays
quiet: sections fade up as they enter, stats count once, the timeline rail fills as you
scroll, and project screenshots and photos go from greyscale to colour on hover.

All of it respects `prefers-reduced-motion`.

## Structure

```
index.html        page skeleton
css/style.css     all styling
js/data.js        all content
js/patterns.js    line drawings for projects without screenshots
js/main.js        rendering + animation
assets/img/       project screenshots and photos (webp)
```
