import { InnerPageHero } from '../../../components/common/InnerPageHero.jsx';
import { NewsListSection } from '../components/NewsListSection.jsx';

/** أخبار النادي */
export default function NewsListPage() {
  return (
    <main className="iec-page iec-page--news-list min-h-screen bg-gray-50 pt-[140px]">
      <InnerPageHero
        title="أخبار النادي"
        breadcrumbs={[
          { label: 'النشرة الإخبارية', href: '/#news' },
          { label: 'الأخبار' },
        ]}
      />
      <NewsListSection />
    </main>
  );
}
