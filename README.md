## Sinbad: Swipe Ethics

A minimal, laptop-first web game built with **Vite + React + TypeScript**. Guide Sinbad (and the Sultan of Samarkand) through **8 fixed scenarios**, choosing between **Compassionate (←)** and **Mercantile (→)** actions to shape an **Ethics Meter** from 0–100 and unlock one of three endings.

### Run instructions

- **Install dependencies**: `npm install`
- **Start dev server**: `npm run dev`
  - Then open the printed `http://localhost:5173` (or similar) in a desktop browser.

No backend, database, or external services are required.

### Put the game online with GitHub Pages

Match **`repoBase`** in `vite.config.ts` to your GitHub repo name (e.g. `'/sinbad-swipe-ethics/'`).

#### Option A — Deploy from your computer (no GitHub Actions)

Use this if Actions are blocked (billing) or you prefer a simple flow.

1. Repo → **Settings** → **Pages** → **Build and deployment** → **Source**: **Deploy from a branch**.
2. (First time only) Pick branch **`gh-pages`**, folder **`/ (root)`** — the branch appears after step 3.
3. From your project folder:

   ```bash
   npm install
   npm run deploy
   ```

   This runs `npm run build` and publishes **`dist`** to the **`gh-pages`** branch via the [gh-pages](https://www.npmjs.com/package/gh-pages) package.

4. Your site (after GitHub finishes):  
   `https://<YOUR-USERNAME>.github.io/<REPO-NAME>/`  
   Slides: add `#presentation` to the URL.

#### Option B — GitHub Actions

The repo includes `.github/workflows/deploy.yml`. Set Pages **Source** to **GitHub Actions** and push to `main`. Requires Actions to be allowed on your account.

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
  - Displays the **Ethics Meter** with labels "Mercantile" (left) and "Compassion" (right), plus numeric score
  - Renders one **Scenario Card** at the center
  - Bottom: two large buttons
    - **Compassionate (←)**
    - **Mercantile (→)**
  - After each choice, a brief toast appears under the card for ~1 second with the consequence text and meter change (e.g. “Compassion +10”).
- **Result**:
  - Shows ending title (Shrewd Merchant / Balanced Voyager / Moral Wanderer)
  - Final Ethics Meter score
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
