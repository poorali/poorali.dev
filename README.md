# poorali.dev

One page. One file. No build, no dependencies, no network requests.

**The sky over Fethiye, right now.** The top of the page is worked out from
the clock and 36.62° N, 29.12° E: where the sun is, what colour the sky is,
whether the stars are out, and the sun's path on the water. Drag across it to
move through the day; let go and it eases back to now.

![The sky over Fethiye at golden hour, with the line: I turn founder ideas into AI products people pay for.](og.png)

## Run it

```bash
open index.html            # now
open "index.html?t=18:20"  # pinned to a time of day, handy for screenshots
```

## What it is

The home of a product engineer who builds AI products on camera, from Fethiye.
Below the sky, three short sections:

1. **The shows.** *Built in Fethiye*: one real product from idea to first
   revenue in 30 days of evenings and weekends. *Tested in Fethiye*: new AI
   tools and gadgets tried in real life with a friend from the breakfast café.
2. **Open numbers.** Every season's users, revenue and build hours, in public.
3. **Founders.** A waitlist for one-founder-at-a-time product builds from
   January 2027.

## The mark is the sun

The logo is an orange dot on a line: the sun touching the horizon, and also a
playhead on a video timeline. In the header the dot moves along its line with
the time of day in Fethiye, so the logo is a clock too. The only saturated
colour anywhere on the page is that dot and the sun it stands for.

## Updating the numbers

Edit the `SEASONS` array at the top of the script. Set `start` to the first
filming day (`'2026-11-02'`) and the page counts the days itself, in the
ledger and on the show card. Users, revenue and hours are typed in by hand.

```js
var SEASONS = [
  { n: 1, product: 'Announced soon', start: null, days: 30, users: 0, revenue: 0, hours: 0 }
];
```

## How the sky works

- **Sun position:** a low-precision solar formula (accurate to a fraction of a
  degree), Türkiye's fixed UTC+3, no DST. Sunrise and sunset are found by
  scanning the day minute by minute for the −0.833° crossing.
- **Colour:** nine keyframes of zenith, horizon and sea colour keyed on the
  sun's altitude, from deep night to high sun. Muted on purpose.
- **Text:** flips dark when the sun is more than 3° up and light otherwise.
- **The view faces south:** the sun rises on the left, sets on the right
  behind a headland to the west. The headland is a shape, not a survey.
- **No `Math.random()`:** stars and the glitter on the water come from an
  integer hash, so every visitor sees the same sky at the same minute.
- `prefers-reduced-motion` stops the twinkle and shimmer and makes scrubbing
  snap instead of ease.

`window.sky.draw(ctx, w, h, ms, opts)` paints the scene for any moment. The
brand kit uses it, which is how the banners and the site share one hand.

## Brand kit

Logos, the YouTube banner and profile picture, the LinkedIn banner, two
thumbnail templates and `og.png` all live in [`brand/`](brand/). See
[brand/README.md](brand/README.md).

## Deploying

One static file plus `og.png`. Upload both as-is; there is no build step.

> **`.dev` is on the browser HSTS preload list.** There is no `http://` fallback: without
> a valid certificate for the domain the site is unreachable in *every* browser, even
> while `curl http://` happily returns 200. If it looks fine to curl and blank to humans,
> that's the cert. Diagnose with:
>
> ```bash
> openssl s_client -connect poorali.dev:443 -servername poorali.dev </dev/null
> ```
