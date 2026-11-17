# The Sentinels of the Rose — Website

Public website for The Sentinels of the Rose, an armored sword-combat performance group based in southwest Michigan and northern Indiana. The group performs at renaissance faires and gives presentations at libraries and schools.

- Live site: https://kyleleroykelly.github.io/sentinels-website/
- Future domain: sentinelsoftherose.com
- Booking email: sentinelsoftherose@gmail.com

Built with [Astro](https://astro.build) and deployed to GitHub Pages by GitHub Actions on every push to `main`, plus a weekly rebuild so past events roll into the archive.

- [MAINTENANCE.md](MAINTENANCE.md) explains how to add events, photos, and videos, connect the booking form, and switch to the custom domain.
- [PLAN.md](PLAN.md) holds the original plan and decision log.

## Branches

- `main` is what gets deployed.
- `dev` is where bigger changes are tried first.

## Layout

| Path | What's there |
|---|---|
| `src/pages/` | One file per page |
| `src/content/events/` | One Markdown file per event |
| `src/content/shows/` | One Markdown file per show or program |
| `src/data/` | Site settings, member roster, gallery captions and videos |
| `src/assets/` | Logo files and gallery photos |
| `src/components/`, `src/layouts/` | Shared page pieces |
| `scripts/` | Image preparation scripts |
| `Logo Pictures/` | Original logo files as received |
