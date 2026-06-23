# ProGleam — Exterior Cleaning Website

Static multi-page website for **ProGleam Ltd**, exterior cleaning specialists based in
Kilmarnock, covering Ayrshire, Glasgow and surrounding areas. Built for local SEO and
conversion: the homepage is the main sales page, and every key service and area has its
own crawlable page.

## Source of truth
This folder is the single working copy:

```
C:\Users\jimmy\OneDrive\Documents\New project\progleam-website
```

All edits and deployments are made from here. An older Claude-generated
`outputs\progleam-site` copy is deprecated and should not be used.

## Current state (ready for launch pending photos/content)
- **34 pages:** homepage; services index + 12 service pages; areas index + 12 area pages;
  gallery; quote; contact; 404; and Privacy, Cookie and Terms.
- **Forms — connected to Web3Forms** (access key in place). Each form posts to
  `api.web3forms.com`, requires a name, a service and **at least one of phone or email**,
  shows an accessible success message (`role="status"`, focus-announced), prevents double
  submission, and carries a hidden `source` field identifying which form was used.
- **Contact:** mobile 07863 017292, landline 01563 657121, email info@progleam.co.uk.
  Privacy requests go to privacy@progleam.co.uk; legal pages also reference
  support@progleam.co.uk.
- **Company:** ProGleam Ltd, registered in Scotland, company number SC866567, registered
  office 1 Simonsburn Road, Kilmarnock, KA1 5LA.
- **Reviews:** real Google reviews on the homepage, with a combined Google/Facebook
  strapline.
- **Legal:** Privacy, Cookie and Terms pages are drafted and marked `noindex`.
- **SEO:** unique title, meta description and H1 per page; `HomeAndConstructionBusiness`,
  per-service `Service`, per-area LocalBusiness, `BreadcrumbList` and `FAQPage` schema;
  Open Graph + Twitter card; a real social share image; `robots.txt`; and a cleaned
  `sitemap.xml` that **excludes the noindex legal pages**.

## Structure
Clean folder-per-page URLs (`/services/roof-cleaning/`, `/areas/kilmarnock/`, etc.).
Shared assets live in `/assets/` (`css/styles.css`, `js/main.js`, `images/`). Pages use
relative paths, so the site works both opened locally and hosted at a domain root.

## Positioning note — roof repairs
ProGleam is positioned as an **exterior cleaning** company. The logo lockup still reads
"Exterior Cleaning & Roof Repairs", which reflects the business's history and is
intentional. Confirm at launch whether to keep the roof-repairs wording in the logo.

## Deployment
Source is pushed to GitHub repo `JamesX49/progleam-website` (branch `main`), which
auto-deploys to DigitalOcean App Platform. Do **not** publish until the items below are
addressed and you give the go-ahead. See `DEPLOYMENT-CHECKLIST.md`.

## Remaining before / at launch
- **Real photos** — driveway, patio, gutter, area banners and the gallery still use
  "Replace with your photo" placeholders. Roof cleaning already uses real before/after photos.
- **Verify trust/operational claims** — see `CLAIMS-TO-VERIFY.md`.
- **Live deployment checks** — see `DEPLOYMENT-CHECKLIST.md`.
- **Host-level security headers** (DigitalOcean) — see `DEPLOYMENT-CHECKLIST.md`.
- **Confirm** the three email inboxes (info@, privacy@, support@) are monitored, and that
  the Facebook/Instagram handles in the footer are correct.

## Tech
Plain static HTML/CSS/JS, no build step or framework. Edit the page files directly.
