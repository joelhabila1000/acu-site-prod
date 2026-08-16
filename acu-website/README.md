# Ajayi Crowther University — ACU Website (Vite + React)

This repository contains a responsive React + Vite redesign of the Ajayi
Crowther University (ACU) site. It is a static site built for ease of
editing and deployment, with centralized content and simple design tokens for
branding.

**Live repository:** https://github.com/joelhabila1000/acu-site-prod

## Quick start

Install dependencies and run the dev server:

```bash
npm install
npm run dev
```

Build for production and preview the build:

```bash
npm run build
npm run preview
```

## Tech stack

- React + Vite
- React Router for client-side navigation
- Plain CSS with design tokens in [src/index.css](src/index.css)
- Centralized site content in [src/data/content.js](src/data/content.js)

## Key project files

- [src/index.css](src/index.css) — global design tokens (colors, spacing, fonts).
  The project already imports the Poppins font here.
- [src/data/content.js](src/data/content.js) — all editable site content
  (headings, copies, links, image URLs).
- [src/pages](src/pages) — route pages (Home, About, Admissions, Contact, etc.)
- [src/components](src/components) — reusable components (Navbar, Footer,
  Hero, Programme cards, etc.).

## Editing content

Most text, images and links are managed from [src/data/content.js](src/data/content.js).
Edit that file to update copy, programme lists, news items and image URLs —
no need to change component code for basic content updates.

## Fonts & design tokens

`[src/index.css](src/index.css)` defines `--font-display` and `--font-body`.
Poppins is imported via Google Fonts at the top of that file; change weights
or switch to self-hosting by updating the import and variables.

## Deployment

The production output is the static `dist` folder produced by `npm run build`.
You can deploy it to any static host (Vercel, Netlify, Cloudflare Pages, or
GitHub Pages). For GitHub Pages, build locally and push `dist` to a
`gh-pages` branch or configure a workflow to publish on push to `main`.

## Forms

Contact and Admissions forms perform client-side validation only. Connect the
form handlers in [src/pages/Admissions.jsx](src/pages/Admissions.jsx) and
[src/pages/Contact.jsx](src/pages/Contact.jsx) to a secure backend or form
service before accepting production submissions.

## Contributing

1. Fork the repo and create a branch for your feature.
2. Make changes, run `npm run dev` to test locally.
3. Open a PR with a clear description of changes.

## License

Include a license file if you plan to publish this publicly (e.g. MIT).

---

If you want, I can also:

- update the `README.md` in the repo with this content (done),
- add a short `CONTRIBUTING.md`, or
- create a GitHub Action to auto-deploy to GitHub Pages.
