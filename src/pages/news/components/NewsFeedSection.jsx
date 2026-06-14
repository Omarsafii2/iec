import { useEffect, useState } from 'react';
import Card from '../../../components/ui/Card.jsx';
import { getNodes } from '../../../services/api/drupalApi.js';
import { NewsFeedGridSkeleton } from './NewsArticleCardSkeleton.jsx';
import {
  NEWS_IMAGE_FIELDS,
  filterNewsByFeed,
  getNewsDetailPath,
  getNewsFeedConfig,
  transformNewsListItem,
} from '../lib/newsFeedConfig.js';

function NewsFeedEmpty({ title }) {
  return (
    <div className="iec-news-list container mx-auto px-4 py-20">
      <p className="text-center text-lg text-gray-500" data-aos="fade-up">
        لا توجد {title} منشورة حالياً.
      </p>
    </div>
  );
}

export function NewsFeedSection({ feedKey }) {
  const config = getNewsFeedConfig(feedKey);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!config) return undefined;
    let cancelled = false;

    setLoading(true);
    setError(null);
    setArticles([]);

    const load = async () => {
      try {
        const nodes = await getNodes('news', NEWS_IMAGE_FIELDS);
        if (cancelled) return;

        const transformed = filterNewsByFeed(nodes, feedKey).map(transformNewsListItem);
        setArticles(transformed);
      } catch (err) {
        if (!cancelled) {
          console.error(`NewsFeedSection(${feedKey}): failed to load`, err);
          setError(err);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => { cancelled = true; };
  }, [feedKey, config]);

  if (!config) return null;
  if (loading) return <NewsFeedGridSkeleton count={4} />;
  if (error) {
    return (
      <div className="iec-news-list container mx-auto px-4 py-20">
        <p className="text-center text-lg text-red-600">تعذر تحميل المحتوى. يرجى المحاولة لاحقاً.</p>
      </div>
    );
  }
  if (!articles.length) return <NewsFeedEmpty title={config.title} />;

  return (
    <div className="iec-news-list container mx-auto px-4 py-20">
      <div className="iec-news-list__grid grid gap-8 md:grid-cols-2" data-aos="fade-up">
        {articles.map((article) => (
          <Card
            key={article.id}
            variant="newsArticle"
            to={getNewsDetailPath(feedKey, article.id)}
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

export default NewsFeedSection;
