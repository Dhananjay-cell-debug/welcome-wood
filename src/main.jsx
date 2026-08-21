import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import gsap from 'gsap'
import App from './App.jsx'
import './index.css'

// Dev-only handle so animation frames can be scrubbed and inspected during
// review. Stripped from production builds by the bundler.
if (import.meta.env.DEV) {
  window.gsap = gsap
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
