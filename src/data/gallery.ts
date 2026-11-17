// Gallery photos are read automatically from src/assets/photos/.
// Files are shown in filename order, and the home page shows the first six,
// so a number prefix (01-, 02-, ...) controls the order.
//
// Add a caption for each photo here, keyed by filename without extension.
// Captions are the alt text screen readers announce and the text under a photo
// in the lightbox, so describe what's in the picture.
import type { ImageMetadata } from 'astro';

export const captions: Record<string, string> = {
  '01-raised-sword': 'An armored fighter in a red-cross surcoat raises a sword in front of white pavilion tents',
  '02-victory': 'A Sentinel in a red cap raises both steel gauntlets in celebration',
  '03-crowd': 'Armored fighters perform in the lists in front of a large seated faire crowd',
  '04-indoor-bout': "A kneeling fighter in a red cap catches an armored opponent's sword during an indoor demonstration",
  '05-close-guard': 'Two fighters in full plate armor face off at close range',
  '06-company': 'Members of the company gather with the red lion shield in front of their encampment',
  '07-pollaxe': 'A fighter in a red arming coat holds a pollaxe overhead during an indoor demonstration',
  '08-banner': 'A fighter in a red lion surcoat stands beneath a blue banner at the encampment',
  '09-lion-surcoat': 'A Sentinel in a kettle hat and red lion surcoat at the encampment',
  '10-round-shield': 'A fighter in green armor advances across the field with a round steel shield',
};

// Videos to embed on the gallery page. Use the YouTube video id (the part after v=).
export const videos: { id: string; title: string }[] = [
  // { id: 'dQw4w9WgXcQ', title: 'Stage show at the Michigan Renaissance Festival' },
];

const modules = import.meta.glob<{ default: ImageMetadata }>('../assets/photos/*.{jpg,jpeg,png,webp}', {
  eager: true,
});

export interface Photo {
  key: string;
  image: ImageMetadata;
  alt: string;
}

export const photos: Photo[] = Object.entries(modules)
  .map(([file, mod]) => {
    const key = file.split('/').pop()!.replace(/\.[^.]+$/, '');
    return { key, image: mod.default, alt: captions[key] ?? 'The Sentinels of the Rose in armored combat' };
  })
  .sort((a, b) => a.key.localeCompare(b.key));
