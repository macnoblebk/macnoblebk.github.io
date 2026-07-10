# Portfolio — source

A small static site: plain HTML/CSS plus one dependency-free JS file for the screenshot carousel. No build step, no framework — easy to host on GitHub Pages and easy to edit by hand.

```
index.html          the whole page
css/style.css        all styling (design tokens at the top)
js/script.js          the screenshot carousel (drag/swipe + dots + arrow keys)
assets/               app icon + real screenshots
```

## 1. Add your real icon

Replace `assets/app-icon-placeholder.svg` with your real app icon, **keeping the same filename** (or update the two `src="assets/app-icon-placeholder.svg"` references in `index.html` if you rename it). Any square image works — PNG or JPG is fine too, just update the file extension in `index.html` and the `<link rel="icon">` line in `<head>`.

The screenshot carousel under "Singlething, a closer look" already uses your real screenshots from `assets/screenshots/`. To swap them or add another app, drop new images in there and update the `<img>` tags in the `#screens` section — no cropping needed, real device screenshots (with the status bar / Dynamic Island already in the image) drop straight in. The phone frame is a plain rounded bezel with no drawn notch, so it won't double up with what's already in your screenshot.

## 2. Edit your content

Everything is plain text in `index.html` — no templating. Update:

- Your name (headline, footer)
- Bio paragraph — city, availability, Twitter/GitHub links
- The project icon grid — one real tile is there for Singlething; copy it to add more projects, and delete the dashed "next app" placeholder tile whenever you like
- The Singlething detail copy next to the carousel (name, status, description, tech stack) if the app changes or moves out of review

## 3. Preview locally

Just open `index.html` in a browser — everything is a relative path, no server required.

## 4. Deploy to GitHub Pages

1. Create a new GitHub repo (e.g. `your-username.github.io` for a root domain, or any name for a project site).
2. Push these files to the repo root:
   ```bash
   git init
   git add .
   git commit -m "Portfolio site"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
   git push -u origin main
   ```
3. On GitHub: **Settings → Pages → Build and deployment → Source: "Deploy from a branch"**, branch `main`, folder `/ (root)`. Save.
4. Your site will be live in a minute or two at:
   - `https://YOUR-USERNAME.github.io/` (if the repo is named `YOUR-USERNAME.github.io`), or
   - `https://YOUR-USERNAME.github.io/YOUR-REPO/` (any other repo name)

## Notes

- Colors, fonts, and spacing are all defined as CSS custom properties at the top of `css/style.css` under `:root` — change `--bg-start`/`--bg-end` for a different gradient, `--ink` for the text color, etc.
- The carousel in `js/script.js` has no dependencies and supports mouse drag, touch swipe, dot clicks, and left/right arrow keys.
