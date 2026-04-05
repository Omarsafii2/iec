import { useState, useRef, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import './Search.css';

const sitePages = [
  { title: 'Project and Partners Description', path: '/the-project/project-and-partners-description', section: 'The Project', description: 'Overview of the RCCR project and its partner institutions working together on conservation and restoration.' },
  { title: 'Project History', path: '/the-project/project-history', section: 'The Project', description: 'The history and evolution of the Regional Center for Conservation and Restoration project.' },
  { title: 'Components', path: '/the-project/components', section: 'The Project', description: 'Key components and structural elements of the RCCR project framework.' },
  { title: 'Roma Tre Team Members', path: '/the-project/team-members/roma-tre-team-members', section: 'The Project', description: 'Academic and research team members from Roma Tre University contributing to the project.' },
  { title: 'Training Activity Participants', path: '/the-project/team-members/training-activity-participants', section: 'The Project', description: 'Participants involved in training activities and capacity-building programs.' },
  { title: 'AICS', path: '/the-project/aics', section: 'The Project', description: 'Italian Agency for Development Cooperation — supporting partner of the RCCR initiative.' },
  { title: 'Roma Tre University', path: '/the-project/roma-tre-university', section: 'The Project', description: 'Roma Tre University\'s role and contributions in conservation research and education.' },
  { title: 'Department of Antiquities of Jordan', path: '/the-project/department-of-antiquities-of-jordan', section: 'The Project', description: 'Jordan\'s Department of Antiquities and its partnership in heritage conservation.' },
  { title: 'Training of Trainers', path: '/the-project/methodology/training-of-trainers', section: 'The Project', description: 'Methodology for training conservation professionals who will train others.' },
  { title: 'Teaching Modules', path: '/the-project/methodology/teaching-modules', section: 'The Project', description: 'Structured educational modules for conservation and restoration studies.' },
  { title: 'Educational Worksites', path: '/the-project/methodology/educational-worksites', section: 'The Project', description: 'Hands-on educational worksites for practical conservation training.' },
  { title: 'Training in Applied Conservation Sciences', path: '/the-project/methodology/training-in-applied-conservation-sciences', section: 'The Project', description: 'Applied science training programs for conservation professionals.' },
  { title: 'Objectives', path: '/the-center/objectives', section: 'The Center', description: 'Goals and objectives of the Regional Center for Conservation and Restoration.' },
  { title: 'Activities', path: '/the-center/activities', section: 'The Center', description: 'Ongoing and past activities organized by the center.' },
  { title: 'Courses', path: '/the-center/courses', section: 'The Center', description: 'Educational courses offered by the center in conservation and restoration.' },
  { title: 'The Team', path: '/the-center/the-team', section: 'The Center', description: 'Meet the team behind the Regional Center for Conservation and Restoration.' },
  { title: 'Partners', path: '/the-center/partners', section: 'The Center', description: 'Organizations and institutions partnering with the center.' },
  { title: 'Services', path: '/the-center/services', section: 'The Center', description: 'Professional conservation and restoration services offered by the center.' },
  { title: 'Projects', path: '/the-center/projects', section: 'The Center', description: 'Current and completed conservation and restoration projects.' },
  { title: 'News', path: '/news', section: 'News', description: 'Latest news, updates, and announcements from the RCCR.' },
  { title: 'Gallery', path: '/gallery', section: 'Gallery', description: 'Photo gallery showcasing conservation work, events, and heritage sites.' },
  { title: 'Contact Us', path: '/contact-us', section: 'Contact', description: 'Get in touch with the Regional Center for Conservation and Restoration.' },
];

const quickLinks = [
  { title: 'The Project', path: '/the-project/project-and-partners-description', description: 'Learn about the RCCR initiative', icon: 'project' },
  { title: 'The Center', path: '/the-center/objectives', description: 'Explore the center\'s mission', icon: 'center' },
  { title: 'News & Updates', path: '/news', description: 'Latest announcements', icon: 'news' },
  { title: 'Gallery', path: '/gallery', description: 'Browse photos and media', icon: 'gallery' },
  { title: 'Courses', path: '/the-center/courses', description: 'Available training programs', icon: 'courses' },
  { title: 'Contact Us', path: '/contact-us', description: 'Reach out to the team', icon: 'contact' },
];

const QuickIcon = ({ type }) => {
  const icons = {
    project: <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />,
    center: <><path d="M3 21h18" /><path d="M5 21V7l8-4v18" /><path d="M19 21V11l-6-4" /><path d="M9 9v.01" /><path d="M9 12v.01" /><path d="M9 15v.01" /><path d="M9 18v.01" /></>,
    news: <><path d="M4 22h16a2 2 0 002-2V4a2 2 0 00-2-2H8a2 2 0 00-2 2v16a2 2 0 01-2 2zm0 0a2 2 0 01-2-2v-9c0-1.1.9-2 2-2h2" /><path d="M18 14h-8" /><path d="M15 18h-5" /><path d="M10 6h8v4h-8V6z" /></>,
    gallery: <><rect width="18" height="18" x="3" y="3" rx="2" ry="2" /><circle cx="9" cy="9" r="2" /><path d="m21 15-3.086-3.086a2 2 0 00-2.828 0L6 21" /></>,
    courses: <><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c0 1.66 2.69 3 6 3s6-1.34 6-3v-5" /></>,
    contact: <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></>,
  };
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {icons[type]}
    </svg>
  );
};

