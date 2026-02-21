import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'

const Contact = lazy(() => import('./contact.tsx'))
const Join = lazy(() => import('./Join.tsx'))
const Community = lazy(() => import('./Community.tsx'))
const SummerCamps = lazy(() => import('./SummerCamps.tsx'))
const Members = lazy(() => import('./Members.tsx'))
const Donate = lazy(() => import('./Donate.tsx'))
const NotFound = lazy(() => import('./NotFound.tsx'))
const MeetTheTeam = lazy(() => import('./MeetTheTeam.tsx'))
const StemKits = lazy(() => import('./StemKits.tsx'))
const Recycling = lazy(() => import('./Recycling.tsx'))


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Suspense fallback={<div className="min-h-screen" />}>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/join" element={<Join />} />
          <Route path="/community" element={<Community />} />
          <Route path="/community/meet-the-team" element={<MeetTheTeam />} />
          <Route path="/community/stem-kits" element={<StemKits />} />
          <Route path="/community/recycling" element={<Recycling />} />
          <Route path="/summer-camps" element={<SummerCamps />} />
          <Route path="/members" element={<Members />} />
          <Route path="/donate" element={<Donate />} />
          {/* 404 Catch-all route - must be last */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </StrictMode>,
)