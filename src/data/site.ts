// Site-wide settings. Edit this file to change contact details, social links,
// and the booking form connection. Everything marked PLACEHOLDER should be
// replaced before launch.

export const site = {
  name: 'The Sentinels of the Rose',
  shortName: 'Sentinels of the Rose',
  tagline: 'Armored sword combat for faires, festivals, libraries, and schools',
  description:
    'The Sentinels of the Rose are an armored sword-combat performance group based in southwest Michigan and northern Indiana. We perform at renaissance faires and festivals and bring living-history presentations to libraries and schools.',
  region: 'Southwest Michigan and Northern Indiana',
  email: 'sentinelsoftherose@gmail.com',

  // Social links. Leave `url` empty to hide a link.
  socials: [
    { name: 'Facebook', url: 'https://www.facebook.com/p/The-Sentinels-of-The-Rose-100076194217850/' },
    { name: 'Instagram', url: 'https://www.instagram.com/thesentinelsoftherose/' },
    { name: 'YouTube', url: '' /* optional */ },
  ],

  // Booking form. Create a free key at https://web3forms.com using the group
  // email, then paste it here. While it is empty the form is shown but not
  // connected, and visitors are pointed to the email address instead.
  web3formsKey: '0d1f95e5-acea-4e41-839f-b22fe72387d5',

  // Photo credit shown in the gallery.
  photoCredit: {
    name: 'Mitch Colagrossi Photo',
    url: 'https://mitchcolagrossiphoto.pic-time.com/client/101826-sentinals-of-the-rose/gallery',
  },

  // Optional link to a full photo album (Google Photos, Flickr, etc.).
  fullAlbumUrl: '' /* PLACEHOLDER */,

  // Founded year, used on the About page. PLACEHOLDER.
  founded: 2020,
};

export const nav = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about/' },
  { label: 'What We Offer', path: '/what-we-offer/' },
  { label: 'Calendar', path: '/calendar/' },
  { label: 'Gallery', path: '/gallery/' },
  { label: 'Book Us', path: '/book/', cta: true },
];
