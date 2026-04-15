import { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { InnerPageHero } from '../../../components/common/InnerPageHero.jsx';
import { VideoAlbumDetailContent } from '../components/VideoAlbumDetailContent.jsx';
import { getNode } from '../../../services/api/drupalApi.js';
import { DRUPAL_BASE_URL } from '../../../services/api/axios.config.js';

// ─── 1. Field config ──────────────────────────────────────────────────────────
// For videos we need:
// field_media_videos → media--video → field_media_video_file (the mp4)
// field_media_videos → media--video → thumbnail (poster image)
// drupalApi's getNode with imageFields handles media resolution via mode:'media'
// We use TWO entries — one for the file, one for the thumbnail

const VIDEO_FIELDS = [
  {
    fieldName:        'field_media_videos',
    mode:             'media',
    mediaSourceField: 'field_media_video_file',  // gets the mp4 file entity
  },
];

// ─── 2. Transform ─────────────────────────────────────────────────────────────

const transformVideoDetail = (node) => {
  const attr = node.attributes;

  const mediaList    = node.field_media_videos_resolved;
  const resolvedList = Array.isArray(mediaList) ? mediaList : mediaList ? [mediaList] : [];

  const videos = resolvedList
    .map((media, i) => {
      if (!media) return null;

      // mp4 file URL
      const fileUri = media?.file?.attributes?.uri?.url ?? null;
      const src     = fileUri ? `${DRUPAL_BASE_URL}${fileUri}` : null;
      if (!src) return null;

      // Thumbnail — Drupal auto-generates one, stored in media.relationships.thumbnail
      // It's included in the included array as a file--file entity
      // drupalApi puts it in media.relationships.thumbnail.data but doesn't resolve it
      // We use the media name as title fallback
      const thumbnailRef = media?.relationships?.thumbnail?.data;
      // thumbnail file won't be in pool unless we include it — use null for now
      // the <video> tag will show controls even without a poster

      return {
        id:        media.id || `video-${i}`,
        src,
        thumbnail: null,   // see note below
        title:     media?.attributes?.name ?? `فيديو ${i + 1}`,
        date:      '',
      };
    })
    .filter(Boolean);

  const rawDate = attr.field_date ?? attr.created ?? null;
  const date    = rawDate
    ? new Date(rawDate).toLocaleDateString('ar-JO', { year: 'numeric', month: 'long', day: 'numeric' })
    : '';

  return {
    id:         node.id,
    title:      attr.title ?? '',
    date,
    videoCount: videos.length,
    videos,
  };
};

// ─── 3. Skeleton ──────────────────────────────────────────────────────────────

function AlbumDetailSkeleton() {
  return (
    <div className="container mx-auto px-4 py-20 animate-pulse">
      <div className="mb-8 flex items-center gap-4">
        <div className="h-10 w-10 rounded-full bg-gray-200" />
        <div className="space-y-2">
          <div className="h-6 w-48 rounded bg-gray-200" />
          <div className="h-4 w-32 rounded bg-gray-100" />
        </div>
      </div>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="animate-pulse space-y-3">
            <div className="h-56 w-full rounded-2xl bg-gray-200" />
            <div className="h-5 w-3/4 rounded bg-gray-200" />
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── 4. Page ──────────────────────────────────────────────────────────────────

export default function VideoAlbumDetailPage() {
  const { albumId } = useParams();

  const [album, setAlbum]     = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    if (!albumId) return;
    let cancelled = false;

    const load = async () => {
      try {
        const node = await getNode('video_gallery', albumId, VIDEO_FIELDS);
        if (cancelled) return;
        if (node) setAlbum(transformVideoDetail(node));
      } catch (err) {
        if (!cancelled) {
          console.error('VideoAlbumDetailPage: failed to load', err);
          setError(err);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => { cancelled = true; };
  }, [albumId]);

  if (loading) {
    return (
      <main className="iec-page iec-page--video-album min-h-screen bg-gray-50 pt-[140px]">
        <InnerPageHero
          title="مكتبة الفيديو"
          breadcrumbs={[
            { label: 'النشرة الإخبارية', href: '/#news' },
            { label: 'الفيديوهات', href: '/news/videos' },
          ]}
        />
        <AlbumDetailSkeleton />
      </main>
    );
  }

  if (error || !album) return <Navigate to="/news/videos" replace />;

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