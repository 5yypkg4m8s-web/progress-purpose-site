// Everything you are likely to change lives here or in content/*.json.

// The one place the business name is set. Change it here and it updates everywhere.
export const SITE_NAME = 'Progress & Purpose';

// The author's own name (used in the "about" text and as the data controller on the
// privacy policy). Keep this even if the trading name changes again.
export const AUTHOR_NAME = 'Nadia Abudulkadir';

export const TAGLINE = 'Creating resources, consultancy and pathways for SEND transitions';

// Placeholders until decided. Square brackets mark anything still to be replaced.
export const SITE_URL = 'https://progresspurpose.co.uk'; // no trailing slash
// The public address for quote requests and mailing-list questions. Any personal
// address is deliberately kept out of the site and this repository.
export const CONTACT_EMAIL = 'enquiries@progresspurpose.co.uk';
export const ADDRESS = '[ADDRESS]';
export const RESPONSE_TIME = '2 to 5 days';

// The platform that takes payment and delivers downloads. Named on the Resources page,
// the terms of sale and the privacy policy from this one value.
export const PAYMENT_PLATFORM = 'Payhip';

// Mailing list for the free Parent and Carer Guide. Payhip does not host a list itself:
// it hands opted-in emails to a separate email service (Payhip has a direct MailerLite
// integration; change `provider` if you choose another). Keep `live: false` until the
// service is connected and tested; the privacy policy changes wording when it's true.
export const MAILING_LIST = {
  provider: 'MailerLite',
  live: false,
};

// Free sample template on the home page. Leave `url` empty and the section is hidden.
// Paste a Payhip free-product link (or a direct file link) and it appears.
export const FREE_SAMPLE = {
  url: '',
  title: '',
};

// Shown next to buy buttons. Replace after a solicitor has reviewed it.
export const DELIVERY_CONSENT =
  '[CHECKOUT CONSENT WORDING TO BE SUPPLIED AFTER SOLICITOR REVIEW: the buyer agrees to immediate delivery of digital content.]';

export const NAV = [
  { href: '/about/', label: 'About' },
  { href: '/resources/', label: 'Resources' },
  { href: '/packages/', label: 'Packages' },
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
