import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { InnerPageHero } from '../../../components/common/InnerPageHero.jsx';
import { NewsDetailContent } from '../components/NewsDetailContent.jsx';
import { getNode } from '../../../services/api/drupalApi.js';
import {
  NEWS_CLASSIFICATION_FIELD,
  NEWS_IMAGE_FIELDS,
  getNewsFeedConfig,
  isClubNewsNode,
  matchesNewsClassification,
  transformNewsDetailItem,
} from '../lib/newsFeedConfig.js';

function ArticleSkeleton(props) {
  return (
    <div
      className="container mx-auto animate-pulse px-4 py-20"
      role="status"
      aria-live="polite"
      {...props}
    >
      <span className="sr-only">جاري تحميل المقال...</span>
      <div className="mx-auto max-w-4xl overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
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

export default function NewsFeedDetailPage({ feedKey }) {
  const { articleId } = useParams();
  const config = getNewsFeedConfig(feedKey);
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!articleId || !config) return undefined;
    let cancelled = false;

    setLoading(true);
    setError(null);
    setArticle(null);

    const load = async () => {
      try {
        const node = await getNode('news', articleId, NEWS_IMAGE_FIELDS);
        if (cancelled) return;

        if (
          !node
          || !isClubNewsNode(node)
          || !matchesNewsClassification(node.attributes?.[NEWS_CLASSIFICATION_FIELD], feedKey)
        ) {
          setError(new Error('not_found'));
          return;
        }

        setArticle(transformNewsDetailItem(node));
      } catch (err) {
        if (!cancelled) {
          console.error(`NewsFeedDetailPage(${feedKey}): failed to load`, err);
          setError(err);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => { cancelled = true; };
  }, [articleId, feedKey, config]);

  if (!config) return <Navigate to="/" replace />;

  if (loading) {
    return (
      <main className={`iec-page iec-page--news-${feedKey}-detail min-h-screen bg-gray-50 pt-[140px]`}>
        <InnerPageHero
          title={config.title}
          breadcrumbs={[
            { label: 'النشرة الإخبارية', href: '/#news' },
            { label: config.title, href: config.listPath },
          ]}
        />
        <ArticleSkeleton aria-busy="true" />
      </main>
    );
  }

  if (error || !article) return <Navigate to={config.listPath} replace />;

  return (
    <main className={`iec-page iec-page--news-${feedKey}-detail min-h-screen bg-gray-50 pt-[140px]`}>
      <InnerPageHero
        title={config.title}
        breadcrumbs={[
          { label: 'النشرة الإخبارية', href: '/#news' },
          { label: config.title, href: config.listPath },
          { label: article.title },
        ]}
      />
      <NewsDetailContent
        article={article}
        backTo={config.listPath}
        backLabel={config.backLabel}
      />
    </main>
  );
}
