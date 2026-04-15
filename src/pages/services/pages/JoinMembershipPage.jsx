import { InnerPageHero } from '../../../components/common/InnerPageHero.jsx';
import { JoinMembershipSection } from '../component/JoinMembershipSection.jsx';

export default function JoinMembershipPage() {
  return (
    <main className="min-h-screen bg-gray-50 pt-[140px]">
      <InnerPageHero
        title="طلب الانتساب"
        breadcrumbs={[
          { label: 'خدمات النادي', href: '/#services' },
          { label: 'طلب الانتساب' },
        ]}
      />
      <JoinMembershipSection />
    </main>
  );
}
