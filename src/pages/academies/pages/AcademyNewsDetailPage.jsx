import { Navigate, useParams } from 'react-router-dom';
import { InnerPageHero } from '../../../components/common/InnerPageHero.jsx';
import { getAcademyById } from '../components/academiesData.js';
import { getAcademyNewsArticle } from '../components/academyNewsArticlesData.js';
import { NewsDetailContent } from '../../news/components/NewsDetailContent.jsx';

/** تفاصيل خبر من نشرة الأكاديمية — نفس أسلوب NewsDetailContent */
export default function AcademyNewsDetailPage() {
  const { academyId, newsId } = useParams();
  const academy = academyId ? getAcademyById(academyId) : undefined;
  const article = academyId && newsId ? getAcademyNewsArticle(academyId, newsId) : null;

  if (!academy || !article) {
    return <Navigate to={academyId ? `/academies/${academyId}` : '/'} replace />;
  }

  return (
    <main className="iec-page iec-page--academy-news min-h-screen bg-gray-50 pt-[140px]">
      <InnerPageHero
        title="تفاصيل الخبر"
        breadcrumbs={[
          { label: 'الأكاديميات والشبكات', href: '/#academies' },
          { label: academy.title, href: `/academies/${academyId}` },
          { label: article.title },
        ]}
      />
      <NewsDetailContent
        article={article}
        backTo={`/academies/${academyId}`}
        backLabel="العودة للأكاديمية"
      />
    </main>
  );
}
