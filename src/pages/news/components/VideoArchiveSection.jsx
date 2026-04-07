import Card from '../../../components/ui/Card.jsx';
import { VIDEO_ALBUMS } from './videoAlbumsData.js';

/** شبكة ألبومات مكتبة الفيديو */
export function VideoArchiveSection({ albums = VIDEO_ALBUMS }) {
  return (
    <div className="iec-video-archive container mx-auto px-4 py-20">
      <div
        className="iec-video-archive__grid grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
        data-aos="fade-up"
      >
        {albums.map((album) => (
          <Card
            key={album.id}
            variant="videoGallery"
            to={`/news/videos/${album.id}`}
            coverImage={album.coverImage}
            title={album.title}
            date={album.date}
            videoCount={album.videoCount}
            imageAlt={album.title}
          />
        ))}
      </div>
    </div>
  );
}
