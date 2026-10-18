# Brand: One Pixel

**The rule.** There is one square. It is the mark, the full stop of every headline, and the only way forward: zoom into it and the next page is inside. What you read ends at it. On desktop it sits dead centre and the text hangs from its left edge. Each page's label line opens with how far you zoomed to get there (`180×`, `19 938×`), then says what the page is. Only headlines end with the square. Body sentences end with an ordinary full stop.

**Square size.** In a headline it is 0.13 em (the dot on the i), snapped to whole pixels. The lone square on the first screen is 8 px (6 px in the column layout).

**Colours.** Paper `#f3f3f0` and ink `#0a0a0a`, nothing else. Secondary text is the same colour at 60% (labels, the n of the mark, the thumbnail's day line and photo note). Zoom levels alternate paper and ink.

**Type.** One system family, no web fonts. Headlines use the display cut at weight 500 with -0.045 em tracking. Everything else uses the text cut, including the readout, labels, list numbers and links, with tabular figures so the counter does not jitter. There are two working sizes and one square.

**The mark.** A lowercase n at 60% and the square at full strength, on a 16 grid. The n has a flat top, a quarter-round shoulder and 2-unit stems, and the 2x2 square sits one unit after it. The square is the brightest point. The same drawing appears in `mark.svg`, the favicon inlined in `index.html`, and `#avatar`. It reads at 16 px and on white and dark themes.

**Site (`index.html`).** One file with a fixed zoom stage and no page scroll.
- Desktop: the head is right-aligned to the centred square.
- Column layout (560 px wide or less, or up to 680 px when the window is at least 561 px tall): the name starts on the margin and the square ends it.
- The readout is one live counter. It moves only as fast as the incoming page grows, so it stays on that page's left edge. The incoming page's text appears only as the page lands, so nothing passes under the number.
- The first screen shows the square from the first frame. The readout and hint fade in together. The hint is "Scroll into the square", "Click the square" when space is short, or "Tap the square" on touch.
- `?z=N` opens any depth (`?z=2.5` gives a mid-zoom frame). `?still` hides the readout and frames the square dead centre; the banners use it.
- Reduced motion jumps between levels.

**Assets (`banners.html`).** Each artboard is an element at its exact size. LinkedIn, YouTube and the link preview are not typeset. Each is an iframe of the site, frozen mid-zoom, in its one-column layout at 640x640, scaled with CSS zoom. They always show the site's real copy and colours, and the square is large enough to see into. There is no readout or URL on them; the platforms print the name and link beside the image.
- `#li` 1584x396, `?z=0.66`: a paper field holding the ink square, with "Nima Poorali■" inside. Centred, so it stays clear of the profile photo.
- `#yt` 2560x1440, `?z=1.514`: zooming out of "Nima Poorali" (the giant stems are its l and i) into a paper square holding "Two kinds of video■". The square is centred in the 1546x423 safe area. Its headline is about 52 px, about 12 px on a phone.
- `#og` 1200x630, `?z=0.8`: the first zoom again. The square survives a centred 630x630 crop. Served as https://poorali.dev/og.png.
- `#avatar` 800x800: the mark.
- `#watermark` 150x150, transparent: the square alone, paper with an ink keyline. It is the clickable spot, the way the square is on the site.
- `#thumb` 1280x720, a template. The photo is the full stop: a 504x504 square sitting on the title's last baseline. The title (88 px) is right-aligned and ends at it, and wraps if it runs long. For the 30-day series, the first line is the day at 60% (`Day 01/30`). For the gadget series, drop that line and keep the title only. The paper square and its note are a guide and are covered by the photo.

**Re-render.** Every PNG is drawn from `banners.html`, and the banners are frames of `../index.html`, so a change to the site flows into them.

```bash
npm i -g playwright   # once
node brand/render.mjs # writes brand/*.png and ../og.png at exact size
```

To change a banner, change its `data-z`. The frame follows the site.
