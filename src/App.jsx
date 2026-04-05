import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import AOS from 'aos';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import PageTransition from './components/layout/PageTransition';
import Home from './pages/home/Home';
import ProjectAndPartnersDescription from './pages/the-project/ProjectAndPartnersDescription';
import ProjectHistory from './pages/the-project/ProjectHistory';
import ProjectComponents from './pages/the-project/ProjectComponents';
import RomaTreTeamMembers from './pages/the-project/team-members/RomaTreTeamMembers';
import TrainingActivityParticipants from './pages/the-project/team-members/TrainingActivityParticipants';
import AICS from './pages/the-project/AICS';
import RomaTreUniversity from './pages/the-project/RomaTreUniversity';
import DepartmentOfAntiquitiesOfJordan from './pages/the-project/DepartmentOfAntiquitiesOfJordan';
import TrainingOfTrainers from './pages/the-project/methodology/TrainingOfTrainers';
import TeachingModules from './pages/the-project/methodology/TeachingModules';
import EducationalWorksites from './pages/the-project/methodology/EducationalWorksites';
import TrainingInAppliedConservationSciences from './pages/the-project/methodology/TrainingInAppliedConservationSciences';
import Objectives from './pages/the-center/Objectives';
import Activities from './pages/the-center/Activities';
import Courses from './pages/the-center/Courses';
import TheTeam from './pages/the-center/TheTeam';
import Partners from './pages/the-center/Partners';
import BecomeAPartner from './pages/the-center/BecomeAPartner';
import Services from './pages/the-center/Services';
import RequestAService from './pages/the-center/RequestAService';
import Projects from './pages/the-center/Projects';
import ProjectDetail from './pages/the-center/ProjectDetail';
import ProjectsArchive from './pages/the-center/ProjectsArchive';
import News from './pages/News';
import NewsArticle from './pages/NewsArticle';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import PrivateArea from './pages/PrivateArea';
import Search from './pages/Search';

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
      <Header />
      <Routes location={location}>
        <Route element={<PageTransition />}>
          <Route path="/" element={<Home />} />
          <Route path="/the-project/project-and-partners-description" element={<ProjectAndPartnersDescription />} />
          <Route path="/the-project/project-history" element={<ProjectHistory />} />
          <Route path="/the-project/components" element={<ProjectComponents />} />
          <Route path="/the-project/team-members/roma-tre-team-members" element={<RomaTreTeamMembers />} />
          <Route path="/the-project/team-members/training-activity-participants" element={<TrainingActivityParticipants />} />
          <Route path="/the-project/aics" element={<AICS />} />
          <Route path="/the-project/roma-tre-university" element={<RomaTreUniversity />} />
          <Route path="/the-project/department-of-antiquities-of-jordan" element={<DepartmentOfAntiquitiesOfJordan />} />
          <Route path="/the-project/methodology/training-of-trainers" element={<TrainingOfTrainers />} />
          <Route path="/the-project/methodology/teaching-modules" element={<TeachingModules />} />
          <Route path="/the-project/methodology/educational-worksites" element={<EducationalWorksites />} />
          <Route path="/the-project/methodology/training-in-applied-conservation-sciences" element={<TrainingInAppliedConservationSciences />} />
          <Route path="/the-center/objectives" element={<Objectives />} />
          <Route path="/the-center/activities" element={<Activities />} />
          <Route path="/the-center/courses" element={<Courses />} />
          <Route path="/the-center/the-team" element={<TheTeam />} />
          <Route path="/the-center/partners" element={<Partners />} />
          <Route path="/the-center/become-a-partner" element={<BecomeAPartner />} />
          <Route path="/the-center/services" element={<Services />} />
          <Route path="/the-center/request-a-service" element={<RequestAService />} />
          <Route path="/the-center/projects" element={<Projects />} />
          <Route path="/archive" element={<ProjectsArchive />} />
          <Route path="/the-center/projects/:id" element={<ProjectDetail />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/:id" element={<NewsArticle />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/private-area" element={<PrivateArea />} />
          <Route path="/search" element={<Search />} />
        </Route>
      </Routes>
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
