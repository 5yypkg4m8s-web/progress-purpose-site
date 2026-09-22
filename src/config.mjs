// Everything you are likely to change lives here or in content/*.json.

// The one place the business name is set. Change it here and it updates everywhere.
export const SITE_NAME = 'Progress & Purpose';

// The author's own name (used in the "about" text and as the data controller on the
// privacy policy). Keep this even if the trading name changes again.
export const AUTHOR_NAME = 'Nadia Abudulkadir';

export const TAGLINE = 'Creating resources, consultancy and pathways for SEND transitions';

// Placeholders until decided. Square brackets mark anything still to be replaced.
export const SITE_URL = 'https://progresspurpose.co.uk'; // no trailing slash
export const CONTACT_EMAIL = '[CONTACT EMAIL]';
export const ADDRESS = '[ADDRESS]';
export const RESPONSE_TIME = '[RESPONSE TIME]';

// Shown next to buy buttons. Replace after a solicitor has reviewed it.
export const DELIVERY_CONSENT =
  '[CHECKOUT CONSENT WORDING TO BE SUPPLIED AFTER SOLICITOR REVIEW: the buyer agrees to immediate delivery of digital content.]';

export const NAV = [
  { href: '/resources/', label: 'Resources' },
  { href: '/packages/', label: 'Packages' },
  { href: '/about/', label: 'About' },
  { href: '/contact/', label: 'Contact' },
];

export const LEGAL_NAV = [
  { href: '/legal/terms-of-sale/', label: 'Terms of sale' },
  { href: '/legal/privacy-policy/', label: 'Privacy policy' },
  { href: '/legal/refunds-and-digital-delivery/', label: 'Refunds and digital delivery' },
  { href: '/legal/licence-terms/', label: 'Licence terms' },
  { href: '/legal/accessibility-statement/', label: 'Accessibility statement' },
];

// Personal profile only. Nothing from any other organisation.
export const LINKEDIN_URL = 'https://www.linkedin.com/in/nadia-abudulkadir-613666255';

// Analytics: off by default. The site sets no cookies until you turn this on.
// Turn it on only after you've created an account with a privacy-friendly, cookie-free
// provider (e.g. Plausible, plausible.io) and set your domain below.
// When enabled, the visitor is asked first (see src/components/CookieConsent.astro);
// the script only loads if they say yes, and their choice is remembered in this
// browser's local storage, not a cookie. See README.md > "Analytics" for other providers.
export const ANALYTICS = {
  enabled: false,
  domain: '[YOUR DOMAIN AS REGISTERED WITH YOUR ANALYTICS PROVIDER]',
  scriptSrc: 'https://plausible.io/js/script.js',
};
