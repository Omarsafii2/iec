import { useEffect, useState } from 'react';
import Card from '../../../components/ui/Card.jsx';
import { getNodes } from '../../../services/api/drupalApi.js';
import { DRUPAL_BASE_URL } from '../../../services/api/axios.config.js';

// ─── 1. Field config ──────────────────────────────────────────────────────────

const VIDEO_IMAGE_FIELDS = [
  {
    fieldName:        'field_media_image',   // cover image for the card
    mode:             'media',
    mediaSourceField: 'field_media_image',
  },
];

// ─── 2. Transform ─────────────────────────────────────────────────────────────

const transformAlbum = (node) => {
  const attr = node.attributes;

  const coverMedia = node.field_media_image_resolved;
  const coverUri   = coverMedia?.file?.attributes?.uri?.url ?? null;
  const coverImage = coverUri ? `${DRUPAL_BASE_URL}${coverUri}` : null;

  const videoList  = node.relationships?.field_media_videos?.data;
  const videoCount = Array.isArray(videoList) ? videoList.length : videoList ? 1 : 0;

  const rawDate = attr.field_date ?? attr.created ?? null;
  const date    = rawDate
    ? new Date(rawDate).toLocaleDateString('ar-JO', { year: 'numeric', month: 'long', day: 'numeric' })
    : '';

  return {
    id: node.id,
    title: attr.title ?? '',
    coverImage,
    date,
    videoCount,
  };
};

// ─── 3. Skeleton ──────────────────────────────────────────────────────────────

function VideoSkeleton() {
  return (
    <div className="iec-video-archive container mx-auto px-4 py-20">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="animate-pulse space-y-3">
            <div className="h-56 w-full rounded-2xl bg-gray-200" />
            <div className="h-5 w-3/4 rounded bg-gray-200" />
            <div className="h-4 w-1/3 rounded bg-gray-100" />
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── 4. Component ─────────────────────────────────────────────────────────────

export function VideoArchiveSection() {
  const [albums, setAlbums]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const nodes = await getNodes('video_gallery', VIDEO_IMAGE_FIELDS);
        if (cancelled) return;

        const transformed = nodes
          .filter((n) => n.attributes.status)
          .map(transformAlbum)
          .filter((a) => a.coverImage);

        setAlbums(transformed);
      } catch (err) {
        if (!cancelled) {
          console.error('VideoArchiveSection: failed to load', err);
          setError(err);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => { cancelled = true; };
  }, []);

  if (loading) return <VideoSkeleton />;
  if (error || !albums.length) return null;

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

export default VideoArchiveSection;