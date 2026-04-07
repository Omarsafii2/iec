import { Navigate, useParams } from 'react-router-dom';
import { InnerPageHero } from '../../../components/common/InnerPageHero.jsx';
import { getPhotoAlbumById } from '../components/photoAlbumsData.js';
import { PhotoAlbumDetailContent } from '../components/PhotoAlbumDetailContent.jsx';

/** تفاصيل ألبوم صور */
export default function PhotoAlbumDetailPage() {
  const { albumId } = useParams();
  const album = albumId ? getPhotoAlbumById(albumId) : undefined;

  if (!album) {
    return <Navigate to="/news/photos" replace />;
  }

  return (
    <main className="iec-page iec-page--photo-album min-h-screen bg-gray-50 pt-[140px]">
      <InnerPageHero
        title="أرشيف الصور"
        breadcrumbs={[
          { label: 'النشرة الإخبارية', href: '/#news' },
          { label: 'الصور', href: '/news/photos' },
          { label: album.title },
        ]}
      />
      <PhotoAlbumDetailContent album={album} />
    </main>
  );
}
