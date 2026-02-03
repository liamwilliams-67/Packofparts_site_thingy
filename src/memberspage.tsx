import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// 1. Import index.css FIRST to load Tailwind and global fonts
import './index.css' 
// 2. Then import page-specific CSS
import './Members.css'
import Members from './Members.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Members />
  </StrictMode>,
)
