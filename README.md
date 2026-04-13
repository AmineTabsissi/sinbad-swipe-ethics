## Sinbad: Swipe Ethics

A minimal, laptop-first web game built with **Vite + React + TypeScript**. Guide Sinbad (and the Sultan of Samarkand) through **8 fixed scenarios**, choosing between **Compassionate (←)** and **Mercantile (→)** actions to shape three meters: **Ethics**, **Wealth**, and **Reputation** (0–100). Your final outcome is one of **9 endings** based on those meters.

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

### Midterm presentation (slides)

The **midterm deck** is built into the same app. From **Home** or **Result**, click **Midterm presentation**, or open the app with `#presentation` in the URL (e.g. `http://localhost:5173/#presentation`). Use **← / → / Space** to change slides, **Esc** or **Back to game** to return.

### Controls

- **Left Arrow**: Compassionate choice (LEFT)
- **Right Arrow**: Mercantile choice (RIGHT)
- **R**: Restart (clears progress and returns to Home)
- **Mouse**: Click the on-screen buttons for the same actions

### Game flow

- **Home**: Title, description, **Start New Voyage**. If there is saved progress in `localStorage`, a **Resume Last Voyage** button is shown. **Midterm presentation** opens the slide deck in the same page.
- **Play**:
  - Shows **Card X of 8**
  - Displays **three meters**:
    - **Ethics**: Mercantile ↔ Compassion
    - **Wealth**: Poor ↔ Treasure
    - **Reputation**: Scorn ↔ Honor
  - Renders one **Scenario Card** at the center
  - Bottom: two large buttons
    - **Compassionate (←)**
    - **Mercantile (→)**
  - After each choice, a brief toast appears under the card for ~1 second with the consequence text and meter change (e.g. “Compassion +10”).
- **Result**:
  - Shows your outcome title (9 combinations based on **Wealth tier** × **Legacy tier**)
  - Final scores for **Ethics**, **Wealth**, and **Reputation**
  - Counts of mercantile and compassionate choices
  - A short epilogue paragraph based on your ending
  - Buttons: **Restart**, **Copy Result** (copies a short text summary to the clipboard), **Midterm presentation**

### Optional: sound

- The game uses **Web Audio** for click, whoosh, and completion chimes (no files required).
- For optional ambient background sound during Play: add `public/sounds/ambient.mp3` (looping). The game will play it automatically when you enter the play screen.

### Persistence

- Progress is automatically stored in **`localStorage`** under the key `sinbad-swipe-ethics`.
- Refreshing the page will **not** lose your progress.
- **Restart** (button or `R` key) clears saved state and returns you to the Home screen.
