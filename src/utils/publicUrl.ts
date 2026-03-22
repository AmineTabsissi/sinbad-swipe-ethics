/**
 * URLs for files in `public/`. Must use Vite's base path so assets work on
 * GitHub Pages (e.g. /repo-name/) and locally (/).
 */
export function publicUrl(path: string): string {
  const prefix = import.meta.env.BASE_URL
  const p = path.startsWith('/') ? path.slice(1) : path
  return `${prefix}${p}`
}
