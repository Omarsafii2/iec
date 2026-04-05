import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import facebookIcon from '../../assets/facebook.png';
import inIcon from '../../assets/in.png';
import xIcon from '../../assets/X.png';
import './Header.css';

const toSlug = (text) => text.toLowerCase().replace(/\s+/g, '-');

const navConfig = [
  {
    label: 'THE PROJECT',
    children: [
      { label: 'PROJECT AND PARTNERS DESCRIPTION' },
      { label: 'PROJECT HISTORY' },
      { label: 'COMPONENTS' },
      {
        label: 'TEAM MEMBERS',
        hasChildren: true,
        children: [
          { label: 'ROMA TRE TEAM MEMBERS' },
          { label: 'TRAINING ACTIVITY PARTICIPANTS' },
        ],
      },
      { label: 'AICS' },
      { label: 'ROMA TRE UNIVERSITY' },
      { label: 'DEPARTMENT OF ANTIQUITIES OF JORDAN' },
      {
        label: 'METHODOLOGY',
        hasChildren: true,
        children: [
          { label: 'TRAINING OF TRAINERS' },
          { label: 'TEACHING MODULES' },
          { label: 'EDUCATIONAL WORKSITES' },
          { label: 'TRAINING IN APPLIED CONSERVATION SCIENCES' },
        ],
      },
    ],
  },
  {
    label: 'THE CENTER',
    children: [
      { label: 'OBJECTIVES' },
      { label: 'ACTIVITIES' },
      { label: 'COURSES' },
      { label: 'THE TEAM' },
      { label: 'PARTNERS' },
      { label: 'SERVICES' },
      { label: 'PROJECTS' },
    ],
  },
  { label: 'NEWS' },
  { label: 'GALLERY' },
  { label: 'CONTACT US' },
];

const Header = () => {
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(null);
  const [displayContent, setDisplayContent] = useState(null);
  const [openSubSubmenu, setOpenSubSubmenu] = useState(null);

  useEffect(() => {
    if (openMenu && navConfig.find((i) => i.label === openMenu)?.children?.length) {
      setDisplayContent(openMenu);
    } else if (!openMenu) {
      const timer = setTimeout(() => setDisplayContent(null), 300);
      return () => clearTimeout(timer);
    }
  }, [openMenu]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.header__nav-area')) {
        setOpenMenu(null);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const hasAnySubmenu = navConfig.some((item) => item.children?.length > 0);
  const isSubmenuVisible = !!(openMenu && navConfig.find((i) => i.label === openMenu)?.children?.length);
  const submenuContent = displayContent
    ? navConfig.find((i) => i.label === displayContent)?.children ?? []
    : [];

  return (
    <header className="header">
      {/* Top Bar */}
      <div className="header__top-bar">
        <div className="header__top-bar-inner">
          <Link to="/private-area" className="header__private-btn">PRIVATE AREA</Link>
          <div className="header__social">
            <a href="#" className="header__social-link" aria-label="Facebook">
              <img src={facebookIcon} alt="Facebook" />
            </a>
            <a href="#" className="header__social-link" aria-label="LinkedIn">
              <img src={inIcon} alt="LinkedIn" />
            </a>
            <a href="#" className="header__social-link" aria-label="Twitter">
              <img src={xIcon} alt="X" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="header__nav-area">
        <div className="header__main">
          <div className="header__main-inner">
            <Link to="/" className="header__logo">
              <img src={logo} alt="RCCR - Regional Center for Conservation and Restoration" />
            </Link>

            <nav className="header__nav">
              {navConfig.map((item) => (
                item.children ? (
                  <div key={item.label} className="header__nav-item">
                    <button
                      type="button"
                      className={`header__nav-link header__nav-link--dropdown ${openMenu === item.label ? 'is-open' : ''}`}
                      onClick={(e) => {
                        e.preventDefault();
                        setOpenMenu(openMenu === item.label ? null : item.label);
                      }}
                    >
                      {item.label}
                      <svg
                        className="header__nav-chevron"
                        width="10"
                        height="6"
                        viewBox="0 0 10 6"
                        fill="none"
                        style={{ transform: openMenu === item.label ? 'rotate(180deg)' : 'none' }}
                      >
                        <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <Link key={item.label} to={`/${toSlug(item.label)}`} className="header__nav-link">
                    {item.label}
                  </Link>
                )
              ))}
            </nav>

            <div className="header__utils">
              <button
                className="header__util-btn header__search-btn"
                aria-label="Search"
                onClick={() => navigate('/search')}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
              </button>
              <button className="header__util-btn header__lang-btn">
                EN
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                  <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Submenu - horizontal below main nav (always in DOM for animation) */}
        {hasAnySubmenu && (
          <div
            className={`header__submenu-wrapper ${isSubmenuVisible ? 'header__submenu-wrapper--visible' : ''}`}
            onMouseLeave={() => setOpenSubSubmenu(null)}
          >
            <div className={`header__submenu ${isSubmenuVisible ? 'header__submenu--visible' : ''}`}>
              <div className="header__submenu-inner">
                {submenuContent.map((child) =>
                  child.children?.length ? (
                    <div
                      key={child.label}
                      className={`header__submenu-item-with-dropdown ${openSubSubmenu === child.label ? 'is-active' : ''}`}
                      onMouseEnter={() => setOpenSubSubmenu(child.label)}
                    >
                      <span className="header__submenu-link header__submenu-link--has-children">
                        {child.label}
                        <svg className="header__submenu-chevron" width="10" height="6" viewBox="0 0 10 6" fill="none">
                          <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </div>
                  ) : (
                    <Link
                      key={child.label}
                      to={`/${toSlug(displayContent || '')}/${toSlug(child.label)}`}
                      className="header__submenu-link"
                      onClick={() => setOpenMenu(null)}
                    >
                      {child.label}
                    </Link>
                  )
                )}
              </div>
            </div>

            {/* Sub-submenu bar (brownish-red, below submenu) */}
            {submenuContent.some((c) => c.children?.length > 0) && (
              <div
                className={`header__sub-submenu ${openSubSubmenu && submenuContent.find((c) => c.label === openSubSubmenu)?.children?.length > 0 ? 'header__sub-submenu--visible' : ''}`}
                onMouseEnter={() => openSubSubmenu && setOpenSubSubmenu(openSubSubmenu)}
              >
                <div className="header__sub-submenu-inner">
                  {openSubSubmenu && submenuContent.find((c) => c.label === openSubSubmenu)?.children?.map((grandchild) => (
                    <Link
                      key={grandchild.label}
                      to={`/${toSlug(displayContent || '')}/${toSlug(openSubSubmenu)}/${toSlug(grandchild.label)}`}
                      className="header__sub-submenu-link"
                      onClick={() => {
                        setOpenMenu(null);
                        setOpenSubSubmenu(null);
                      }}
                    >
                      {grandchild.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
