# The Sentinels of the Rose — Website Plan

Status: plan approved in principle, repo created, no site code yet. Written 2026-11-16, updated the same day with Kyle's answers.

## 0. Decisions so far

| Topic | Decision |
|---|---|
| Group name | The Sentinels of the Rose |
| What the group does | Armored sword combat performances (steel armor, gambesons, mail, helmets per the Oct 2026 photo gallery) at renaissance faires, plus presentations at libraries and schools |
| Region | Southwest Michigan and northern Indiana |
| Look | Light parchment background with the black logo. Group colors are blue and white; each fighter also has personal colors (useful later for member cards) |
| Booking email | sentinelsoftherose@gmail.com |
| Pricing | "Contact for pricing" for now |
| Member bios | Later. Kyle will gather photos and info per member |
| Maintainer | Kyle, comfortable editing files on GitHub |
| GitHub | Repo `kyleleroykelly/sentinels-website` under Kyle's personal account (no group org yet) |
| Domain | sentinelsoftherose.com. No DNS record exists as of 2026-11-16, so it appears unregistered; confirm at the registrar before buying |
| Photos | Group Google account (Google Photos). A photographer friend, Mitch Colagrossi Photo, provided a free gallery dated 2026-10-24 on pic-time: https://mitchcolagrossiphoto.pic-time.com/client/101826-sentinals-of-the-rose/gallery . Credit the photographer on any photo used from it |
| Social | Facebook and Instagram pages exist but web search could not find them. Need the exact URLs from Kyle. (That they are hard to find is one more reason the website matters for search.) |

## 1. What the site must do

| Goal | How the site serves it |
|---|---|
| Advertise the group | Home page with hero logo, short pitch, photos, and a clear "Book Us" button |
| Show events | Upcoming events list that rolls past events into a history automatically |
| Pictures and videos | Curated photo gallery on the site, videos embedded from YouTube, links out to full albums |
| Receive gig requests | Booking form that emails the group, no server needed |
| Free hosting now, custom domain later | GitHub Pages with a custom domain added when ready |
| Payments or merch someday | Left as an easy add-on, not designed in now |

## 2. Recommended approach

**Static site, built with Astro, hosted on GitHub Pages.**

- Static means no server, no database, no monthly bill, and almost nothing to hack.
- Astro lets events and shows live as small text files that the build turns into pages. It optimizes images automatically and ships almost no JavaScript, so the site is fast on phones at a faire.
- GitHub Pages hosts it free with HTTPS and supports a custom domain.
- A GitHub Action rebuilds the site on every push and on a weekly schedule, so past events roll off without anyone touching the site.

Simpler alternatives if you'd rather: plain HTML/CSS (no build step, but events must be edited by hand in HTML) or Jekyll (built into GitHub Pages, no Action needed, but weaker image handling). Astro is the recommendation.

### Third-party services (all free tiers)

| Need | Service | Why |
|---|---|---|
| Booking form | Web3Forms or Formspree | Posts the form to your email; no backend. Add a honeypot field plus Cloudflare Turnstile for spam. |
| Video | YouTube (unlisted or public) | Embeds cleanly; keeps big files out of the repo |
| Full photo albums | Google Photos or Flickr shared albums | Site shows a curated set; link out for everything else |
| Analytics (optional) | Cloudflare Web Analytics or GoatCounter | Free, no cookie banner needed |
| Domain (later) | Cloudflare Registrar or Porkbun | At-cost pricing; both support free email forwarding |

Free-tier limits worth knowing: GitHub Pages sites should stay under 1 GB and 100 GB/month bandwidth, with no single file over 100 MB. Formspree's free tier caps monthly submissions (around 50); Web3Forms is more generous. Verify current limits at setup time.

## 3. Site map

1. **Home** — logo hero, one-paragraph pitch, next 3 upcoming events, a few photos, "Book Us" call to action.
2. **About** — who the group is, history, performance style and safety, member roster (optional bios/photos).
3. **Shows & Programs** — what you offer, split by audience: renaissance faire stage shows, library and school presentations, anything else (workshops, private events). Each with length, space needs, indoor/outdoor, audience size.
4. **Events** — upcoming list (date, venue, city, link to the faire or library), past events archive by year.
5. **Gallery** — photo grid with lightbox; video section with YouTube embeds; links to full albums.
6. **Book Us** — the gig request form plus what to expect (lead time, travel area: southwest Michigan and northern Indiana, requirements).
7. **Contact** — email, social links. Could be merged into Book Us.
8. Footer on every page: logo mark, social icons, email, copyright.

## 4. Brand and design

What the logo files give us:

| File | What it is | Use |
|---|---|---|
| IMG_20261116_193328.png | Full logo, black on white, clean | Light backgrounds, print |
| IMG_20261116_193320.png | Same logo, white on transparent | Dark backgrounds (hero, footer) |
| IMG_20261116_193326.png | Full logo, distressed/woodcut texture | Accent or hero background |
| IMG_20261116_193322.png | Distressed logo, white on transparent | Dark hero |
| IMG_20261116_193341.jpg | Tudor rose mark alone | Favicon, nav icon, social avatar. Has a small "D" artist mark at lower right that must be cropped out. |

