<<<<<<< HEAD
# sinbad-swipe-ethics
=======
## Sinbad: Swipe Ethics

A minimal, laptop-first web game built with **Vite + React + TypeScript**. Guide Sinbad (and the Sultan of Samarkand) through **8 fixed scenarios**, choosing between **Compassionate (←)** and **Mercantile (→)** actions to shape an **Ethics Meter** from 0–100 and unlock one of three endings.

### Run instructions

- **Install dependencies**: `npm install`
- **Start dev server**: `npm run dev`
  - Then open the printed `http://localhost:5173` (or similar) in a desktop browser.

No backend, database, or external services are required.

### Put the game online with GitHub Pages

Your repo includes a workflow (`.github/workflows/deploy.yml`) that builds the site and publishes it to **GitHub Pages**.

1. **Create a GitHub repository**  
   On [github.com/new](https://github.com/new), create a repo (e.g. `sinbad-swipe-ethics`). The **name** matters for the URL below.

2. **Match Vite’s `base` to the repo name**  
   In `vite.config.ts`, set `repoBase` to `'/<YOUR-REPO-NAME>/'` (leading and trailing slashes).  
   Example: repo `github.com/you/sinbad-swipe-ethics` → `'/sinbad-swipe-ethics/'`.  
   If you use a **user site** (`username.github.io` with the repo named `username.github.io`), use `base: '/'` only (change the config accordingly).

3. **Push your project** (from your project folder):

   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/<YOUR-USERNAME>/<YOUR-REPO>.git
   git push -u origin main
   ```

4. **Turn on GitHub Pages**  
   Repo → **Settings** → **Pages** → under **Build and deployment**, set **Source** to **GitHub Actions** (not “Deploy from a branch”).

5. **Wait for the workflow**  
   Repo → **Actions** tab: the “Deploy to GitHub Pages” workflow should run on each push to `main`. When it’s green, the site is live.

6. **Open your page**  
   For a **project site**:  
   `https://<YOUR-USERNAME>.github.io/<YOUR-REPO-NAME>/`  
   Presentation deep link:  
   `https://<YOUR-USERNAME>.github.io/<YOUR-REPO-NAME>/#presentation`

If assets or styles 404, double-check that `repoBase` in `vite.config.ts` exactly matches your repository name.

### Midterm presentation (slides)

The **midterm deck** is built into the same app—no separate HTML file. From **Home** or **Result**, click **Midterm presentation**, or open the app with `#presentation` in the URL (e.g. `http://localhost:5173/#presentation`). Use **← / → / Space** to change slides, **Esc** or **Back to game** to return.

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
>>>>>>> e62d9b1 (Initial commit)
