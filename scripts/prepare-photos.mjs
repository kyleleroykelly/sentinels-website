// Resizes photos dropped into photos-raw/ and writes web-sized copies to
// src/assets/photos/. Originals stay out of the repo (photos-raw/ is ignored).
//
//   1. Copy full-size photos into photos-raw/
//   2. Run: npm run photos
//   3. Add captions in src/data/gallery.ts (optional)
//   4. Commit src/assets/photos/
//
// Files already present in src/assets/photos/ are skipped, so re-running is safe.
import sharp from 'sharp';
import { mkdir, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const inDir = path.join(root, 'photos-raw');
const outDir = path.join(root, 'src', 'assets', 'photos');
await mkdir(inDir, { recursive: true });
await mkdir(outDir, { recursive: true });

const MAX_WIDTH = 1600;
const QUALITY = 82;

const files = (await readdir(inDir)).filter((f) => /\.(jpe?g|png|webp|tiff?|heic)$/i.test(f)).sort();
if (files.length === 0) {
  console.log(`No photos found in ${inDir}. Drop JPG or PNG files there and run again.`);
  process.exit(0);
}

let done = 0;
for (const file of files) {
  const name = file.replace(/\.[^.]+$/, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const out = path.join(outDir, `${name}.jpg`);
  try {
    await stat(out);
    console.log(`skip   ${file} (already exists as ${path.basename(out)})`);
    continue;
  } catch {}
  await sharp(path.join(inDir, file))
    .rotate() // honor EXIF orientation
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .jpeg({ quality: QUALITY, mozjpeg: true })
    .toFile(out);
  const size = (await stat(out)).size;
  console.log(`wrote  ${path.basename(out)} (${Math.round(size / 1024)} KB)`);
  done++;
}
console.log(`${done} photo(s) written to src/assets/photos/`);
