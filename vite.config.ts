import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages serves the app at https://<user>.github.io/<repo>/
// The build "base" must match that path or JS/CSS 404 → blank page.
// In GitHub Actions, GITHUB_REPOSITORY is set to "owner/repo" (exact repo name).
const repoFromActions = process.env.GITHUB_REPOSITORY?.split('/')[1]
const fallbackRepo = 'sinbad-swipe-ethics'
const repoBase = `/${repoFromActions ?? fallbackRepo}/`

// https://vite.dev/guide/build.html#public-base-path
export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? repoBase : '/',
  plugins: [react()],
}))