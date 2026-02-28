import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import Contact from './contact.tsx'
import Join from './Join.tsx'
import Community from './Community.tsx'
import SummerCamps from './SummerCamps.tsx'
import Members from './Members.tsx'
import Donate from './Donate.tsx'
import NotFound from './NotFound.tsx'
import MeetTheTeam from './MeetTheTeam.tsx'
import StemKits from './StemKits.tsx'
import Recycling from './Recycling.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/join" element={<Join />} />
        <Route path="/community" element={<Community />} />
        <Route path="/meet-the-team" element={<MeetTheTeam />} />
        <Route path="/community/stem-kits" element={<StemKits />} />
        <Route path="/community/recycling" element={<Recycling />} />
        <Route path="/summer-camps" element={<SummerCamps />} />
        <Route path="/members" element={<Members />} />
        <Route path="/donate" element={<Donate />} />
        {/* 404 Catch-all route - must be last */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)