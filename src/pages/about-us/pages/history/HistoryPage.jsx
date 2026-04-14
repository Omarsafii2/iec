import { InnerPageHero } from '../../../../components/common/InnerPageHero.jsx';
import { HistorySection } from '../../components/history/HistorySection.jsx';

export default function HistoryPage() {
  return (
    <main className="min-h-screen bg-gray-50 pt-[140px]">
      <InnerPageHero
        title="تاريخ التأسيس"
        breadcrumbs={[
          { label: 'من نحن', href: '/#about' },
          { label: 'تاريخ التأسيس' },
        ]}
      />
      <HistorySection />
    </main>
  );
}
