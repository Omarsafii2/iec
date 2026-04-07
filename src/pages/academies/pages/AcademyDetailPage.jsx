import { Navigate, useParams } from 'react-router-dom';
import { InnerPageHero } from '../../../components/common/InnerPageHero.jsx';
import { getAcademyById } from '../components/academiesData.js';
import { AcademyDetailContent } from '../components/AcademyDetailContent.jsx';

/** تفاصيل أكاديمية أو شبكة من الأكاديميات */
export default function AcademyDetailPage() {
  const { academyId } = useParams();
  const academy = academyId ? getAcademyById(academyId) : undefined;

  if (!academy) {
    return <Navigate to="/" replace />;
  }

  return (
    <main className="iec-page iec-page--academy-detail min-h-screen bg-gray-50 pt-[140px]">
      <InnerPageHero
        title={academy.title}
        breadcrumbs={[
          { label: 'الأكاديميات والشبكات', href: '/#academies' },
          { label: academy.title },
        ]}
      />
      <AcademyDetailContent academy={academy} />
    </main>
  );
}
