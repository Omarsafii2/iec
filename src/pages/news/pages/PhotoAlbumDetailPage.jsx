import { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { InnerPageHero } from '../../../components/common/InnerPageHero.jsx';
import { PhotoAlbumDetailContent } from '../components/PhotoAlbumDetailContent.jsx';
import { getNode } from '../../../services/api/drupalApi.js';
import { DRUPAL_BASE_URL } from '../../../services/api/axios.config.js';

// ─── 1. Field config ──────────────────────────────────────────────────────────

const ALBUM_IMAGE_FIELDS = [
  {
    fieldName:        'field_media_images',
    mode:             'media',
    mediaSourceField: 'field_media_image',
  },
];

// ─── 2. Transform ─────────────────────────────────────────────────────────────

const transformAlbumDetail = (node) => {
  const attr = node.attributes;

  const mediaList    = node.field_media_images_resolved;
  const resolvedList = Array.isArray(mediaList) ? mediaList : mediaList ? [mediaList] : [];

  // [{ src, alt }] — shape ImageLightbox expects
  const images = resolvedList
    .map((media) => {
      const uri = media?.file?.attributes?.uri?.url ?? null;
      if (!uri) return null;
      return {
        src: `${DRUPAL_BASE_URL}${uri}`,
        alt: media?.attributes?.name ?? attr.title ?? '',
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
    photoCount: images.length,
    images,
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
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="aspect-square rounded-xl bg-gray-200" />
        ))}
      </div>
    </div>
  );
}

// ─── 4. Page ──────────────────────────────────────────────────────────────────

export default function PhotoAlbumDetailPage() {
  const { albumId } = useParams();

  const [album, setAlbum]     = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    if (!albumId) return;
    let cancelled = false;

    const load = async () => {
      try {
        const node = await getNode('photo_gallery', albumId, ALBUM_IMAGE_FIELDS);
        if (cancelled) return;
        if (node) setAlbum(transformAlbumDetail(node));
      } catch (err) {
        if (!cancelled) {
          console.error('PhotoAlbumDetailPage: failed to load', err);
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
      <main className="iec-page iec-page--photo-album min-h-screen bg-gray-50 pt-[140px]">
        <InnerPageHero
          title="أرشيف الصور"
          breadcrumbs={[
            { label: 'النشرة الإخبارية', href: '/#news' },
            { label: 'الصور', href: '/news/photos' },
          ]}
        />
        <AlbumDetailSkeleton />
      </main>
    );
  }

  if (error || !album) return <Navigate to="/news/photos" replace />;

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