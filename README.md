# Hirusha Madhushan — Portfolio

Static, animated portfolio site. No build step, no dependencies — open `index.html`.

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
  image:       "assets/weather.png",       // "" or a missing file → gradient shows
  description: "…",
  tech:        ["React", "Chart.js"],
  code:        "https://github.com/…",     // "" hides the CODE link
  demo:        "https://…"                 // "" hides the LIVE DEMO link
}
```

Order in the array = order on the page.

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
| `assets/resume.pdf` | Download CV button | |
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

**The one thing that is my guess, not your data:** the skill-bar percentages in the Skills section. Tune them — each bar is two numbers in `index.html`:

```html
<div class="bar-top"><span class="nm">React 18</span><span class="pc">88%</span></div>
<div class="bar-track"><div class="bar-fill" data-w="88"></div></div>
```

---

## Animations

Preloader · custom trailing cursor · interactive particle constellation that drifts away from the pointer · drifting gradient orbs, masked grid and film grain · line-by-line hero name reveal · role typewriter (Full Stack → Frontend → Backend → ML) · scroll progress bar · shrinking nav with active-section highlight · scroll reveals staggered by `data-delay` · 3D tilt with cursor spotlight on cards · magnetic buttons · counting stats · skill bars that fill in sequence with a shine sweep · infinite tech marquee (pauses on hover) · floating portrait with scan line and info chips · full-screen animated mobile menu.

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

Full step-by-step in **[DEPLOY.md](DEPLOY.md)** — including how to solve the
"my CV doesn't have the portfolio link on it yet" problem.

Short version: create a public repo named `hirushamadhushan.github.io`, push this
folder to it, turn on Pages. Site lands at <https://hirushamadhushan.github.io>.
