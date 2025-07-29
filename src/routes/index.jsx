import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from '@/components/HomePage.jsx'
import CoursePage from '@/components/CoursePage.jsx'
import CommunityPage from '@/components/CommunityPage.jsx'

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/courses" element={<CoursePage />} />
        <Route path="/community" element={<CommunityPage />} />
      </Routes>
    </BrowserRouter>
  );
}