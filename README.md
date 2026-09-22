# SEND transition resources site

A small static site built with [Astro](https://astro.build). No database, no accounts, no tracking cookies.

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # outputs to dist/
```

## Change the business name
Edit `SITE_NAME` in `src/config.mjs`. It updates the header, footer, page titles and schema.
`AUTHOR_NAME` (same file) is your own name, used in the About text; leave it alone if the trading name changes.

Also in `src/config.mjs`, replace the bracketed placeholders: `SITE_URL` (your domain), `CONTACT_EMAIL`, `ADDRESS`, `RESPONSE_TIME`, and `DELIVERY_CONSENT`.

## Add or edit products
Everything is in `content/products.json`.
- `products` appear on **Resources** with a buy button and price.
- `services` appear on **Packages** with "Request a quote" and an indicative fee.

Copy an existing entry, give it a unique `id`, and edit. `cover` can be `terracotta`, `plum` or `charcoal`. New services appear automatically in the enquiry form's package list.

A few optional fields:
- `priceLabel` on a product — replaces the small "Price" caption above the price, e.g. `"Introductory price"` (used on the toolkit) or `"Free download"` (used on the parent guide).
- `free: true` on a product — changes the button wording ("Get the guide" / "Sign-up form to be added") instead of the buy-now wording, and drops the immediate-delivery consent requirement, since that's specifically about paid digital purchases.
- `fee` on a service — shown instead of the default "Quote on request".

## Connect payment links
1. Create a product in **Payhip** or a **Stripe Payment Link**.
2. Paste its URL into that product's `buyUrl`. Until you do, the button shows "Buy link to be added".
3. **Immediate delivery consent:** ask for this at checkout too. In Stripe, use the custom text / terms checkbox on the Payment Link. In Payhip, use the terms option. Reuse the solicitor-approved wording from `DELIVERY_CONSENT`. The Resources page also requires a ticked box before a buy link opens (for paid products — free downloads skip this).

## Connect the parent guide sign-up
The "Parent and Carer Guide" product is free in exchange for an email address, but there's no mailing list wired up yet — its `buyUrl` is empty, so the button shows "Sign-up form to be added". Once you've picked a provider (Mailchimp, Brevo, ConvertKit, etc.), set that product's `buyUrl` to your sign-up form's URL, and update the "Newsletter or mailing list" section of `src/pages/legal/privacy-policy.astro` to name the provider and explain how to unsubscribe.

## Connect the enquiry form
The form in `src/pages/contact.astro` is set up for **Netlify Forms** (`data-netlify`, with a honeypot spam trap). After deploying, enquiries appear in the Netlify dashboard under Forms. Add an email notification there.

To use **Formspree** instead: remove `data-netlify` and `netlify-honeypot`, the hidden `form-name` input, and set `action` to your Formspree URL. Keep the `bot-field` honeypot input.

## Free sample
Replace `public/downloads/free-sample.pdf` with your real file (keep the file name, or edit the link in `src/pages/index.astro`).

## Legal pages
All five are written out in full already, in plain English, to match what the site actually does — but they're still drafts (see the notice box on each page, and the HTML comment at the top of each file) and need a solicitor's review before you rely on them. Each is linked from the footer on every page, listed on `/legal/`, and has a short-URL redirect that only works once deployed, not on `npm run dev` (`public/_redirects`):

| Page | File | Short URL |
|---|---|---|
| Terms and conditions of sale | `src/pages/legal/terms-of-sale.astro` | `/terms` |
| Privacy policy | `src/pages/legal/privacy-policy.astro` | `/privacy` |
| Refunds and digital delivery | `src/pages/legal/refunds-and-digital-delivery.astro` | `/refunds` |
| Licence terms | `src/pages/legal/licence-terms.astro` | `/licence` |
| Accessibility statement | `src/pages/legal/accessibility-statement.astro` | `/accessibility` |

The accessibility statement is the one exception — it's a factual statement about how the site's built, not contractual wording, so it isn't marked as a solicitor-review draft the way the other four are.

Bracketed placeholders still to fill in across these pages: `[PAYMENT PLATFORM]` (Stripe or Payhip, appears on the terms and privacy pages), `[HOSTING PROVIDER]` (privacy policy only), and `[REFUND TIMESCALE TO BE CONFIRMED]` (refunds page) — plus whatever `CONTACT_EMAIL` and `ADDRESS` still show as placeholders from `src/config.mjs`. Each page also has a `LAST_UPDATED` constant near the top — update that whenever you change the page.

## Deploy
**Netlify:** push to GitHub, "Add new site" > "Import from Git". Build command `npm run build`, publish directory `dist` (already in `netlify.toml`). Then set your domain and update `SITE_URL`.
**Cloudflare Pages:** same build command and output directory. Use Formspree for the form.

Both platforms issue an HTTPS certificate for your domain automatically and redirect `http://` to `https://`; that's on by default and there's nothing to switch on. `public/_headers` adds security headers (HSTS and a few others) on top, and works on either platform unchanged.

## Icons and social preview image
- `public/favicon.svg`, `public/favicon-16.png`, `public/favicon-32.png` — browser tab icon.
- `public/images/apple-touch-icon.png` — icon when someone adds the site to an iPhone home screen.
- `public/images/icon-192.png`, `public/images/icon-512.png`, `public/site.webmanifest` — same, for Android/Chrome.
- `public/images/og-cover.png` — the image shown when a link to the site is shared on social media or in chat apps (1200×630). It's plain typography in the site's own colours, no photos.

All were generated from the site's palette and the step icon in the hero. If you change `SITE_NAME`, also update the `name`/`short_name` in `site.webmanifest`. If you change the tagline or headline, regenerate `og-cover.png` to match (ask Claude Code, or redraw it — it's a plain PNG, not code-generated at build time).

## Analytics (off until you switch it on)
The site sets no cookies and shows no cookie banner until you turn analytics on — there's nothing to ask consent for otherwise. To turn it on:

1. Create an account with a privacy-friendly, cookie-free analytics provider. [Plausible](https://plausible.io) is what the code is wired for by default; [Fathom](https://usefathom.com) and [Cloudflare Web Analytics](https://www.cloudflare.com/en-gb/web-analytics/) are similar cookie-free alternatives (Cloudflare's is free) — to use one of those instead, change `scriptSrc` in `src/config.mjs` and the `data-domain` attribute it sets in `src/components/CookieConsent.astro` to match that provider's own snippet.
2. In `src/config.mjs`, set `ANALYTICS.enabled = true` and `ANALYTICS.domain` to your site's domain as registered with that provider.
3. That's it — a small banner (`src/components/CookieConsent.astro`) then asks each visitor first. The analytics script is only requested if they accept, or tick "Analytics" under "Customise" and save. Their choice is remembered in their browser's local storage on their own device, not a cookie, so it isn't shared between visitors and never reaches you or Claude. A "Cookie settings" link appears in the footer automatically so they can change their mind later.

There's no "Marketing" or "Functional" category, because nothing on the site uses one — a toggle for a cookie that doesn't exist would be misleading. If that changes (e.g. you add ad tracking), add a category for it in `CookieConsent.astro` and have your solicitor confirm the wording.

## Before launch checklist
- Replace every `[BRACKETED]` placeholder (search the project for `[`).
- Add real prices, payment links, sample file, email and address.
- Solicitor review of the legal pages and consent wording, including the cookie banner text if you turn analytics on.
- Regenerate `og-cover.png` once you've picked a trading name/headline, if different from now.