Design direction:

- **Palette**: light parchment/cream background with the black logo, near-black text, a deep blue (the group color) for headings, buttons, and links, white for cards and panels, and a small amount of Tudor rose red as an accent. Reads "Tudor" without becoming a theme-park look. Dark footer using the white-on-transparent logo for contrast.
- **Type**: a blackletter display face for headings only (Google Fonts options: UnifrakturMaguntia, Pirata One, MedievalSharp) paired with a readable serif body (EB Garamond or Crimson Pro). Blackletter is hard to read at small sizes, so body text and the form stay in the serif.
- **Logo prep**: ask the artist for the original vector (SVG or AI) if it exists. Otherwise, trace or clean the PNGs, build a horizontal lockup (rose mark + wordmark) for the site header, export a favicon set and a 1200x630 social share image.
- **Mobile first**: most faire-goers will open this on a phone. Single-column layouts, big tap targets, images sized for mobile.
- **Accessibility**: real text (not images of text) for everything but the logo, alt text on all photos, visible focus states, color contrast checked.

## 5. Content to gather before building

- Group description, history, founding year, and a tagline.
- Member list with stage names, roles, optional bios and headshots.
- Descriptions of each show or program, with running time and space needs.
- Event list: past (as far back as you want shown) and upcoming, with venue, city, dates, and links.
- 20 to 40 best photos, highest resolution available, with photographer credit if needed.
- Links to existing video (or files to upload to YouTube).
- Social media links and the booking email address.
- Booking policies: lead time, travel radius, fees public or "contact for pricing", insurance or space requirements.
- The links file (Resources.txt is currently empty).

## 6. Step-by-step build plan

### Phase 0 — Setup
1. ~~Create the repo~~ Done: `kyleleroykelly/sentinels-website`, public (required for free GitHub Pages on a personal account). Can be transferred to a group organization later without breaking anything.
2. ~~Decide the booking email~~ Done: sentinelsoftherose@gmail.com.
3. Collect the content in section 5 into a `content/` folder in this project.

### Phase 1 — Skeleton and deploy
4. Scaffold the Astro project with the page list above as placeholder pages.
5. Add the GitHub Actions workflow that builds and deploys to GitHub Pages.
6. Push and confirm the placeholder site is live at `https://<org>.github.io/sentinels-website/`.

### Phase 2 — Design system
7. Prepare logo assets: clean files, horizontal lockup, favicon, share image.
8. Set up colors, fonts, header, footer, and the base page layout.
9. Build the Home page.

### Phase 3 — Content pages
10. About, Shows & Programs, Contact.

### Phase 4 — Events
11. Define the event data format (one small file per event: title, start/end dates, venue, city, state, link, type, notes).
12. Build the Events page: upcoming sorted soonest-first, past grouped by year.
13. Add the weekly scheduled rebuild so rollovers happen automatically.
14. Add schema.org Event markup so Google can list events in search results.
15. Optional: an "Add to calendar" .ics download per event.

### Phase 5 — Gallery
16. Resize and compress photos for the web (keep originals out of the repo).
17. Build the photo grid with lightbox and alt text.
18. Add YouTube embeds and album links.

### Phase 6 — Booking form
19. Create the form service account and get the endpoint key.
20. Build the form: contact name, organization, email, phone, event type, date(s), location, audience size, indoor/outdoor, budget (optional), message.
21. Add spam protection, a thank-you page, and test a real submission end to end.

### Phase 7 — Quality pass
22. Test on phones and desktops, both light and dark system themes.
23. Run Lighthouse for performance and accessibility; fix anything under 90.
24. Check every link, add page titles, descriptions, Open Graph tags, sitemap, robots.txt.

### Phase 8 — Launch
25. Announce on social, add the site link to every social profile.
26. Register the site in Google Search Console and submit the sitemap.
27. Write a one-page MAINTENANCE.md: how to add an event, add photos, and update text.

### Phase 9 — Custom domain (when ready)
28. Check availability and register (candidates: sentinelsoftherose.com / .org / .us).
29. Point DNS at GitHub Pages, set the custom domain in repo settings, enforce HTTPS.
30. Set up free email forwarding (e.g. booking@yourdomain to the group inbox).

### Future (not built now)
- Merch or payments: a Store page linking to Etsy, Square, or Stripe Payment Links needs no backend and fits the static site. Nothing in the current design blocks it.
- A browser-based editor (Decap CMS or similar) if non-technical members need to post events without touching GitHub.

## 7. Still needed from Kyle

1. Exact URLs of the Facebook and Instagram pages.
2. Links to any faires or venues you regularly play (for the Events and About pages).
3. A short paragraph about the group: when it started, who founded it, what a show looks like.
4. Names of the shows or programs you offer, with rough running times.
5. Any upcoming 2027 dates already booked.
6. Whether Mitch Colagrossi Photo is fine with photos from the gallery being used on the site with credit.
