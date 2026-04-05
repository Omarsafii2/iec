import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageHero from '../../components/layout/PageHero';
import Loader from '../../components/Loader';
import { fetchNews, fetchNewsCategories } from '../../services/api/newsApi';
import { createSlug } from '../../utils/slug';
import './News.css';

const CalendarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M8 2v4" />
    <path d="M16 2v4" />
    <rect width="18" height="18" x="3" y="4" rx="2" />
    <path d="M3 10h18" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

const News = () => {
  const [newsItems, setNewsItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [newsData, catData] = await Promise.all([
          fetchNews(),
          fetchNewsCategories(),
        ]);
        setNewsItems(newsData);
        setCategories(catData);
      } catch (err) {
        console.error('Failed to load news:', err);
        setError('Failed to load news. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const filteredItems = activeCategory
    ? newsItems.filter((item) => item.category?.id === activeCategory)
    : newsItems;

  return (
    <main className="news-page">
      <PageHero
        title="NEWS"
        subtitle="Stay updated with the latest discoveries, restoration projects, and events from the Regional Center."
      />

      <section className="news-content">
        <div className="news-container">
          {/* Category filter */}
          {categories.length > 0 && (
            <div className="news-categories">
              <button
                className={`news-categories__btn${activeCategory === null ? ' news-categories__btn--active' : ''}`}
                onClick={() => setActiveCategory(null)}
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  className={`news-categories__btn${activeCategory === cat.id ? ' news-categories__btn--active' : ''}`}
                  onClick={() => setActiveCategory(cat.id)}
                >
                  {cat.iconUrl && (
                    <img
                      src={cat.iconUrl}
                      alt=""
                      aria-hidden
                      className="news-categories__icon"
                      width={14}
                      height={14}
                    />
                  )}
                  {cat.name}
                </button>
              ))}
            </div>
          )}

          {loading && (
            <div className="news-loading">
              <Loader />
            </div>
          )}

          {error && !loading && (
            <div className="news-error">
              <p>{error}</p>
            </div>
          )}

          {!loading && !error && filteredItems.length === 0 && (
            <div className="news-empty">
              <p>No news articles found.</p>
            </div>
          )}

          {!loading && !error && filteredItems.length > 0 && (
            <div className="news-grid">
              {filteredItems.map((item) => {
                const slug = createSlug(item.title) || item.id;
                return (
                  <Link key={item.id} to={`/news/${slug}`} className="news-card" data-aos="fade-up">
                    <div className="news-card__image-wrap">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.title}
                          className="news-card__image"
                          onError={(e) => {
                            e.target.src = 'https://placehold.co/600x400/9E4B3C/ffffff?text=No+Image';
                          }}
                        />
                      ) : (
                        <div className="news-card__image-placeholder" />
                      )}
                      {item.category && (
                        <span className="news-card__badge">{item.category.name}</span>
                      )}
                    </div>
                    <div className="news-card__body">
                      <div className="news-card__date">
                        <CalendarIcon />
                        <span>{formatDate(item.date)}</span>
                      </div>
                      <h3 className="news-card__title">{item.title}</h3>
                      <p className="news-card__excerpt">{item.excerpt}</p>
                      <span className="news-card__link">
                        Read more
                        <ArrowRightIcon />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default News;
