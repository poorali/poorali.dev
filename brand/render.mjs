// Saves every .asset in brand/kit.html as a PNG at its exact size.
//   npm i -g playwright && node brand/render.mjs
// Serves the repo root itself, since the kit borrows the sky from index.html.
import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const types = { '.html': 'text/html', '.svg': 'image/svg+xml', '.png': 'image/png' };
const server = createServer(async (req, res) => {
  try {
    const file = path.join(root, decodeURIComponent(new URL(req.url, 'http://x').pathname));
    if (!file.startsWith(root)) throw new Error('outside root');
    res.writeHead(200, { 'content-type': types[path.extname(file)] || 'text/plain' });
    res.end(await readFile(file));
  } catch { res.writeHead(404); res.end(); }
}).listen(0);
const port = server.address().port;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 2700, height: 1600 }, deviceScaleFactor: 1 });
await page.goto(`http://localhost:${port}/brand/kit.html`);
await page.waitForSelector('body[data-ready]');
await page.evaluate(() => document.fonts.ready);

for (const el of await page.$$('.asset')) {
  const id = await el.getAttribute('id');
  const transparent = await el.evaluate(e => e.hasAttribute('data-transparent'));
  const out = id === 'og' ? path.join(root, 'og.png') : path.join(root, 'brand', `${id}.png`);
  await el.screenshot({ path: out, omitBackground: transparent });
  console.log('saved', path.relative(root, out));
}

await browser.close();
server.close();
