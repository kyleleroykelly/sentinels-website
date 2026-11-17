// Small helpers shared across pages.

const base = import.meta.env.BASE_URL.replace(/\/+$/, '');

/** Prefix an internal path with the site's base path. `href('/about/')` → `/sentinels-website/about/`. */
export function href(path: string): string {
  return base + (path.startsWith('/') ? path : '/' + path);
}

/** Absolute URL for a path, for Open Graph tags and form redirects. */
export function absolute(path: string, siteUrl: URL | undefined): string {
  const origin = siteUrl ? siteUrl.origin : '';
  return origin + href(path);
}

const dateFmt = new Intl.DateTimeFormat('en-US', {
  weekday: 'short',
  month: 'long',
  day: 'numeric',
  year: 'numeric',
  timeZone: 'UTC',
});
const shortFmt = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' });
const monthFmt = new Intl.DateTimeFormat('en-US', { month: 'short', timeZone: 'UTC' });

/** "Sat, June 6, 2027" or "Sat, June 6 – Sun, June 7, 2027" */
export function formatRange(start: Date, end?: Date): string {
  if (!end || sameDay(start, end)) return dateFmt.format(start);
  const sameMonth = start.getUTCMonth() === end.getUTCMonth() && start.getUTCFullYear() === end.getUTCFullYear();
  if (sameMonth) {
    return `${monthFmt.format(start)} ${start.getUTCDate()}–${end.getUTCDate()}, ${end.getUTCFullYear()}`;
  }
  return `${shortFmt.format(start)} – ${shortFmt.format(end)}, ${end.getUTCFullYear()}`;
}

export function sameDay(a: Date, b: Date): boolean {
  return a.toISOString().slice(0, 10) === b.toISOString().slice(0, 10);
}

/** ISO date (YYYY-MM-DD) in UTC. */
export function isoDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

/** Today's date at midnight UTC, used to split upcoming from past events at build time. */
export function today(): Date {
  const now = new Date();
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
}

export const eventTypeLabel: Record<string, string> = {
  faire: 'Renaissance Faire',
  festival: 'Festival',
  library: 'Library Program',
  school: 'School Program',
  private: 'Private Event',
  other: 'Event',
};
