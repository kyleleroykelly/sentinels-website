// Gallery photos are read automatically from src/assets/photos/.
// Add captions here, keyed by filename without extension. Anything without a
// caption gets a generic alt text, so captions are optional but recommended.
import type { ImageMetadata } from 'astro';

export const captions: Record<string, string> = {
  // 'example-photo': 'Two fighters in plate armor exchange blows at MacDudley’s Market.',
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
