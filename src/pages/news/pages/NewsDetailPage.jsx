import { Navigate, useParams } from 'react-router-dom';
import { InnerPageHero } from '../../../components/common/InnerPageHero.jsx';
import { getNewsArticleById } from '../components/newsArticlesData.js';
import { NewsDetailContent } from '../components/NewsDetailContent.jsx';

/** تفاصيل خبر */
export default function NewsDetailPage() {
  const { articleId } = useParams();
  const article = articleId ? getNewsArticleById(articleId) : undefined;

  if (!article) {
    return <Navigate to="/news/news" replace />;
  }

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