function highlightMatch(text, query) {
  if (!query.trim()) return text;
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escaped})`, 'gi');
  const parts = text.split(regex);
  return parts.map((part, i) =>
    regex.test(part) ? <mark key={i}>{part}</mark> : part
  );
}

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const [submitted, setSubmitted] = useState(!!initialQuery);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const results = submitted && query.trim()
    ? sitePages.filter((page) => {
        const q = query.toLowerCase();
        return (
          page.title.toLowerCase().includes(q) ||
          page.description.toLowerCase().includes(q) ||
          page.section.toLowerCase().includes(q)
        );
      })
    : [];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      setSubmitted(true);
      setSearchParams({ q: query.trim() });
    }
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
    if (!e.target.value.trim()) {
      setSubmitted(false);
      setSearchParams({});
    }
  };

  return (
    <main className="search-page">
      <section className="search-hero">
        <div className="search-hero__inner">
          <h1 className="search-hero__title">Search</h1>
          <p className="search-hero__subtitle">
            Find information across the RCCR website — projects, news, courses, and more.
          </p>
          <form className="search-hero__form" onSubmit={handleSubmit}>
            <div className="search-hero__input-wrap">
              <svg className="search-hero__input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <input
                ref={inputRef}
                type="text"
                className="search-hero__input"
                placeholder="Search for pages, topics, or keywords..."
                value={query}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="search-hero__btn">
              Search
            </button>
          </form>
        </div>
      </section>

      {submitted && query.trim() ? (
        <section className="search-results">
          <div className="search-results__inner">
            <p className="search-results__status">
              {results.length > 0
                ? <>Found <strong>{results.length}</strong> result{results.length !== 1 && 's'} for "<strong>{query}</strong>"</>
                : <>No results found for "<strong>{query}</strong>"</>
              }
            </p>

            {results.length > 0 ? (
              <div className="search-results__list">
                {results.map((page) => (
                  <Link key={page.path} to={page.path} className="search-result" data-aos="fade-up">
                    <span className="search-result__breadcrumb">
                      {page.section}
                    </span>
                    <h3 className="search-result__title">
                      {highlightMatch(page.title, query)}
                    </h3>
                    <p className="search-result__excerpt">
                      {highlightMatch(page.description, query)}
                    </p>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="search-empty">
                <svg className="search-empty__icon" width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                  <path d="M8 11h6" />
                </svg>
                <h2 className="search-empty__title">No results found</h2>
                <p className="search-empty__text">
                  Try different keywords or browse the quick links below to explore the website.
                </p>
              </div>
            )}
          </div>
        </section>
      ) : (
        <section className="search-quick">
          <div className="search-quick__inner">
            <h2 className="search-quick__heading">Quick Links</h2>
            <div className="search-quick__grid">
              {quickLinks.map((link) => (
                <Link key={link.path} to={link.path} className="search-quick__card" data-aos="fade-up">
                  <div className="search-quick__card-icon">
                    <QuickIcon type={link.icon} />
                  </div>
                  <div>
                    <div className="search-quick__card-title">{link.title}</div>
                    <div className="search-quick__card-desc">{link.description}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
};

export default Search;
