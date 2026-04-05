import { useLocation, Outlet } from 'react-router-dom';
import './PageTransition.css';

const PageTransition = () => {
  const location = useLocation();

  return (
    <div key={location.key} className="page-transition">
      <Outlet />
    </div>
  );
};

export default PageTransition;
