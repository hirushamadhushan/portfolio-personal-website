# Hosting this on GitHub Pages

Your site will live at:

```
https://hirushamadhushan.github.io
```

That URL is decided by your **username**, not by anything you do next — so you
already know it, before you publish anything. (That matters for the CV; see the
last section.)

---

## One-time setup

### 1. Tell git who you are

Only needed once per machine:

```bash
git config --global user.name "Hirusha Madhushan"
git config --global user.email "rdhmadhushan@gmail.com"
```

### 2. Create the repository on GitHub

Go to <https://github.com/new> and create a repo named **exactly**:

```
hirushamadhushan.github.io
```

- Visibility: **Public** (Pages needs public on the free plan)
- Do **not** tick "Add a README" — leave it completely empty

The name has to match your username exactly. Get it right and GitHub serves it
at the clean root URL above; any other name gets you
`hirushamadhushan.github.io/<repo-name>` instead.

### 3. Push the folder

```bash
cd C:/Users/Admin/portfolio
git init
git add .
git commit -m "Portfolio site"
git branch -M main
git remote add origin https://github.com/hirushamadhushan/hirushamadhushan.github.io.git
git push -u origin main
```

The first push asks you to sign in — a browser window opens, approve it there.

### 4. Turn Pages on

Repo → **Settings** → **Pages** → under *Build and deployment*:

- Source: **Deploy from a branch**
- Branch: **main**, folder: **/ (root)** → **Save**

Give it 1–2 minutes, then open <https://hirushamadhushan.github.io>.

For a repo named `<username>.github.io` this is often already switched on — check
before you change anything.

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

**It isn't actually circular** — the URL only depends on your username, so you
can put it on the CV *before* the site exists:

1. Open the source document you made the CV from (the Word/Docs file, not the PDF).
2. In the header line that already has LinkedIn and GitHub, add:

   ```
   Portfolio: hirushamadhushan.github.io
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

If you ever buy something like `hirusha.dev`:

1. Add a file named `CNAME` in this folder containing just `hirusha.dev`
2. At your domain registrar, point an `A` record at GitHub's IPs
   (`185.199.108.153`, `.109.153`, `.110.153`, `.111.153`)
3. Repo → Settings → Pages → Custom domain → enter it → tick **Enforce HTTPS**

You already did this for MediSync (`medisynclk.dev`), so it's the same drill.

---

## Notes

- `admin.html` gets published along with everything else. It's harmless — it has
  no backend and can't change what visitors see. Delete it before pushing if you
  would rather not ship it; the site works fine without it.
- Keep the repo public. Private repos don't serve Pages on the free plan.
