import { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { InnerPageHero } from '../../../components/common/InnerPageHero.jsx';
import { NewsDetailContent } from '../components/NewsDetailContent.jsx';
import { getNode } from '../../../services/api/drupalApi.js';
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

const transformArticleDetail = (node) => {
  const attr = node.attributes;

  const media   = node.field_media_image_resolved;
  const fileUri = media?.file?.attributes?.uri?.url ?? null;
  const image   = fileUri ? `${DRUPAL_BASE_URL}${fileUri}` : null;

  const rawDate = attr.created ?? null;
  const date    = rawDate
    ? new Date(rawDate).toLocaleDateString('ar-JO', {
        year: 'numeric', month: 'long', day: 'numeric',
      })
    : '';

  return {
    id:       node.id,
    title:    attr.title ?? '',
    date,
    image,
    imageAlt: attr.title ?? '',
    category: attr.field_tag ?? '',
    bodyHtml: attr.body?.processed ?? attr.body?.value ?? '',
  };
};

// ─── 3. Skeleton ──────────────────────────────────────────────────────────────

function ArticleSkeleton() {
  return (
    <div className="container mx-auto px-4 py-20 animate-pulse">
      <div className="mx-auto max-w-4xl overflow-hidden rounded-3xl bg-white shadow-sm">
        <div className="h-64 w-full bg-gray-200 md:h-96" />
        <div className="space-y-4 p-8 md:p-12">
          <div className="h-4 w-1/4 rounded bg-gray-200" />
          <div className="h-6 w-3/4 rounded bg-gray-200" />
          <div className="h-4 w-full rounded bg-gray-100" />
          <div className="h-4 w-5/6 rounded bg-gray-100" />
          <div className="h-4 w-4/5 rounded bg-gray-100" />
        </div>
      </div>
    </div>
  );
}

// ─── 4. Page ──────────────────────────────────────────────────────────────────

export default function NewsDetailPage() {
  const { articleId } = useParams();

  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    if (!articleId) return;
    let cancelled = false;

    const load = async () => {
      try {
        const node = await getNode('news', articleId, NEWS_IMAGE_FIELDS);
        if (cancelled) return;
        if (node) setArticle(transformArticleDetail(node));
      } catch (err) {
        if (!cancelled) {
          console.error('NewsDetailPage: failed to load', err);
          setError(err);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => { cancelled = true; };
  }, [articleId]);

  if (loading) {
    return (
      <main className="iec-page iec-page--news-detail min-h-screen bg-gray-50 pt-[140px]">
        <InnerPageHero
          title="تفاصيل الخبر"
          breadcrumbs={[
            { label: 'النشرة الإخبارية', href: '/#news' },
            { label: 'الأخبار', href: '/news/news' },
          ]}
        />
        <ArticleSkeleton />
      </main>
    );
  }

  if (error || !article) return <Navigate to="/news/news" replace />;

  return (
    <main className="iec-page iec-page--news-detail min-h-screen bg-gray-50 pt-[140px]">
      <InnerPageHero
        title="تفاصيل الخبر"
        breadcrumbs={[
          { label: 'النشرة الإخبارية', href: '/#news' },
          { label: 'الأخبار', href: '/news/news' },
          { label: article.title },
        ]}
      />
      <NewsDetailContent article={article} />
    </main>
  );
} 