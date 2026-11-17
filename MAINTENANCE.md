# Maintaining the website

Everything on the site is plain text files in this repo. Edit a file, commit to `main`, and the site rebuilds itself in about two minutes. You can edit right on github.com (open the file, click the pencil icon, then "Commit changes") or locally.

The live site: https://kyleleroykelly.github.io/sentinels-website/

## Branches

- `main` is what's live. Anything committed to `main` gets published.
- `dev` is for bigger changes you want to try first. Merge `dev` into `main` when it's ready.

For small text fixes and new events, committing straight to `main` on github.com is fine.

## Find every placeholder

Search the repo for `PLACEHOLDER`. Every bit of made-up text is marked with it.

## Add an event

Create a new file in `src/content/events/`. Name it with the date first so the folder stays sorted, for example `2027-07-04-lakeside-faire.md`:

```markdown
---
title: Lakeside Renaissance Faire
start: 2027-07-04
end: 2027-07-05            # optional, for multi-day events
venue: Lakeside Park
city: St. Joseph
state: MI                  # defaults to MI if left out
url: https://example.com   # optional link to the event's own page
type: faire                # faire, festival, library, school, private, or other
times: Shows at 11am and 2pm   # optional
---

Optional description. Shows on the Events page.
```

Upcoming events appear on the home page (next three) and the Events page. Once an event's last day passes, it moves to "Past appearances" automatically. The site rebuilds every Monday morning to make that happen, or right away on any commit.

To remove an event, delete its file.

## Edit shows and programs

Each show is a file in `src/content/shows/`. The `audience` field (`faire`, `library`, `school`, or `private`) decides which section it appears in, and `order` sets the order on the page.

## Add photos

1. Copy full-size photos into the `photos-raw/` folder. That folder is never uploaded to GitHub.
2. In a terminal in this folder, run:

   ```bash
   npm run photos
   ```

   This makes web-sized copies in `src/assets/photos/`.
3. Optional but recommended: add a caption for each photo in `src/data/gallery.ts`. Captions are used as alt text for screen readers.
4. Commit the new files in `src/assets/photos/`.

The home page shows the first six photos alphabetically by filename. Rename files to change the order (for example `01-duel.jpg`, `02-crowd.jpg`).

Credit the photographer. The gallery page already credits Mitch Colagrossi Photo.

## Add videos

Upload the video to YouTube. Then add its id (the part after `v=` in the link) to the `videos` list in `src/data/gallery.ts`.

## Update contact info and social links

All in `src/data/site.ts`: email, Facebook and Instagram links, the booking form key, founding year, and the full-album link.

## Update member bios

Edit `src/data/members.ts`. Each fighter has a name, role, two colors (shown as a stripe on their card), and a bio.

## Connect the booking form

The form uses Web3Forms, which is free and needs no server.

1. Go to https://web3forms.com and enter `sentinelsoftherose@gmail.com`.
2. Copy the access key it emails you.
3. Paste it into `web3formsKey` in `src/data/site.ts` and commit.
4. Send a test request from the live site to make sure it arrives.

The key is safe to have in a public repo. It only lets people send email to that one address.

## Switch to sentinelsoftherose.com

1. Buy the domain (Cloudflare Registrar or Porkbun are both at-cost).
2. In the domain's DNS settings, add these records:
   - Four `A` records for `@`: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - A `CNAME` record for `www` pointing to `kyleleroykelly.github.io`
3. In `astro.config.mjs`, change `site` to `'https://sentinelsoftherose.com'` and `base` to `'/'`.
4. In `public/robots.txt`, change the sitemap URL to `https://sentinelsoftherose.com/sitemap-index.xml`.
5. Create `public/CNAME` containing just `sentinelsoftherose.com`.
6. Commit, then on GitHub go to Settings, then Pages, enter the custom domain, and tick "Enforce HTTPS" once it's offered.

## Working locally

You need Node.js 22.12 or newer.

```bash
npm install
```

```bash
npm run dev
```

Then open http://localhost:4321/sentinels-website/ to see changes live as you edit.

Other commands:

| Command | What it does |
|---|---|
| `npm run build` | Builds the finished site into `dist/` |
| `npm run photos` | Makes web copies of photos in `photos-raw/` |
| `npm run assets` | Regenerates the rose icon, favicons, and share image from the logo files |
