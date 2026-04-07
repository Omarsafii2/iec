import { InnerPageHero } from '../../../../components/common/InnerPageHero.jsx';
import { ObjectivesSection } from '../../components/objectives/ObjectivesSection.jsx';

/** أهداف النادي */
export default function ClubObjectivesPage() {
  return (
    <main className="min-h-screen bg-gray-50 pt-[140px]">
      <InnerPageHero
        title="أهداف النادي"
        breadcrumbs={[
          { label: 'من نحن', href: '/#about' },
          { label: 'أهداف النادي' },
        ]}
      />
      <ObjectivesSection />
    </main>
  );
}
