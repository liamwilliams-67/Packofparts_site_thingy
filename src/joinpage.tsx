import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// 1. Import index.css FIRST to load Tailwind and global fonts
import './index.css' 
// 2. Then import page-specific CSS
import './Join.css'
import Join from './Join.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Join />
  </StrictMode>,
)
