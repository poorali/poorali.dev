# Brand kit

One rule for everything: **it's the Fethiye sky at a given time of day, and
the only saturated thing in it is the sun.** Every banner is painted by the
site's own sky renderer, so the site, the channels and the thumbnails look
made by the same hand.

| File | Size | Where it goes |
|---|---|---|
| `mark.svg` | vector | The logo on light backgrounds |
| `mark-light.svg` | vector | The logo on dark backgrounds |
| `yt-avatar.png` | 800 × 800 | YouTube profile picture (and anywhere a square icon is needed) |
| `yt-watermark.png` | 150 × 150, transparent | YouTube video watermark (Customisation → Branding) |
| `yt-banner.png` | 2560 × 1440 | YouTube banner. Text sits inside the 1546 × 423 safe area |
| `li-banner.png` | 1584 × 396 | LinkedIn banner. The left third stays clear for the profile photo |
| `thumb-built.png` | 1280 × 720 | Thumbnail template for *Built in Fethiye*: after dark, because it's built on evenings and weekends |
| `thumb-tested.png` | 1280 × 720 | Thumbnail template for *Tested in Fethiye*: Saturday morning light |
| `../og.png` | 1200 × 630 | Link preview for poorali.dev |

## The mark

An orange dot on a line. It reads three ways at once: the sun touching the
sea, a playhead on a video timeline, and a REC light. It holds up at 16 px.

- Orange `#FF5F3D` · Ink `#0B0D10` · Paper `#E8EAED`
- Type: Inter (or the system sans) for words, the system monospace for labels
- Never recolour the dot. Never add a second accent colour.

## Changing or adding an asset

Edit [`kit.html`](kit.html): each `.asset` block is one file. `data-at` sets
the time of day in Fethiye (so the sky colour), `data-horizon` where the sea
starts, `data-sunx` and `data-sun` the sun's position and size. Then:

```bash
npm i -g playwright   # once
node brand/render.mjs # writes every PNG at its exact size
```

To check a thumbnail by eye, serve the repo root (`python3 -m http.server`)
and open `/brand/kit.html`.

## Profile photo

Use one photo everywhere (YouTube, LinkedIn, GitHub, the site). Shoot it
outside in Fethiye at golden hour, with the sun low behind or beside you and
the sea in the background, a plain dark top, and the face filling about half
the frame. It will sit next to the banners like it belongs.
