// Generates the derived brand assets from the logo source files:
//   src/assets/logo/rose-mark.png   – Tudor rose mark, artist initial removed, trimmed, transparent background
//   public/favicon-32.png, favicon-192.png, apple-touch-icon.png
//   public/og-image.png             – 1200x630 social share image
//
// Run with: npm run assets
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const logoDir = path.join(root, 'src', 'assets', 'logo');
const publicDir = path.join(root, 'public');
await mkdir(publicDir, { recursive: true });

const parchment = { r: 243, g: 234, b: 215 };

// 1. Rose mark: paint over the artist's "D" initial (lower right), trim to the
//    rose, pad, and make the white background transparent.
const roseSrc = path.join(logoDir, 'rose-source.jpg');
const meta = await sharp(roseSrc).metadata();
const w = meta.width ?? 2048;
const h = meta.height ?? 2048;
// The initial sits at roughly 72–76% across and 67–72% down the source image
// (measured: x 1489–1561, y 1378–1466 of 2048). The nearest leaf tip ends near
// x 1410, so a patch starting at 71.5% is clear of the rose.
const patch = {
  left: Math.round(w * 0.715),
  top: Math.round(h * 0.66),
  width: Math.round(w * 0.085),
  height: Math.round(h * 0.075),
};
const white = await sharp({
  create: { width: patch.width, height: patch.height, channels: 3, background: { r: 255, g: 255, b: 255 } },
})
  .png()
  .toBuffer();

// sharp applies trim before composite inside a single pipeline regardless of
// call order, so the patch gets its own pipeline first.
const patched = await sharp(roseSrc)
  .composite([{ input: white, left: patch.left, top: patch.top }])
  .flatten({ background: { r: 255, g: 255, b: 255 } })
  .png()
  .toBuffer();
const cleaned = await sharp(patched).trim({ threshold: 20 }).toBuffer();

// Pad to a square with a white background, then knock the white out to alpha.
const trimmed = await sharp(cleaned).metadata();
const side = Math.max(trimmed.width ?? 0, trimmed.height ?? 0) + 80;
const squared = await sharp(cleaned)
  .extend({
    top: Math.floor((side - (trimmed.height ?? 0)) / 2),
    bottom: Math.ceil((side - (trimmed.height ?? 0)) / 2),
    left: Math.floor((side - (trimmed.width ?? 0)) / 2),
    right: Math.ceil((side - (trimmed.width ?? 0)) / 2),
    background: { r: 255, g: 255, b: 255 },
  })
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

// White → transparent, keeping anti-aliased edges: alpha = 255 - min(r,g,b).
const { data, info } = squared;
for (let i = 0; i < data.length; i += 4) {
  const lum = Math.min(data[i], data[i + 1], data[i + 2]);
  data[i + 3] = 255 - lum;
  data[i] = data[i + 1] = data[i + 2] = 0;
}
const roseMark = sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } }).png();
await roseMark.clone().toFile(path.join(logoDir, 'rose-mark.png'));
const roseBuf = await roseMark.toBuffer();
console.log(`rose-mark.png ${info.width}x${info.height}`);

// 2. Favicons: rose on parchment circle.
async function icon(size, file) {
  const inner = Math.round(size * 0.82);
  const rose = await sharp(roseBuf).resize(inner, inner).png().toBuffer();
  await sharp({ create: { width: size, height: size, channels: 4, background: parchment } })
    .composite([{ input: rose, gravity: 'centre' }])
    .png()
    .toFile(path.join(publicDir, file));
  console.log(file);
}
await icon(32, 'favicon-32.png');
await icon(192, 'favicon-192.png');
await icon(180, 'apple-touch-icon.png');

// 3. Open Graph share image: black logo centered on parchment.
const logo = await sharp(path.join(logoDir, 'logo-black.png'))
  .trim({ threshold: 20 })
  .resize({ height: 540, fit: 'inside' })
  .png()
  .toBuffer();
await sharp({ create: { width: 1200, height: 630, channels: 4, background: parchment } })
  .composite([{ input: logo, gravity: 'centre' }])
  .png()
  .toFile(path.join(publicDir, 'og-image.png'));
console.log('og-image.png 1200x630');
