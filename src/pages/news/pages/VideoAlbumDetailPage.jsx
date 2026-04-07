import { Navigate, useParams } from 'react-router-dom';
import { InnerPageHero } from '../../../components/common/InnerPageHero.jsx';
import { getVideoAlbumById } from '../components/videoAlbumsData.js';
import { VideoAlbumDetailContent } from '../components/VideoAlbumDetailContent.jsx';

/** تفاصيل مجموعة فيديو */
export default function VideoAlbumDetailPage() {
  const { albumId } = useParams();
  const album = albumId ? getVideoAlbumById(albumId) : undefined;

  if (!album) {
    return <Navigate to="/news/videos" replace />;
  }

  return (
    <main className="iec-page iec-page--video-album min-h-screen bg-gray-50 pt-[140px]">
      <InnerPageHero
        title="مكتبة الفيديو"
        breadcrumbs={[
          { label: 'النشرة الإخبارية', href: '/#news' },
          { label: 'الفيديوهات', href: '/news/videos' },
          { label: album.title },
        ]}
      />
      <VideoAlbumDetailContent album={album} />
    </main>
  );
}
