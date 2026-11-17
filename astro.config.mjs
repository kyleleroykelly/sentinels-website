// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Where the site lives.
//
// While hosted at GitHub Pages under Kyle's account the site is served from
//   https://kyleleroykelly.github.io/sentinels-website/
// so SITE is the GitHub Pages origin and BASE is the repo name.
//
// When the custom domain is connected, change these two lines to:
//   const SITE = 'https://sentinelsoftherose.com';
//   const BASE = '';
// and add a `public/CNAME` file containing `sentinelsoftherose.com`.
const SITE = 'https://kyleleroykelly.github.io';
const BASE = '/sentinels-website';

export default defineConfig({
  site: SITE,
  base: BASE || '/',

  trailingSlash: 'always',
  build: { format: 'directory' },

  // Keep whitespace between inline elements (Astro 7 defaults to JSX-style trimming).
  compressHTML: true,

  image: {
    layout: 'constrained',
    responsiveStyles: true,
  },

  // The Shows and Events pages were renamed; send old links to the new pages.
  // Astro doesn't add the base path to redirect targets, so it's added here.
  redirects: {
    '/shows/': `${BASE}/what-we-offer/`,
    '/events/': `${BASE}/calendar/`,
  },

  integrations: [sitemap({ filter: (page) => !page.includes('/thanks/') })],
});
