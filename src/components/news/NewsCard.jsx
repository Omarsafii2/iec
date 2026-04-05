import { Link } from 'react-router-dom';
import { createSlug } from '../../utils/slug';

const NewsCard = ({ news }) => {
  const { id, title, excerpt, image, date, category } = news;
  const href = createSlug(title) || id;

  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <article className="news-card">
      <div className="news-card-image">
        {image ? (
          <img src={image} alt={title} loading="lazy" />
        ) : (
          <div className="news-card-image-placeholder" />
        )}

        {/* Category badge — uses icon from Drupal if available */}
        {category && (
          <div className="news-card-category">
            {category.iconUrl && (
              <img
                src={category.iconUrl}
                alt=""
                aria-hidden
                className="news-card-category-icon"
                width={14}
                height={14}
              />
            )}
            <span>{category.name}</span>
          </div>
        )}
      </div>

      <div className="news-card-content">
        <div className="news-card-meta">
          <span className="news-date">{formattedDate}</span>
        </div>
        <h3 className="news-card-title">{title}</h3>
        <p className="news-card-excerpt">{excerpt}</p>
        <Link to={`/news/${href}`} className="news-card-link">
          Read More →
        </Link>
      </div>
    </article>
  );
};

export default NewsCard;