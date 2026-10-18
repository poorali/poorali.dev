// Renders every artboard in brand/banners.html to an exact-size PNG.
//   npm i -g playwright && node brand/render.mjs
// li, yt and og are frames of ../index.html, so they always match the site.
import { chromium } from 'playwright';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const brand = path.dirname(fileURLToPath(import.meta.url));
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 2700, height: 1600 }, deviceScaleFactor: 1 });
const errs = [];
p.on('pageerror', e => errs.push(e.message));
p.on('request', r => { if (!/^(file|data):/.test(r.url())) errs.push('external request ' + r.url()); });
await p.goto(`file://${brand}/banners.html`);
await p.waitForTimeout(1500);

for (const id of ['li', 'yt', 'avatar', 'og', 'thumb']) {
  const out = id === 'og' ? path.join(brand, '..', 'og.png') : path.join(brand, `${id}.png`);
  await (await p.$('#' + id)).screenshot({ path: out });
  console.log('saved', path.relative(path.join(brand, '..'), out));
}
await p.evaluate(() => { document.documentElement.style.background = 'transparent'; document.body.style.background = 'transparent'; });
await (await p.$('#watermark')).screenshot({ path: path.join(brand, 'watermark.png'), omitBackground: true });
console.log('saved brand/watermark.png');

if (errs.length) console.log('errors:', errs.join(' | '));
await b.close();
