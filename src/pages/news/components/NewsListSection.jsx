import Card from '../../../components/ui/Card.jsx';
import { NEWS_ARTICLES } from './newsArticlesData.js';

/** قائمة أخبار النادي */
export function NewsListSection({ articles = NEWS_ARTICLES }) {
  return (
    <div className="iec-news-list container mx-auto px-4 py-20">
      <div className="iec-news-list__grid grid gap-8 md:grid-cols-2" data-aos="fade-up">
        {articles.map((article) => (
          <Card
            key={article.id}
            variant="newsArticle"
            to={`/news/news/${article.id}`}
            image={article.image}
            imageAlt={article.imageAlt}
            title={article.title}
            date={article.date}
            excerpt={article.excerpt}
          />
        ))}
      </div>
    </div>
  );
}
