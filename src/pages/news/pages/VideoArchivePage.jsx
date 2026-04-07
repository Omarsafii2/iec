import { InnerPageHero } from '../../../components/common/InnerPageHero.jsx';
import { VideoArchiveSection } from '../components/VideoArchiveSection.jsx';

/** مكتبة الفيديو — قائمة المجموعات */
export default function VideoArchivePage() {
  return (
    <main className="iec-page iec-page--video-archive min-h-screen bg-gray-50 pt-[140px]">
      <InnerPageHero
        title="مكتبة الفيديو"
        breadcrumbs={[
          { label: 'النشرة الإخبارية', href: '/#news' },
          { label: 'الفيديوهات' },
        ]}
      />
      <VideoArchiveSection />
    </main>
  );
}
