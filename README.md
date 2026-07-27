# Jackson Creative + Jackson Insight — Website

A single static site (HTML/CSS/JS, no build step) that hosts both brands with a top-bar toggle between them.

- **Creative** lives at the site root (`index.html`, `services.html`, `work.html`, `contact.html`).
- **Insight** lives under `insight/` (`index.html`, `services.html`, `work.html`, `contact.html`, `text-signup.html`, `privacy.html`, `terms.html`).
- Shared styles and scripts are in `assets/`. Logos and partner logos are in `assets/` and `assets/partners/`.

Hosting: **Vercel** · Source control: **GitHub** · Local editing: this folder on your Mac.

---

## One-time setup

### 0. Prerequisites
- Git installed (`git --version`). On macOS it comes with the Xcode command line tools: `xcode-select --install`.
- A GitHub account and a Vercel account (log into Vercel with your GitHub account for the smoothest flow).
- Optional but handy: the GitHub CLI (`brew install gh`) and the Vercel CLI (`npm i -g vercel`).

### 1. Initialize the Git repo (run these on your Mac)
Open Terminal and run:

```bash
cd "$HOME/Documents/Claude/Projects/Jackson Creative Website"
rm -rf .git                 # clears a partial repo left by the setup tool; safe to run
git init
git branch -M main
git add -A
git commit -m "Initial commit: Jackson Creative + Jackson Insight website"
git log --oneline           # confirm you see your commit
```

> Note: the assistant pre-staged everything and even attempted the first commit, but the synced folder wouldn't let it clean up Git's lock files. The `rm -rf .git` above wipes that partial repo so you start clean — all your website files, `.gitignore`, `vercel.json`, and this README are untouched.

### 2. Create the GitHub repository and push

**Option A — using the GitHub CLI (easiest):**
```bash
gh auth login          # once, follow the prompts
gh repo create jackson-creative-website --private --source=. --remote=origin --push
```

**Option B — manually:**
1. On github.com, create a new **empty** repo named `jackson-creative-website` (no README/.gitignore — this folder already has them).
2. Then, from Terminal in this folder:
```bash
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/jackson-creative-website.git
git push -u origin main
```

### 3. Import the repo into Vercel
1. Go to vercel.com → **Add New… → Project** → import `jackson-creative-website` from GitHub.
2. Framework preset: **Other** (it's a static site). Leave **Build Command** empty and **Output Directory** empty/root.
3. Click **Deploy**. You'll get a live `*.vercel.app` URL in a minute.

### 4. Add your domains
In the Vercel project → **Settings → Domains**, add both:
- `thejacksoncreative.com` (and `www.thejacksoncreative.com`) — your primary domain.
- `jacksoninsight.com` (and `www.jacksoninsight.com`) — also point this at the **same** project.

`vercel.json` already handles the Insight redirect: when a visitor lands on `jacksoninsight.com`, the root and the key pages redirect into the `/insight` section:
- `jacksoninsight.com` → `/insight`
- `jacksoninsight.com/text-signup` → `/insight/text-signup`
- `jacksoninsight.com/privacy` → `/insight/privacy`
- `jacksoninsight.com/terms` → `/insight/terms`
- `jacksoninsight.com/contact` → `/insight/contact`

**DNS:** at your domain registrar, point each domain to Vercel as Vercel instructs (usually an `A` record to `76.76.21.21` for the apex, and a `CNAME` to `cname.vercel-dns.com` for `www`). Vercel shows the exact records per domain and issues SSL automatically.

---

## Everyday workflow (push changes to the live site)

Edit files locally, then from Terminal in this folder:

```bash
git add -A
git commit -m "Describe what you changed"
git push
```

Vercel automatically builds and deploys every push to `main` — your changes go live in about a minute. Each push also gets its own preview URL, and the Vercel dashboard lets you roll back to any previous deploy instantly.

Tip: work on a branch for bigger changes and open a Pull Request — Vercel posts a preview URL on the PR so you can review before merging to `main`.

---

## Clean URLs

`vercel.json` sets `cleanUrls: true`, so pages are served without the `.html` extension:
`/services`, `/work`, `/contact`, `/insight`, `/insight/text-signup`, etc. Existing `.html` links keep working (they redirect to the clean URL).

**For the 10DLC SMS submission**, your sign-up page is live at:
`https://www.thejacksoncreative.com/insight/text-signup` and (via redirect) `https://www.jacksoninsight.com/text-signup`.
Privacy and Terms are at `/insight/privacy` and `/insight/terms` (and the `jacksoninsight.com/privacy` · `/terms` shortcuts).

---

## The background video (Creative hero)

Drop your looping clip in as `assets/hero.mp4` (optionally `assets/hero.webm` for a smaller file and `assets/hero-poster.jpg` for the first frame), commit, and push. Until then the hero shows its dark background gracefully.

---

## Adding form capture later (optional)

Right now the contact and SMS sign-up forms open a pre-filled email — no backend required. When you want submissions captured automatically, two easy paths:

- **Form service (no code):** create an endpoint at a service like Formspree for your inbox and paste it into each form's `action=""` (there's a comment in the form markup showing exactly where). Done.
- **Supabase (own your data):** create a Supabase project, add a Vercel Serverless Function under `/api` that inserts submissions into a table, and store the Supabase URL/key as Vercel Environment Variables (never commit them). Useful if you want a stored, timestamped record of SMS opt-in consent. Ask and I can scaffold this.

---

## Project structure

```
.
├── index.html            # Creative — home
├── services.html         # Creative — services
├── work.html             # Creative — work
├── contact.html          # Creative — contact
├── insight/
│   ├── index.html        # Insight — home
│   ├── services.html
│   ├── work.html
│   ├── contact.html
│   ├── text-signup.html  # SMS opt-in sign-up (10DLC)
│   ├── privacy.html      # Privacy Policy (SMS section)
│   └── terms.html        # Terms & Conditions (SMS section)
├── assets/
│   ├── styles.css        # shared styles + themes
│   ├── script.js         # shared interactions
│   ├── jackson-creative-logo.png
│   ├── jackson-insight-logo.png
│   └── partners/         # partner logos
├── vercel.json           # clean URLs + jacksoninsight.com redirects
├── .gitignore
└── README.md
```
