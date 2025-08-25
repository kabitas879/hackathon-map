import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// Initialize persisted theme
const stored = localStorage.getItem('theme')
if (stored) {
  const isDark = stored === 'dark'
  document.documentElement.classList.toggle('dark', isDark)
}
