import Card from '../../../components/ui/Card.jsx';
import { PHOTO_ALBUMS } from './photoAlbumsData.js';

/** شبكة ألبومات أرشيف الصور */
export function PhotoArchiveSection({ albums = PHOTO_ALBUMS }) {
  return (
    <div className="iec-photo-archive container mx-auto px-4 py-20">
      <div
        className="iec-photo-archive__grid grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
        data-aos="fade-up"
      >
        {albums.map((album) => (
          <Card
            key={album.id}
            variant="gallery"
            to={`/news/photos/${album.id}`}
            coverImage={album.coverImage}
            title={album.title}
            date={album.date}
            photoCount={album.photoCount}
            imageAlt={album.title}
          />
        ))}
      </div>
    </div>
  );
}
