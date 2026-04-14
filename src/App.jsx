import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/home/Home.jsx';
import DirectorWordPage from './pages/about-us/pages/administrative-board/DirectorWordPage.jsx';
import BoardMembersPage from './pages/about-us/pages/administrative-board/BoardMembersPage.jsx';
import ClubObjectivesPage from './pages/about-us/pages/objectives/ClubObjectivesPage.jsx';
import BylawsPage from './pages/about-us/pages/bylaws/BylawsPage.jsx';
import AchievementsPage from './pages/about-us/pages/achievements/AchievementsPage.jsx';
import ClubShopPage from './pages/services/pages/ClubShopPage.jsx';
import JoinMembershipPage from './pages/services/pages/JoinMembershipPage.jsx';
import VenueReservationsPage from './pages/services/pages/VenueReservationsPage.jsx';
import PhotoArchivePage from './pages/news/pages/PhotoArchivePage.jsx';
import PhotoAlbumDetailPage from './pages/news/pages/PhotoAlbumDetailPage.jsx';
import VideoArchivePage from './pages/news/pages/VideoArchivePage.jsx';
import VideoAlbumDetailPage from './pages/news/pages/VideoAlbumDetailPage.jsx';
import NewsListPage from './pages/news/pages/NewsListPage.jsx';
import NewsDetailPage from './pages/news/pages/NewsDetailPage.jsx';
import AcademyDetailPage from './pages/academies/pages/AcademyDetailPage.jsx';
import AcademyNewsDetailPage from './pages/academies/pages/AcademyNewsDetailPage.jsx';
import ProjectsListPage from './pages/projects/pages/ProjectsListPage.jsx';
import ProjectDetailPage from './pages/projects/pages/ProjectDetailPage.jsx';
import ContactPage from './pages/Contactpage.jsx';
import AOS from 'aos';
import { TopBar } from './components/layout/TopBar.jsx';
import { Header } from './components/layout/Header.jsx';
import { Footer } from './components/layout/Footer.jsx';

function AOSRefresh() {
  const location = useLocation();
  useEffect(() => {
    AOS.init({ duration: 600, once: true, offset: 60 });
  }, []);
  useEffect(() => {
    AOS.refresh();
  }, [location.pathname]);
  return null;
}

function AppContent() {
  const location = useLocation();
  useEffect(() => {
    AOS.refresh();
  }, [location.pathname]);

  return (
    <>
      <AOSRefresh />
      {location.pathname === "/" && <TopBar />}
      <Header />
      <div className="">
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/about/director-word" element={<DirectorWordPage />} />
          <Route path="/about/board-members" element={<BoardMembersPage />} />
          <Route path="/about/objectives" element={<ClubObjectivesPage />} />
          <Route path="/about/bylaws" element={<BylawsPage />} />
          <Route path="/about/achievements" element={<AchievementsPage />} />
          <Route path="/services/shop" element={<ClubShopPage />} />
          <Route path="/services/join" element={<JoinMembershipPage />} />
          <Route path="/services/reservations" element={<VenueReservationsPage />} />
          <Route path="/news/photos" element={<PhotoArchivePage />} />
          <Route path="/news/photos/:albumId" element={<PhotoAlbumDetailPage />} />
          <Route path="/news/videos" element={<VideoArchivePage />} />
          <Route path="/news/videos/:albumId" element={<VideoAlbumDetailPage />} />
          <Route path="/news/news" element={<NewsListPage />} />
          <Route path="/news/news/:articleId" element={<NewsDetailPage />} />
          <Route path="/projects/:projectId" element={<ProjectDetailPage />} />
          <Route path="/projects" element={<ProjectsListPage />} />
          <Route path="/academies/:academyId/news/:newsId" element={<AcademyNewsDetailPage />} />
          <Route path="/academies/:academyId" element={<AcademyDetailPage />} />
          <Route path="/contact" element={<ContactPage/>} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
