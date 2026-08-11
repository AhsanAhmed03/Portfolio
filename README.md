# Ahsan Ahmed — Android Developer Portfolio

A rebuilt, single-page portfolio. No frameworks, no build step — plain HTML, CSS and JavaScript.
Drop it into a GitHub Pages repo and it works.

---

## Deploy to GitHub Pages

1. Unzip this folder.
2. Copy `resume/ahsanahmedresume.pdf` from your existing repo into the `resume/` folder here
   (see `resume/README.txt`).
3. Push everything to the root of your `Portfolio` repository, replacing the old files.
4. In the repo: **Settings → Pages → Source: Deploy from a branch → `main` / `(root)`**.
5. Live at `https://ahsanahmed03.github.io/Portfolio/` in a minute or two.

To preview locally before pushing:

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

---

## Files

```
index.html              all content and structure
assets/css/style.css    design tokens, layout, light + dark themes
assets/js/main.js       theme toggle, nav, scrollspy, counter, filters
images/apps/            drop your real app icons here (optional)
resume/                 put ahsanahmedresume.pdf here
favicon.svg
```

---

## What changed from the old site

**Content**
- Hero now leads with the number that makes your case: **4,710,000+ combined installs**, added up
  from the 15 apps you had listed. That is the single strongest fact on the page and it was buried.
- Work experience rewritten. The Funprime section had most bullets duplicated twice — cut to six
  distinct ones. Compulogic had four near-identical pairs — cut to five.
- App descriptions rewritten so they read as engineering work, not store copy.
- Added an "Available for work" signal, location, and an availability line in the About facts.

**Fixed**
- The contact email link was `https://mailto:aahsanaahmed26@gmail.com`, which is broken and opens
  nothing. It is now a working `mailto:` link.
- Nav links all pointed at `#` and went nowhere. They now scroll to real sections and highlight the
  section you are in.
- The "View Portfolio" button pointed at the resume PDF, not the portfolio. Now it goes to the apps.

**SEO**
- All meta tags were empty. Now filled: description, keywords, author, canonical, Open Graph and
  Twitter cards, plus `Person` structured data so Google can read your job title, skills and profiles.
- Real page title with your role and stack in it.

**Design and build**
- Material 3 tonal design — the design language of the platform you build on. Generous rounding,
  tonal surfaces, `primary` / `primary-container` colour roles.
- Light and dark themes, following the system by default, with a toggle that remembers the choice.
- Fully responsive down to 360px.
- Keyboard focus rings, a skip link, and `prefers-reduced-motion` respected.
- No jQuery, no Bootstrap, no template CSS. The old site loaded a Colorlib template; this is ~3 files.
- App icons load from `images/apps/` if present and fall back to a coloured glyph if not, so it never
  shows a broken image.

---

## Editing

**Add an app** — copy an `<article class="app">` block in `index.html` and change the text.
Set `data-cat` to one of `tools`, `media`, `personalization`, `fun`, and `data-play` to `yes` or `no`.
`style="--h:264"` is the icon hue, 0–360.

**Update the install total** — change `data-to="4710000"` on the `<span class="odo">` in the hero.

**Change the accent colour** — edit `--pri`, `--pri-cont` and `--on-pri-cont` under `[data-theme="light"]`
and `[data-theme="dark"]` at the top of `style.css`. Everything else follows.

---

## One thing worth doing

Nine of the fifteen apps link to a Google Drive folder of screenshots rather than a store listing.
If any of those are live on Play under your name or your employer's, swapping in the store URL will
carry a lot more weight with a recruiter than a Drive link.
