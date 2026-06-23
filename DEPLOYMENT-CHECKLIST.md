# ProGleam — Deployment Checklist

Use this when publishing or re-publishing the site. Source of truth is this folder:
`C:\Users\jimmy\OneDrive\Documents\New project\progleam-website`.

## 1. Before publishing
- [ ] Confirm you are working from the `progleam-website` folder (not the old `outputs\progleam-site`).
- [ ] Real photos added where placeholders remain (driveway, patio, gutter, area banners, gallery).
- [ ] Trust/operational claims verified — see `CLAIMS-TO-VERIFY.md`.
- [ ] Legal pages (Privacy, Cookie, Terms) read through and accurate.
- [ ] Web3Forms access key confirmed, and the destination inbox is monitored.

## 2. Push / upload
- [ ] Push the folder contents to GitHub repo `JamesX49/progleam-website`, branch `main`.
- [ ] Confirm DigitalOcean App Platform picks up the deploy and the build succeeds.

## 3. Live site checks (on the real domain)
- [ ] Homepage loads correctly over HTTPS.
- [ ] A few service pages load (e.g. roof-cleaning, window-cleaning).
- [ ] A few area pages load (e.g. kilmarnock, glasgow).
- [ ] Gallery, quote and contact pages load.
- [ ] Submit a **test enquiry** from the live quote form and the live contact form; confirm it
      arrives in the inbox and the hidden `source` field shows which form it came from.
- [ ] Custom 404 page shows for an unknown URL (e.g. `/no-such-page`).
- [ ] `robots.txt` loads and references the sitemap.
- [ ] `sitemap.xml` loads and lists the public pages (it should **exclude** the noindex
      Privacy/Cookie/Terms pages).
- [ ] Social preview image shows when the homepage URL is shared (Facebook/WhatsApp/X).
- [ ] Phone links dial (mobile and landline) and email links open with `info@progleam.co.uk`.
- [ ] HTTPS is enforced (no mixed-content warnings).
- [ ] `www` vs non-`www` behaves correctly — one redirects to the other (the site canonical
      uses `https://www.progleam.co.uk/`, so non-www should redirect to www).

## 4. Search engines
- [ ] Add/verify the site in **Google Search Console**.
- [ ] Submit `sitemap.xml` in Search Console.
- [ ] (Optional) Add the site to **Bing Webmaster Tools** and submit the sitemap.

## 5. Host-level security headers (DigitalOcean)
These are **HTTP response headers**, set at the hosting platform — not HTML content in the
page files. On DigitalOcean App Platform, add them under the static site component's
settings (Headers), or in the app spec. Add these safer headers:

```
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
X-Frame-Options: SAMEORIGIN
Permissions-Policy: geolocation=(), camera=(), microphone=()
```

Do **not** add a strict Content-Security-Policy unless it is tested first, because the site
loads third-party resources that a too-strict CSP would block:
- Google Fonts (`fonts.googleapis.com`, `fonts.gstatic.com`)
- Web3Forms (`api.web3forms.com`)
- OpenStreetMap embed (`openstreetmap.org`)

If a CSP is wanted later, build it up gradually in report-only mode and test the forms and
map before enforcing it.

## 6. After launch
- [ ] Re-test the forms a day later to confirm enquiries are still arriving.
- [ ] Update the Google Business Profile (phone number, website link) to match the site.
