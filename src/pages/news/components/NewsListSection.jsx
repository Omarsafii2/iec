import { useEffect, useState } from 'react';
import Card from '../../../components/ui/Card.jsx';
import { getNodes } from '../../../services/api/drupalApi.js';
import { DRUPAL_BASE_URL } from '../../../services/api/axios.config.js';

// ─── 1. Field config ──────────────────────────────────────────────────────────

const NEWS_IMAGE_FIELDS = [
  {
    fieldName:        'field_media_image',
    mode:             'media',
    mediaSourceField: 'field_media_image',
  },
];

// ─── 2. Transform ─────────────────────────────────────────────────────────────

const transformArticle = (node) => {
  const attr = node.attributes;

  const media    = node.field_media_image_resolved;
  const fileUri  = media?.file?.attributes?.uri?.url ?? null;
  const image    = fileUri ? `${DRUPAL_BASE_URL}${fileUri}` : null;

  const rawDate = attr.created ?? null;
  const date    = rawDate
    ? new Date(rawDate).toLocaleDateString('ar-JO', {
        year: 'numeric', month: 'long', day: 'numeric',
      })
    : '';

  // excerpt: prefer summary, fall back to stripping body HTML
  const excerpt = attr.body?.summary
    || (attr.body?.processed ?? attr.body?.value ?? '')
        .replace(/<[^>]*>/g, '')
        .trim()
        .slice(0, 180) + '...'
    || '';

  return {
    id:       node.id,
    title:    attr.title  ?? '',
    date,
    excerpt,
    image,
    imageAlt: attr.title  ?? '',
    category: attr.field_tag ?? '',
  };
};

// ─── 3. Skeleton ──────────────────────────────────────────────────────────────

function NewsSkeleton() {
  return (
    <div className="iec-news-list container mx-auto px-4 py-20">
      <div className="grid gap-8 md:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="animate-pulse overflow-hidden rounded-3xl bg-white shadow-sm">
            <div className="h-64 w-full bg-gray-200" />
            <div className="space-y-3 p-8">
              <div className="h-4 w-1/4 rounded bg-gray-200" />
              <div className="h-6 w-3/4 rounded bg-gray-200" />
              <div className="h-4 w-full rounded bg-gray-100" />
              <div className="h-4 w-4/5 rounded bg-gray-100" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── 4. Component ─────────────────────────────────────────────────────────────

export function NewsListSection() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const nodes = await getNodes('news', NEWS_IMAGE_FIELDS);
        if (cancelled) return;

        const transformed = nodes
          .filter((n) => n.attributes.status)
          // Only general news — no academy/content relationship
          .filter((n) => n.relationships?.field_networking_and_academic?.data === null)
          .map(transformArticle);

        setArticles(transformed);
      } catch (err) {
        if (!cancelled) {
          console.error('NewsListSection: failed to load', err);
          setError(err);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => { cancelled = true; };
  }, []);

  if (loading) return <NewsSkeleton />;
  if (error || !articles.length) return null;

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

export default NewsListSection;