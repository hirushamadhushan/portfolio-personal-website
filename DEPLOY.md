# Hosting

Two options, both free, both auto-deploy on every `git push`. You only need one.

| | Vercel | GitHub Pages |
|---|---|---|
| URL | `hirushamadhushan.vercel.app` | `hirushamadhushan.github.io/portfolio-personal-website` |
| Clean short URL? | yes, pick any project name | only if the repo is renamed `hirushamadhushan.github.io` |
| Setup | import the repo, click Deploy | Settings → Pages → pick branch |
| Custom domain | free | free |

**Vercel is the easier one here** — the repo is already named
`portfolio-personal-website`, and Vercel lets you choose the URL independently of
that. You also already have an account from MediSync.

Whichever you pick, the URL is knowable **before** you deploy, which is what
makes the CV problem solvable (last section).

---

## Option A — Vercel

1. Go to <https://vercel.com/new> and **Import Git Repository**.
2. Find `portfolio-personal-website` → **Import**.
3. On the configure screen:
   - **Framework Preset:** `Other`
   - **Build Command:** leave empty — there is no build step
   - **Output Directory:** leave empty
   - **Project Name:** `hirushamadhushan` ← this decides the URL
4. **Deploy**.

Live at `https://hirushamadhushan.vercel.app` in about 30 seconds. Every push to
`main` redeploys automatically.

Custom domain later: Project → Settings → Domains → add it, follow the DNS
instructions. (Same flow you used for `medisynclk.dev`.)

---

## Option B — GitHub Pages

For the clean root URL `https://hirushamadhushan.github.io`, the repo has to be
named exactly `hirushamadhushan.github.io` — rename it under
**Settings → General → Repository name** (GitHub redirects the old URL, nothing
breaks), then update the local remote:

```bash
git remote set-url origin https://github.com/hirushamadhushan/hirushamadhushan.github.io.git
```

Otherwise you get `hirushamadhushan.github.io/portfolio-personal-website`, which
also works fine.

Then: repo → **Settings** → **Pages** → *Build and deployment*:

- Source: **Deploy from a branch**
- Branch: **main**, folder: **/ (root)** → **Save**

Give it 1–2 minutes.

---

## Already done

The repo is created, git is configured and everything is pushed:

```
https://github.com/hirushamadhushan/portfolio-personal-website
```

So you only need the host step above — nothing else to set up.

---

## Every update after that

Change a file (or download a new `js/projects.js` from `admin.html`), then:

```bash
cd C:/Users/Admin/portfolio
git add .
git commit -m "add new project"
git push
```

Live in under a minute. Hard-refresh with **Ctrl+Shift+R** if you still see the
old version — the browser caches CSS and JS.

---

## The CV / portfolio-link chicken-and-egg

You noticed the real problem: the CV in `assets/` doesn't have the portfolio
link on it, and you can't add the link until the site is hosted.

**It isn't actually circular** — you choose the URL, so you can put it on the CV
*before* the site exists:

1. Open the source document you made the CV from (the Word/Docs file, not the PDF).
2. In the header line that already has LinkedIn and GitHub, add whichever host
   you picked above:

   ```
   Portfolio: hirushamadhushan.vercel.app
   ```

3. Export to PDF, save it as `assets/resume.pdf` in this folder.
4. Push. Site and CV go live together, and the link works immediately.

The **Download CV** button in the hero already points at `assets/resume.pdf`, so
that filename is what matters.

**If you only have the PDF and lost the source**, the link is still editable:
- <https://www.ilovepdf.com/edit-pdf> or Adobe Acrobat's Edit PDF will let you
  add the line to the header.
- Or rebuild the header in any PDF editor — it's one line of text.

Either way, do it before the final push so you never have two versions of the CV
floating around.

---

## Optional: your own domain

You already own `medisynclk.dev`, so a subdomain like `hirusha.medisynclk.dev`
costs nothing extra.

**On Vercel:** Project → Settings → Domains → add the domain → follow the DNS
records it prints. Vercel issues the HTTPS certificate itself.

**On GitHub Pages:** add a file named `CNAME` in this folder containing just the
domain, point an `A` record at GitHub's IPs (`185.199.108.153`, `.109.153`,
`.110.153`, `.111.153`), then repo → Settings → Pages → Custom domain → tick
**Enforce HTTPS**.

---

## Notes

- `admin.html` gets published along with everything else. It's harmless — it has
  no backend and can't change what visitors see. Delete it before deploying if
  you would rather not ship it; the site works fine without it.
- Keep the repo public if you use GitHub Pages — private repos don't serve Pages
  on the free plan. Vercel deploys private repos fine.
