import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import AOS from 'aos';


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
