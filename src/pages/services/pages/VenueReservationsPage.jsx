import { InnerPageHero } from '../../../components/common/InnerPageHero.jsx';
import { VenueReservationsSection } from '../component/VenueReservationsSection.jsx';

/** حجوزات الملاعب والقاعات */
export default function VenueReservationsPage() {
  return (
    <main className="min-h-screen bg-gray-50 pt-[140px]">
      <InnerPageHero
        title="حجوزات الملاعب والقاعات"
        breadcrumbs={[
          { label: 'خدمات النادي', href: '/#services' },
          { label: 'الحجوزات' },
        ]}
      />
      <VenueReservationsSection />
    </main>
  );
}
