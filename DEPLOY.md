# Deploying on Hostinger

This stack is one long-running Node process plus a PostgreSQL database:

| Piece | What it is | Where it runs |
| --- | --- | --- |
| Public site | static `dist/` built by Vite | served by the API process (already wired) |
| API + admin | Express + Prisma (Node) | the same Node process |
| Database | PostgreSQL (Neon, or Postgres on the server) | cloud or local |
| Uploads | images/PDFs on disk | a persistent folder outside the repo |

The Express app already serves the built SPA and falls back to `index.html`, so
**one Node process serves the whole site** — no separate web hosting needed.

---

## 0. Which Hostinger product do you have?

| Product | Can it run this? | What to do |
| --- | --- | --- |
| **VPS** (KVM, root SSH) | **Yes — recommended** | Follow this guide end to end. |
| **Cloud / Business shared hosting** | Usually **no** | hPanel has no reliable long-running Node process. Put the API on the VPS (or another Node host) and point the domain there. |
| **Plain web hosting (PHP/cPanel)** | **No** | Same as above: this app needs a persistent Node process. |

Check in hPanel: if you have SSH and root (or `sudo`), it is a VPS.

Everything below assumes an Ubuntu 22.04/24.04 VPS with SSH access.

---

## 1. What you need before starting

- Domain pointed at the VPS (A record) — or use the VPS IP first.
- A database. **Neon (current) can stay**; the app does not care where Postgres
  lives. If you prefer everything on Hostinger, install Postgres on the VPS
  (step 3b) instead of using Neon.
- The repo on GitHub (`origin/main`), since deploys pull from it.

Node **22 LTS** or newer is required by Vite 8.

---

## 2. Server setup

```bash
# as root
apt update && apt upgrade -y
apt install -y curl git nginx

# Node 22 LTS
curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
apt install -y nodejs
node -v      # v22.x
```

Create a dedicated user so the app does not run as root:

```bash
adduser --disabled-password --gecos "" acu
usermod -aG www-data acu
su - acu
```

Clone the project:

```bash
git clone https://github.com/joelhabila1000/acu-site-prod.git ~/acu
cd ~/acu
```

---

## 3. Database

### 3a. Keep Neon (simplest)

Use the pooled connection string from the Neon dashboard as `DATABASE_URL`.
Nothing else to install — just make sure the VPS can reach it.

### 3b. Postgres on the VPS

```bash
sudo apt install -y postgresql
sudo -u postgres psql -c "CREATE USER acu WITH PASSWORD 'CHANGE_ME';"
sudo -u postgres psql -c "CREATE DATABASE acu_cms OWNER acu;"
```

`DATABASE_URL="postgresql://acu:CHANGE_ME@127.0.0.1:5432/acu_cms?schema=public"`

Then push the schema and seed (step 6).

---

## 4. Environment file

Create `~/acu/server/.env` (never commit it):

```bash
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
```

```ini
# Postgres (Neon or local)
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/acu_cms?sslmode=require"

# REQUIRED: the API refuses to start without a real value.
AUTH_SECRET="<the long random string>"

# The site origin(s) allowed to call the API.
CORS_ORIGINS="https://acu.edu.ng,https://www.acu.edu.ng"

# Public base URL of the API so uploaded files resolve absolutely.
PUBLIC_BASE_URL="https://acu.edu.ng"

# Behind nginx: needed for correct client IPs and rate limiting.
TRUST_PROXY=true

# Uploads must live outside the repo so deploys don't wipe them.
UPLOAD_DIR="/home/acu/uploads"

# Optional: only when using Vercel Blob instead of disk.
# BLOB_READ_WRITE_TOKEN="vercel_blob_rw_..."

# Node listens here; nginx proxies to it.
PORT=4000
```

```bash
mkdir -p /home/acu/uploads
chmod 755 /home/acu/uploads
```

> `UPLOAD_HARD_MAX_MB` defaults to 100 (the inaugural-lecture proceedings cap).
> If you change it, also raise nginx's `client_max_body_size` (step 6).

---

## 5. Build

