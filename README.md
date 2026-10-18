# poorali.dev

One page. One file. No build, no dependencies, no network requests.

**One pixel.** The site opens on an empty page with a single square. Scroll,
click or pinch into it and the square becomes the full stop of the next page:
"Nima Poorali■". That full stop is the next way in, and so on, page after page,
until the last page zooms out to the lone square again. A small counter keeps
the magnification (`180×`, `19 938×` …) and opens each page's label line.

![Nima Poorali■, the first page you zoom into](og.png)

## Run it

```bash
open index.html
open "index.html?z=2"       # open at any depth; ?z=0.6 gives a mid-zoom frame
open "index.html?z=1&still" # no counter, square dead centre (the banners use this)
```

## The rule

There is one square. It is the mark, the full stop of every headline and the
only way forward. Paper `#f3f3f0` and ink `#0a0a0a`, nothing else; secondary
text is the same colour at 60%. One system font, no web fonts.

## Editing the copy

Each page is a `<section class="level">` in `index.html`: a headline ending in
the square and one short block under it. Add or remove a section and the zoom
chain follows; the last page always loops back to the lone square.

## Input

Wheel and trackpad, pinch (including Safari gestures), drag and tap on touch,
arrow keys, Space, Enter, Esc or Home to go back to `1×`. Clicking the counter
also goes back to the start. `prefers-reduced-motion` jumps between pages
instead of zooming. Without JavaScript the pages simply stack.

## Brand kit

The mark, avatar, LinkedIn and YouTube banners, video watermark, thumbnail
template and `og.png` live in [`brand/`](brand/). The banners are frames of
this page, rendered by `brand/render.mjs`. See [brand/README.md](brand/README.md).

## Deploying

Upload `index.html` and `og.png` as-is; there is no build step.

> **`.dev` is on the browser HSTS preload list.** There is no `http://` fallback: without
> a valid certificate for the domain the site is unreachable in *every* browser, even
> while `curl http://` happily returns 200. If it looks fine to curl and blank to humans,
> that's the cert. Diagnose with:
>
> ```bash
> openssl s_client -connect poorali.dev:443 -servername poorali.dev </dev/null
> ```
