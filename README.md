## Arabian Nights — Three Tales

A laptop-first **Vite + React + TypeScript** anthology: **Sinbad** (*Swipe Ethics*), **Aladdin** (*The Lamp Ledger*), and **The Ebony Horse** (*Skybound Crown*). Pick a tale from the hub, then play **eight fixed beats** with two actions per card (labels are themed per story). **Ethics**, **Wealth**, and **Reputation** (0–100) drive one of **nine endings** each time. Progress, maps, and copy are per-adventure; no backend.

### Run instructions

- **Install dependencies**: `npm install`
- **Start dev server**: `npm run dev`
  - Then open the printed `http://localhost:5173` (or similar) in a desktop browser.

No backend, database, or external services are required.

### Keep `docs/` the same as your latest code

`npm run dev` only runs the dev server. The **`docs/`** folder is a **production build** (same app, with the GitHub Pages `base` path). After you change the game, refresh it:

```bash
npm run deploy:docs
```

That runs **`build:docs`** and overwrites **`docs/`** with a clean build (`--emptyOutDir`). Then commit and push **`docs/`**.

To preview the **exact** GitHub build locally (optional):

```bash
npm run preview:docs
```

Open the printed URL (often under **`/sinbad-swipe-ethics/`**).

### Put the game online with GitHub Pages

Match **`repoBase`** in `vite.config.ts` to your GitHub repo name (e.g. `'/sinbad-swipe-ethics/'`).

#### Option A — “Deploy from a branch” only (no GitHub Actions)

If **Pages** only lets you pick a **branch** (no “GitHub Actions” source), use the **`docs`** folder on **`main`**.

1. On your computer, in the project folder:

   ```bash
   npm install
   npm run deploy:docs
   ```

   This builds the site into a **`docs/`** folder (ready for GitHub Pages).

2. Commit and push **`docs/`** to **`main`**:

   ```bash
   git add docs
   git commit -m "Build site for GitHub Pages"
   git push origin main
   ```

3. On GitHub: **Settings** → **Pages** → **Build and deployment**  
   - **Source**: **Deploy from a branch**  
   - **Branch**: **`main`**  
   - **Folder**: **`/docs`**  
   - **Save**

4. Your site (after ~1 minute):  
   `https://<YOUR-USERNAME>.github.io/<REPO-NAME>/`

Whenever you change the game, run **`npm run deploy:docs`** again, commit **`docs/`**, and push.

---

#### Option A2 — `gh-pages` branch (if you prefer)

1. **Settings** → **Pages** can also use branch **`gh-pages`**, folder **`/ (root)`** — but that branch must exist first.
2. From your project:

   ```bash
   npm install
   npm run deploy
   ```

   ([gh-pages](https://www.npmjs.com/package/gh-pages) creates/updates the **`gh-pages`** branch from **`dist/`**.)

3. Then in **Pages**, choose **`gh-pages`** + **`/ (root)`**.

#### Option B — GitHub Actions

The repo includes `.github/workflows/deploy.yml`. Set Pages **Source** to **GitHub Actions** and push to `main`. Requires Actions to be allowed on your account.

#### Important — do **not** publish the raw source folder

GitHub Pages must serve the **built** app (the contents of **`dist/`** after `npm run build`), **not** the repo root with `index.html` → `/src/main.tsx`.

- **Wrong Pages setting:** Branch **`main`**, folder **`/` (root)** → browsers request `https://YOUR_USER.github.io/src/main.tsx` → **404** (there is no Vite dev server online).
- **Right:** **GitHub Actions** (workflow uploads `dist`), **or** branch **`gh-pages`** with only build output from **`npm run deploy`**.

#### Troubleshooting: `GET .../src/main.tsx` 404

1. **Settings → Pages:** Source must be **GitHub Actions** or **gh-pages** (not `main` / root of source).
2. **Open the project URL** (includes the repo name):  
   `https://YOUR_USERNAME.github.io/sinbad-swipe-ethics/`  
   Not only `https://YOUR_USERNAME.github.io/` (that’s a different site unless you use a special `username.github.io` repo).

### Final presentation (slides)

The **final deck** is built into the same app (14 slides: overview, three tales, gameplay, maps, outcomes, stack, codebase, routing, polish, content, demo, thank-you). From **Hub**, **Tale home**, or **Result**, click **Final presentation**, or open the app with `#presentation` in the URL (e.g. `http://localhost:5173/#presentation`). Use **← / → / Space** to change slides, **Esc** or **Back to app** to return.

### Controls

- **Play screen only**: **←** / **→** choose left or right (Sinbad: Compassion / Mercantile; other tales use their own verb pair on the buttons).
- **Tale home, play, or result**: **R** restarts the current tale (clears that tale’s save and returns to its home screen).
- **Mouse**: Same as keyboard — choice buttons on play, **Restart** / hub links elsewhere.

### Game flow

- **Hub**: Choose one of three adventures; a **Progress saved** badge appears when that slot has data. **Final presentation** opens the built-in slide deck (`#presentation`).
- **Tale home**: Story blurb, **Start New Voyage**, **Resume Last Voyage** when applicable, **Final presentation**.
- **Play**:
  - **Card X of 8**, per-tale **voyage map** strip, three meters (**Ethics**, **Wealth**, **Reputation**), one **Scenario Card**, two large choice buttons, short consequence toasts after each pick.
- **Result**:
  - Outcome title (9 combinations from **Wealth tier** × **Legacy tier**), final scores, mercantile/compassion counts, tale-specific epilogue where defined.
  - **Restart**, **Copy Result** (clipboard summary), **Final presentation**, **Tales** back to hub.

### Optional: sound

- The game uses **Web Audio** for click, whoosh, and completion chimes (no files required).
- For optional ambient background sound during Play: add `public/sounds/ambient.mp3` (looping). The game will play it automatically when you enter the play screen.

### Persistence

- Each tale uses its own **`localStorage`** key: `arabian-night-v1-sinbad`, `arabian-night-v1-aladdin`, `arabian-night-v1-horse`.
- The first load of Sinbad may **migrate** an older single-key save (`sinbad-swipe-ethics`) into `arabian-night-v1-sinbad`, then remove the legacy key.
- Refreshing the page does **not** lose progress for the adventure you were in (hash + saved state).
- **Restart** (or **R**) clears **only the current tale’s** slot and returns you to that tale’s **home** screen.