```bash
cd ~/acu
npm install --include=dev        # vite is a devDependency — do not let NODE_ENV strip it
npm --prefix server install      # prisma runs `generate` on postinstall
npm run build                    # writes dist/
cd server
npx prisma db push               # create/update tables
```

First deploy only — this **overwrites every setting** with the seed values:

```bash
npm run seed        # roles, admin user, settings, content
npm run seed:pages  # the informational pages (safe to re-run; never overwrites admin edits)
npm run sync:nav    # only needed if you later change nav in the seed files
```

> Re-run `npm run seed` only on a fresh database: it resets settings, including
> anything changed in the admin.

---

## 6. Run it as a service + nginx

### systemd

Create `/etc/systemd/system/acu.service`:

```ini
[Unit]
Description=ACU website + API
After=network.target

[Service]
User=acu
WorkingDirectory=/home/acu/acu/server
ExecStart=/usr/bin/node src/index.js
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now acu
sudo systemctl status acu      # should say active (running)
```

The app listens on `127.0.0.1:4000` (or all interfaces — nginx proxies to it).

### nginx

`/etc/nginx/sites-available/acu`:

```nginx
server {
    listen 80;
    server_name acu.edu.ng www.acu.edu.ng;

    # Large PDF uploads: must be >= UPLOAD_HARD_MAX_MB. Keep both in step.
    client_max_body_size 100m;

    location / {
        proxy_pass         http://127.0.0.1:4000;
        proxy_http_version 1.1;
        proxy_set_header   Host              $host;
        proxy_set_header   X-Real-IP         $remote_addr;
        proxy_set_header   X-Forwarded-For   $proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Proto $scheme;
        proxy_read_timeout 120s;
    }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/acu /etc/nginx/sites-enabled/acu
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl reload nginx
```

### SSL

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d acu.edu.ng -d www.acu.edu.ng
```

Certbot edits the nginx config to redirect 80 → 443 and renews automatically.

---

## 7. DNS and the library subdomain

- Point `acu.edu.ng` and `www` at the VPS IP (A records).
- The same app serves the library shell at `/library`; for
  `library.acu.edu.ng`, add an A record to the **same IP** and add the origin to
  `CORS_ORIGINS`.

---

## 8. First login

- Visit `https://acu.edu.ng/admin`
- Sign in with username **`admin`** and password **`adminchangeme`** (the seed
  default; the email `admin@acu.edu.ng` works too)
- Change the password immediately under **Users & Roles**.

If the site you are replacing already has an admin account, do **not** run
`npm run seed` against it — the password would be reset to the default above.

---

## 9. Deploying updates

```bash
cd ~/acu
git pull
npm install --include=dev
npm --prefix server install
npm run build
cd server && npx prisma db push
sudo systemctl restart acu
```

- Only run `seed` / `seed:pages` / `sync:nav` when the update says so — they
  write content into the database.
- Uploads are untouched because they live in `UPLOAD_DIR`, outside the repo.

---

## 10. Things that commonly bite

| Symptom | Cause |
| --- | --- |
| `AUTH_SECRET is not set` on start | `.env` missing or still the placeholder. |
| `vite: not found` at build | installed with `NODE_ENV=production`; use `npm install --include=dev`. |
| 404 on refresh at `/sustainability` | `dist/` missing, so the SPA fallback is not registered — run `npm run build`. |
| Uploads vanish after a deploy | `UPLOAD_DIR` points inside the repo. |
| Large PDFs fail with 413 | nginx `client_max_body_size` below the app's limit. |
| Everyone shares one rate-limit bucket | `TRUST_PROXY` not set. |
| CORS errors in the console | site origin missing from `CORS_ORIGINS`. |
| Admin login 500s | schema not pushed — `npx prisma db push` in `server/`. |
| Database unreachable intermittently | Neon suspends idle endpoints; retry, or use Postgres on the VPS. |

---

## 11. Old Vercel files

`vercel.json` and `api/` are only used by the Vercel deployment. They are
harmless on Hostinger and can be deleted once this deploy is confirmed.
