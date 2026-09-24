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

## Sell with Payhip
Payhip takes payment and delivers the download itself, and the site links to it. The platform name shown on the site comes from `PAYMENT_PLATFORM` in `src/config.mjs`.

1. Create a Payhip account and connect a payout account (PayPal or Stripe). Those are your own accounts to create.
2. Add each paid product in Payhip (upload the file, set the price in GBP), then copy its product link.
3. Paste each link into that product's `buyUrl` in `content/products.json`. Until you do, the button shows "Buy link to be added".
4. **Delivery consent at checkout:** in the product's checkout settings, add a required "Legal"-type question that links to `/legal/refunds-and-digital-delivery/`, using the solicitor-approved wording from `DELIVERY_CONSENT`. The Resources page also asks for a tick before a buy link opens.
5. **VAT — decide this before going live.** Payhip handles UK and EU VAT on digital sales at checkout, and by default adds it on top of your price (there is a "VAT included" option in Payhip's Taxes settings). This changes what buyers pay and what you receive, so check it with your accountant. The terms of sale are worded to work either way ("the total you will pay, including any VAT, is shown before you confirm").

## The free Parent and Carer Guide and the mailing list
Payhip does **not** host a mailing list. It hands opted-in email addresses to a separate email service. The code assumes **MailerLite** (an official Payhip integration, EU-based); change `MAILING_LIST.provider` in `src/config.mjs` if you pick another. Check the provider's current free-plan limits first — they have changed recently.

1. Create a MailerLite account and a list (e.g. "Parent and carer guide").
2. In Payhip, connect MailerLite under Marketing > Mailing Lists (paste its API key).
3. Create the guide in Payhip as a **free** product, upload the PDF, and under Advanced Options tick "Automatically subscribe customers to mailing list" and pick that list.
4. Paste the guide's link into its `buyUrl` in `content/products.json`. The button changes to "Get the guide".
5. **Test it as a UK visitor before switching on:** download the guide and check that Payhip offers an opt-in tick-box and only adds you to the list when it's ticked. Payhip's help says the box is shown to EU customers, so confirm it appears for UK ones.
6. Set `MAILING_LIST.live` to `true` in `src/config.mjs`. The privacy policy wording changes to match (it names Payhip and the provider and explains unsubscribing).

## Connect the enquiry form
The form in `src/pages/contact.astro` is built for **Netlify Forms** (`data-netlify`, with a honeypot spam trap). Three things must happen in the Netlify dashboard for it to work:

1. **Turn on form detection.** Netlify does not do this by default. In your site: Forms > Enable form detection. Until this is on, submissions return a "Page not found" error.
2. **Redeploy** the site (Deploys > Trigger deploy) so Netlify finds the form. A new deploy from GitHub also does this.
3. **Add an email notification:** Forms > Form notifications > Add notification > Email, and enter the address that should receive enquiries. Without this, enquiries only sit in the dashboard.

Then send yourself a test enquiry and check it arrives. The email's Reply-To is set from the form's `email` field, so replying goes to the enquirer.

To use **Formspree** instead: remove `data-netlify` and `netlify-honeypot`, the hidden `form-name` input, and set `action` to your Formspree URL. Keep the `bot-field` honeypot input.

## Free sample
The home-page "Try a free template" section is hidden until `FREE_SAMPLE.url` in `src/config.mjs` is set. Once you have a real sample, make it a free Payhip product (so it can also feed the mailing list) and paste its link there, with an optional `title`.

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

The legal pages now name **Payhip** (payments, via `PAYMENT_PLATFORM`) and **Netlify** (hosting and the enquiry form). The only placeholders left on them come from `CONTACT_EMAIL` and `ADDRESS` in `src/config.mjs`, until you fill those in. Each page also has a `LAST_UPDATED` constant near the top — update that whenever you change the page.

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
- Add the Payhip links, the sample file, your email and address; turn on Netlify form detection and the email notification.
- Solicitor review of the legal pages and consent wording, including the cookie banner text if you turn analytics on.
- Regenerate `og-cover.png` once you've picked a trading name/headline, if different from now.
