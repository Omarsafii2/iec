import { InnerPageHero } from '../../../../components/common/InnerPageHero.jsx';
import { DirectorWordSection } from '../../components/administrative-board/DirectorWordSection.jsx';

/** كلمة الأمين العام — الهيئة الإدارية */
export default function DirectorWordPage() {
  return (
    <main className="min-h-screen bg-gray-50 pt-24 md:pt-[140px] ">
      <InnerPageHero
        title="كلمة الامين العام"
        breadcrumbs={[
          { label: 'من نحن', href: '/#about' },
          { label: 'الهيئة الإدارية', href: '/about/board-members' },
          { label: 'كلمة الامين العام' },
        ]}
      />
      <DirectorWordSection />
    </main>
  );
}
