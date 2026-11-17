import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// One Markdown file per event in src/content/events/.
// See MAINTENANCE.md for the fields and an example.
const events = defineCollection({
  loader: glob({ base: './src/content/events', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    start: z.coerce.date(),
    end: z.coerce.date().optional(),
    venue: z.string(),
    city: z.string(),
    state: z.string().default('MI'),
    url: z.string().url().optional(),
    type: z.enum(['faire', 'library', 'school', 'festival', 'private', 'other']).default('other'),
    times: z.string().optional(),
    featured: z.boolean().default(false),
  }),
});

// One Markdown file per show or program in src/content/shows/.
const shows = defineCollection({
  loader: glob({ base: './src/content/shows', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    audience: z.enum(['faire', 'library', 'school', 'private']),
    summary: z.string(),
    length: z.string(),
    space: z.string(),
    setting: z.string(),
    audienceSize: z.string(),
    order: z.number().default(99),
  }),
});

export const collections = { events, shows };
