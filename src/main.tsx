import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

/** Public-folder images in CSS need the Vite base path (GitHub Pages). */
const base = import.meta.env.BASE_URL
document.documentElement.style.setProperty(
  '--app-bg-voyage',
  `url('${base}g-voyage.png')`,
)
document.documentElement.style.setProperty(
  '--app-result-shrewd',
  `url('${base}result-shrewd.png')`,
)
document.documentElement.style.setProperty(
  '--app-result-balanced',
  `url('${base}result-balanced.png')`,
)
document.documentElement.style.setProperty(
  '--app-result-moral',
  `url('${base}result-moral.png')`,
)

const container = document.getElementById('root')

if (container) {
  createRoot(container).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}