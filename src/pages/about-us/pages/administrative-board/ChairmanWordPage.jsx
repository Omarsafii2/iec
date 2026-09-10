import { InnerPageHero } from '../../../../components/common/InnerPageHero.jsx';
import { ChairmanWordSection } from '../../components/administrative-board/ChairmanWordSection.jsx';

/** كلمة رئيس الهيئة الإدارية */
export default function ChairmanWordPage() {
  return (
    <main className="min-h-screen bg-gray-50 pt-24 md:pt-[140px] ">
      <InnerPageHero
        title="كلمة رئيس الهيئة الإدارية"
        breadcrumbs={[
          { label: 'من نحن', href: '/#about' },
          { label: 'الهيئة الإدارية', href: '/about/board-members' },
          { label: 'كلمة رئيس الهيئة الإدارية' },
        ]}
      />
      <ChairmanWordSection />
    </main>
  );
}
