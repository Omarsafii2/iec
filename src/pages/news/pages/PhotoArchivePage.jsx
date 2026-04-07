import { InnerPageHero } from '../../../components/common/InnerPageHero.jsx';
import { PhotoArchiveSection } from '../components/PhotoArchiveSection.jsx';

/** أرشيف الصور — قائمة الألبومات */
export default function PhotoArchivePage() {
  return (
    <main className="iec-page iec-page--photo-archive min-h-screen bg-gray-50 pt-[140px]">
      <InnerPageHero
        title="أرشيف الصور"
        breadcrumbs={[
          { label: 'النشرة الإخبارية', href: '/#news' },
          { label: 'الصور' },
        ]}
      />
      <PhotoArchiveSection />
    </main>
  );
}
