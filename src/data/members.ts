// Member roster. PLACEHOLDER entries until Kyle gathers names, bios, and photos.
// To add a photo, drop it in src/assets/members/ and set `photo` to its filename
// (then wire it up in src/pages/about.astro).

export interface Member {
  name: string;
  role: string;
  colors: [string, string];
  bio: string;
  photo?: string;
}

export const members: Member[] = [
  {
    name: 'Fighter Name',
    role: 'Founder and Captain',
    colors: ['#1f3b63', '#fffdf8'],
    bio: 'PLACEHOLDER. A short bio about this fighter: how they came to armored combat, their weapon of choice, and something fun.',
  },
  {
    name: 'Fighter Name',
    role: 'Fighter',
    colors: ['#9b1c2e', '#b08d3c'],
    bio: 'PLACEHOLDER. Each fighter has their own colors, shown in the stripe above.',
  },
  {
    name: 'Fighter Name',
    role: 'Fighter and Armorer',
    colors: ['#2f5d3a', '#e6d9bd'],
    bio: 'PLACEHOLDER. Bios can be as long or short as you like.',
  },
  {
    name: 'Fighter Name',
    role: 'Fighter and Narrator',
    colors: ['#3b2a5a', '#d9c7a0'],
    bio: 'PLACEHOLDER. Add or remove entries in src/data/members.ts.',
  },
];
