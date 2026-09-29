# Ajayi Crowther University — ACU Website (Vite + React)

This repository contains the ACU, Oyo website and the small CMS that powers it.
Everything runs locally: the site, the API and the database.

**Live repository:** https://github.com/joelhabila1000/acu-site-prod

## What's in here

| Piece | Where | Runs on |
| --- | --- | --- |
| Public site | `src/` (React + Vite, builds to `dist/`) | http://localhost:5173 |
| API + admin CMS | `server/` (Express + Prisma) | http://localhost:4000 |
| Database | MySQL / MariaDB | localhost:3380 (XAMPP) |
| Image uploads | `uploads/` (served at `/uploads/...`) | local disk |

## Running locally

You need **Node 20+** and a **local MySQL/MariaDB** running.

### 1. Install dependencies

```bash
npm install --include=dev
cd server && npm install
```

> Use `--include=dev`. If `NODE_ENV=production` is set in your shell, npm
> silently skips dev dependencies and `vite` will be missing.

### 2. Start the database

This project is set up against the **XAMPP MariaDB** install on port `3380`:

```bash
# start
C:\xampp\mysql\bin\mysqld.exe --defaults-file=C:\xampp\mysql\bin\my.ini --console

# stop (in another terminal)
C:\xampp\mysql\bin\mysqladmin.exe -u root -h 127.0.0.1 -P 3380 shutdown
```

The app expects the database and user below (already created):

```
database: acu_cms
user:     acu
password: acu_local_dev
port:     3380
```

To recreate them:

```sql
CREATE DATABASE IF NOT EXISTS acu_cms CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER IF NOT EXISTS 'acu'@'127.0.0.1' IDENTIFIED BY 'acu_local_dev';
GRANT ALL PRIVILEGES ON acu_cms.* TO 'acu'@'127.0.0.1';
FLUSH PRIVILEGES;
```

Connection settings live in [server/.env](server/.env) (see [server/.env.example](server/.env.example)).

### 3. Create the tables and load the starting content

```bash
cd server
npx prisma db push
npm run seed
```

`db push` creates the schema; `seed` loads settings, faculties, principal
officers, news & events and the admin user. Both are safe to re-run.

### 4. Run everything

```bash
npm run dev
```

That starts both processes together:

- Site — http://localhost:5173
- API — http://localhost:4000

Use `npm run dev:site` or `npm run dev:api` to run just one.

## Admin

Go to http://localhost:5173/admin and sign in with:

```
admin@acu.edu.ng / adminchangeme
```

Change that password in **Users & Roles** as soon as you can.

## Editing content

There are two content files and it matters which one you edit:

- [src/data/content.js](src/data/content.js) — the bundled fallback the site
  uses when the API is unavailable.
- [server/prisma/seedContent.js](server/prisma/seedContent.js) — what the
  database gets seeded with. **The API wins over the fallback**, so run
  `npm run seed` after editing this, or the change won't appear.

Navigation in particular is stored in the database as a setting, so adding a
nav item means editing both files and re-running the seed (or editing it in the
CMS).

The **Sustainability** page is fully editable from the admin:

- **Settings → Sustainability** — hero slides, intro copy, statistics, the 17-goal
  section, priority goals, university contributions, initiatives, impact stories,
  campus gallery, collaborators, commitments and the get-involved cards.
- **Documents & Reports** — upload PDFs, Word or Excel files that visitors can
  download. They appear in the **Reports & Documents** section of the page, which
  only renders once at least one document exists.
- **Staff Directory** — every staff record is either **academic** (teaching) or
  **non-academic**. Academic staff sit in a faculty and department; non-academic
  staff (ICT, bursary, bookshop…) use the **Unit / section** field instead. The
  public directory shows them as separate groups with a filter for each. New
  records default to *academic*, so set the type explicitly for support staff.
- **Departments** — create these before assigning them to staff; the picker on
  the staff form reads from here.

Edits are saved to the database and appear on the site immediately.

> Careful: `npm run seed` **overwrites every setting** with the values in the
> seed files, including anything you changed in the admin. Only run it on a
> fresh database, or when you actually want to reset the content.

## Scripts

| Command | Does |
| --- | --- |
| `npm run dev` | API + site together |
| `npm run dev:site` | Vite dev server only |
| `npm run dev:api` | API only |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Preview the production build |
| `npm run lint` | oxlint |
| `npm run seed` | (in `server/`) reload starting content |

## Forms

Contact and Admissions forms do client-side validation only. Connect the
handlers in [src/pages/Admissions.jsx](src/pages/Admissions.jsx) and
[src/pages/Contact.jsx](src/pages/Contact.jsx) to a backend or form service
before accepting real submissions.

## Going live

See [DEPLOY.md](DEPLOY.md) for the Hostinger deployment guide.
