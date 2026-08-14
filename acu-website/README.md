# Ajayi Crowther University — Website Redesign

A fully responsive React + Vite redesign concept for the Ajayi Crowther University
(ACU), Oyo website, inspired by ACU's own site and the American University of
Nigeria's layout patterns.

## Tech stack

- **React 19** + **Vite** — fast dev server, optimized production build
- **React Router v7** — client-side routing (Home / About / Academics / Admissions / Contact)
- Plain CSS with design tokens (no framework lock-in) — easy to restyle
- Fonts: **Times New Roman** for headings, **Constantia** for body text, with
  serif fallbacks (Georgia/Cambria) for systems that lack them

## Getting started

```bash
npm install
npm run dev        # local dev server, usually http://localhost:5173
npm run build       # production build → outputs to /dist
npm run preview     # preview the production build locally
```

## Project structure

```
src/
  data/content.js       ← ALL editable text, links, images live here
  components/            Navbar, Footer, Hero, StatsBar, FacultiesGrid, etc.
  pages/                 Home, About, Academics, Admissions, Contact, NotFound
  index.css               design tokens (colors, fonts, spacing) + shared classes
```

### To edit content (text, phone numbers, links, images)

Open `src/data/content.js`. Everything the site displays — the motto, contact
info, faculties list, news items, programme cards, image URLs, social links —
is centralized there. You generally never need to touch component files just
to change wording.

### To change colors or fonts

Edit the `:root` variables at the top of `src/index.css`:

```css
--navy-900: #0c2340;
--gold-500: #c9a227;
--oxblood-600: #7a2331;
--font-display: "Times New Roman", "Georgia", "Cambria", serif;
--font-body: "Constantia", "Cambria", "Georgia", serif;
```

## Images

The current build hot-links real photography directly from `acu.edu.ng`
(campus buildings, VC portrait, news photos) so nothing here is a stock photo
or placeholder. For a production launch, it's worth **downloading those
images and serving them from your own domain** (e.g. a `public/images`
folder) instead of hot-linking someone else's server — that protects you if
the source URLs ever change or the source site rate-limits/blocks hot-linked
traffic. Swap the URLs in `src/data/content.js` once you've done that.

## Forms

The Admissions and Contact pages include inquiry forms with client-side
validation, but **no backend is wired up** — submissions currently only show
a success message in the browser. Before going live, connect the `handleSubmit`
function in `src/pages/Admissions.jsx` and `src/pages/Contact.jsx` to a real
HTTPS endpoint (your own API, a form service like Formspree, or an email
provider). Never wire a form directly to expose credentials in client code.

## Security notes for hosting

- `index.html` ships a Content-Security-Policy meta tag restricting scripts to
  same-origin and images to HTTPS — review and tighten it for your final
  domain/CDN setup.
- All external links use `rel="noopener noreferrer"`.
- No `dangerouslySetInnerHTML`, `eval`, or dynamic script injection anywhere
  in the codebase.
- Serve the production build (`/dist`) over HTTPS only. Most static hosts
  (Netlify, Vercel, Cloudflare Pages, GitHub Pages) handle this automatically.
- If you add a real form backend, validate and sanitize on the server too —
  client-side validation here is a UX convenience, not a security boundary.

## Deploying

The `npm run build` command outputs a static `/dist` folder — deploy it to
any static host:

- **Netlify / Vercel**: connect the repo, build command `npm run build`,
  publish directory `dist`
- **GitHub Pages**: build locally and push `/dist` to a `gh-pages` branch, or
  use an action
- **Any traditional web host**: upload the contents of `/dist` via
  FTP/cPanel — this app uses client-side routing, so configure your host to
  redirect all unmatched routes to `index.html` (a "SPA fallback" rule)

## What's included

- Sticky, responsive navbar with utility bar, mobile hamburger menu, and
  active-link highlighting
- Hero section with a real campus photo, admissions ribbon
- Animated stat counters (faculties, courses, libraries, campuses)
- Programme cards (Pre-Degree, Undergraduate, Part-Time, Postgraduate)
- Full faculties directory (13 faculties)
- Latest news grid pulling real ACU headlines
- Embedded Google Map of the Oyo campus
- About page with history, vision, mission, and core values
- Admissions page with a 4-step process and inquiry form
- Contact page with a message form and map
- 404 page
