# Hirusha Madhushan — Portfolio

**Live:** <https://hirushamadhushan.vercel.app>

Static, animated portfolio site. No build step, no dependencies — open `index.html`.
Hosted on Vercel; every push to `main` redeploys automatically.

```
portfolio/
├── index.html          the page content / markup
├── admin.html          hidden project editor — not linked from the site
├── css/style.css       all the styling (numbered sections at the top)
├── js/
│   ├── projects.js     ← YOUR PROJECTS LIVE HERE. This is the file you edit.
│   └── main.js         all the interaction (numbered sections at the top)
├── assets/             your photo, project screenshots, CV
└── DEPLOY.md           how to host it on GitHub Pages
```

---

## Adding a new project

The Work section is generated from `js/projects.js` — you never touch HTML.

**The easy way:** open `admin.html` in your browser (double-click it). Fill in the
form, hit **Download projects.js**, drop the downloaded file into `js/`
replacing the old one, then push.

**The manual way:** open `js/projects.js` and copy an existing object. Each one is:

```js
{
  title:       "Weather Dash",             // card heading
  glyph:       "Weather",                  // big text on the thumbnail, keep it short
  badge:       "Web App · React",          // small pill, "" to hide
  theme:       "p4",                       // p1…p6 — thumbnail gradient
  live:        true,                       // green LIVE pill
  logo:        "assets/logo-weather.svg",  // centred logo on the gradient
  image:       "",                         // full-bleed screenshot; covers gradient AND logo
  description: "…",
  tech:        ["React", "Chart.js"],
  code:        "https://github.com/…",     // "" hides the CODE link
  demo:        "https://…"                 // "" hides the LIVE DEMO link
}
```

Order in the array = order on the page.

**Thumbnails** fall back in this order: `image` → `logo` → `glyph` text. So a card
always looks finished, even with nothing in `assets/`.

The three logos in `assets/` are SVG, so they stay sharp at any size:

| File | Project | Where it came from |
|---|---|---|
| `logo-medisync.svg` | MediSync | your real app logo, copied from `frontend/public/logo.svg` |
| `logo-techstore.svg` | Madhushan Tech Store | drawn to match — a CPU chip |
| `logo-heart.svg` | Heart Disease Prediction | drawn to match — heart + ECG pulse |

All three use the same outlined-geometry-with-gradient language so the row reads
as a set. To swap one out, drop your own SVG in `assets/` and point `logo:` at it.

> Why not a login and a save button? This is a static site — there's no server to
> save to. `admin.html` is the honest version of that: it builds the file, you
> commit it. One `git push` and it's live.

---

## Fill these in before publishing

Contact details, education and live-demo links are all filled in from `RDHM_Dharmakeerthi_CV_5.pdf`.
The only thing left is dropping your files into `assets/`:

| File | Used for | Notes |
|---|---|---|
| `assets/profile.jpg` | hero portrait | portrait crop, ~800×1000 (4:5). Until it exists an "HM" placeholder shows. |
| `assets/RDHM_Dharmakeerthi_CV_5.pdf` | Download CV button | The `download="Hirusha-Madhushan-CV.pdf"` attribute on the button renames it on the visitor's machine, so the file here can keep any name. Swap the filename in both places if you replace it. |
| `assets/medisync.png` | MediSync card | 21:9 screenshot |
| `assets/mystore.png` | MyStore card | 16:9 screenshot |
| `assets/heart.png` | Heart Disease card | 16:9 screenshot |

Missing images remove themselves at runtime and the animated gradient thumbnail shows instead, so nothing ever looks broken.

---

## What's on the page

**Projects** — pulled from your actual repos and READMEs:

| Project | Stack | Links |
|---|---|---|
| **MediSync** | React, Node, Express, MongoDB, Socket.IO, Tailwind, JWT, Cloudinary, Vercel | [repo](https://github.com/hirushamadhushan/medisync) · [live](https://medisynclk.dev) |
| **Madhushan Tech Store** | PHP 8, MySQL, hand-written MVC, Docker, Railway | [repo](https://github.com/hirushamadhushan/Madhushan-Tech-Store) · [live](https://madhushan-tech-store-production.up.railway.app) |
| **Heart Disease Prediction** | Python, scikit-learn, pandas, NumPy, Flask | [repo](https://github.com/hirushamadhushan/heart-disease-prediction) |

Live-demo URLs come from your CV, not from the GitHub `homepage` field — the repo still points at the old `medisync-six-pi.vercel.app`, so update it on GitHub too if you want them consistent.

The Skills section lists technologies as plain tags — no proficiency percentages, since those are guesses rather than data. Add or remove one by editing the list in `index.html`:

```html
<li class="sk">React 18</li>
```

Keep the `cnt` number in each card's `.skill-head` in sync with how many tags it holds.

---

## Animations

Preloader · custom trailing cursor · interactive particle constellation that drifts away from the pointer · drifting gradient orbs, masked grid and film grain · line-by-line hero name reveal · role typewriter (Full Stack → Frontend → Backend → ML) · scroll progress bar · shrinking nav with active-section highlight · scroll reveals staggered by `data-delay` · 3D tilt with cursor spotlight on cards · magnetic buttons · counting stats · infinite tech marquee (pauses on hover) · floating portrait with scan line and info chips · full-screen animated mobile menu.

All of it switches off automatically under `prefers-reduced-motion: reduce`.

Right-click any contact card to copy its value.

---

## Common edits

| Want to change | Where |
|---|---|
| Projects | `js/projects.js`, or `admin.html` |
| Accent colour | `--violet`, `--cyan`, `--grad` in `:root` at the top of `css/style.css` |
| Roles that type out | `roles` array, section 4 of `js/main.js` |
| Marquee tech list | `#mqTrack` in `index.html` (JS duplicates it for the seamless loop) |
| Stat numbers | `data-to="..."` on `.count` spans |
| Email address | the site uses `rdhmadhushan@gmail.com` (the one on your CV), 4 places |
| Add a certifications section | not built yet — 5 certs are listed on your CV if you want them on the page |

---

## Deploy

Already live on Vercel at <https://hirushamadhushan.vercel.app>. To ship a change:

```bash
cd C:/Users/Admin/portfolio
git add .
git commit -m "what changed"
git push
```

Vercel picks it up and redeploys in ~30 seconds. Hard-refresh with **Ctrl+Shift+R**
if you still see the old version.

**[DEPLOY.md](DEPLOY.md)** covers custom domains, the GitHub Pages alternative, and
how to handle the "my CV doesn't have the portfolio link on it yet" problem.
