// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Where the site lives.
//
// While hosted at GitHub Pages under Kyle's account the site is served from
//   https://kyleleroykelly.github.io/sentinels-website/
// so `site` is the GitHub Pages origin and `base` is the repo name.
//
// When the custom domain is connected, change these two lines to:
//   site: 'https://sentinelsoftherose.com',
//   base: '/',
// and add a `public/CNAME` file containing `sentinelsoftherose.com`.
export default defineConfig({
  site: 'https://kyleleroykelly.github.io',
  base: '/sentinels-website',

  trailingSlash: 'always',
  build: { format: 'directory' },

  // Keep whitespace between inline elements (Astro 7 defaults to JSX-style trimming).
  compressHTML: true,

  image: {
    layout: 'constrained',
    responsiveStyles: true,
  },

  integrations: [sitemap({ filter: (page) => !page.includes('/thanks/') })],
});
