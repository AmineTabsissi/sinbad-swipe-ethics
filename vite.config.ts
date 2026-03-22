import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages (project site): must match your GitHub repo name exactly, with slashes.
// Example: repo github.com/you/sinbad-swipe-ethics → base: '/sinbad-swipe-ethics/'
// If your site is username.github.io with a root repo, use base: '/'
// https://vite.dev/guide/build.html#public-base-path
const repoBase = '/sinbad-swipe-ethics/'

export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? repoBase : '/',
  plugins: [react()],
}))