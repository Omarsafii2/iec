import { InnerPageHero } from '../../../components/common/InnerPageHero.jsx';
import { FaqSection } from '../components/FaqSection.jsx';

export default function FaqPage() {
  return (
    <main className="min-h-screen bg-gray-50 pt-[140px]">
      <InnerPageHero
        title="الأسئلة الشائعة"
        breadcrumbs={[{ label: 'الأسئلة الشائعة' }]}
      />
      <FaqSection />
    </main>
  );
}
