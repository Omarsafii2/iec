import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import AOS from 'aos';
import PageTransition from './components/layout/PageTransition';
import Home from './pages/home/Home';


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
