import { InnerPageHero } from '../../../../components/common/InnerPageHero.jsx';
import { AchievementsSection } from '../../components/achievements/AchievementsSection.jsx';

/** إنجازات النادي */
export default function AchievementsPage() {
  return (
    <main className="min-h-screen bg-gray-50 pt-[140px]">
      <InnerPageHero
        title="إنجازات النادي"
        breadcrumbs={[
          { label: 'من نحن', href: '/#about' },
          { label: 'إنجازات النادي' },
        ]}
      />
      <AchievementsSection />
    </main>
  );
}
