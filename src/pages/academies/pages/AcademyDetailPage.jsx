import { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { InnerPageHero } from '../../../components/common/InnerPageHero.jsx';
import { AcademyDetailContent } from '../components/AcademyDetailContent.jsx';
import { getNodesFull, getNodes } from '../../../services/api/drupalApi.js';
import { DRUPAL_BASE_URL } from '../../../services/api/axios.config.js';

// ─── 1. Field configs ─────────────────────────────────────────────────────────

const ACADEMY_FIELDS = {
  imageFields: [
    { fieldName: 'field_media_image',  mode: 'media', mediaSourceField: 'field_media_image' },
    { fieldName: 'field_media_images', mode: 'media', mediaSourceField: 'field_media_image' },
  ],
  taxonomyFields: [
    { fieldName: 'field_type' },  // resolved → term with attributes.name
  ],
  paragraphField:  'field_courses_and_events',
  paragraphFields: {
    'paragraph--networking_and_academic': {
      // field_image references media--image → include nested file via field_media_image
      imageFields: [
        { fieldName: 'field_image', mode: 'media', mediaSourceField: 'field_media_image' },
      ],
      documentFields: [],
      taxonomyFields: [],
    },
  },
};

const NEWS_IMAGE_FIELDS = [
  { fieldName: 'field_media_image', mode: 'media', mediaSourceField: 'field_media_image' },
];

// Taxonomy UUIDs
const ACADEMIC_TERM_UUID = 'fc986f47-15ec-4496-95a1-c65e4c2d9cb0';

// ─── 2. Helpers ───────────────────────────────────────────────────────────────

const resolveImageUrl = (resolved) => {
  const uri = resolved?.file?.attributes?.uri?.url ?? null;
  return uri ? `${DRUPAL_BASE_URL}${uri}` : null;
};

/** Paragraph «field_image»: core Image (file) or media-shaped { file } */
const resolveFieldImageUrl = (resolved) => {
  const fromMedia = resolveImageUrl(resolved);
  if (fromMedia) return fromMedia;
  if (!resolved?.attributes?.uri) return null;
  const u = resolved.attributes.uri;
  const path = typeof u === 'object' && u !== null ? u.url ?? u.value : u;
  if (!path || typeof path !== 'string') return null;
  if (path.startsWith('http')) return path;
  if (path.startsWith('public://')) {
    const rest = path.replace(/^public:\/\//, '').replace(/^\/+/, '');
    return `${DRUPAL_BASE_URL}/sites/default/files/${rest}`;
  }
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${DRUPAL_BASE_URL}${normalized}`;
};

const formatDate = (raw) => {
  if (!raw) return '';
  return new Date(raw).toLocaleDateString('ar-JO', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
};

// ─── 3. Transform academy node ────────────────────────────────────────────────

const transformAcademy = (node) => {
  const attr = node.attributes;

  // Intro image
  const image = resolveImageUrl(node.field_media_image_resolved);

  // Partners — field_media_images array → [{ src, alt }]
  const mediaList    = node.field_media_images_resolved;
  const resolvedList = Array.isArray(mediaList) ? mediaList : mediaList ? [mediaList] : [];
  const partners     = resolvedList
    .map((media) => {
      const uri = media?.file?.attributes?.uri?.url ?? null;
      return uri ? { src: `${DRUPAL_BASE_URL}${uri}`, alt: media?.attributes?.name ?? '' } : null;
    })
    .filter(Boolean);

  // Description from body
  const bodyHtml    = attr.body?.processed ?? attr.body?.value ?? '';
  const description = bodyHtml.replace(/<[^>]*>/g, '').trim();

  // Type — determines section title
  const typeId   = node.relationships?.field_type?.data?.id ?? null;
  const typeTerm = node.field_type_resolved;
  const typeName = typeTerm?.attributes?.name ?? '';

  const activitiesLabel = typeName === 'Academic' || typeId === ACADEMIC_TERM_UUID
    ? 'الدورات والأنشطة'
    : 'الفعاليات والمبادرات';

  const activities = (node.field_courses_and_events_resolved ?? []).map((p) => {
    const image = resolveFieldImageUrl(p.field_image_resolved);
    const imageAlt =
      p.attributes?.field_image?.meta?.alt ||
      p.attributes?.field_image?.alt ||
      p.field_image_resolved?.attributes?.name ||
      p.field_image_resolved?.file?.attributes?.filename ||
      p.attributes?.field_title ||
      '';
    return {
      id:        p.id,
      title:     p.attributes?.field_title ?? '',
      date:      formatDate(p.attributes?.field_date),
      location:  p.attributes?.field_location ?? '',
      phone:     p.attributes?.field_phone_number ?? '',
      image:     image || null,
      imageAlt,
    };
  });

  return {
    id:              node.id,
    title:           attr.title ?? '',
    image,
    description,
    partners,
    activities,
    activitiesLabel,
    typeId,
  };
};

// ─── 4. Transform news nodes ──────────────────────────────────────────────────

const transformNewsItem = (node) => {
  const attr    = node.attributes;
  const rawDate = attr.created ?? null;
  const dateObj = rawDate ? new Date(rawDate) : null;

  return {
    id:        node.id,
    to:        `/news/news/${node.id}`,
    title:     attr.title ?? '',
    excerpt:   attr.body?.summary
      || (attr.body?.processed ?? attr.body?.value ?? '')
          .replace(/<[^>]*>/g, '').trim().slice(0, 140),
    day:       dateObj ? String(dateObj.getDate()).padStart(2, '0') : '',
    monthYear: dateObj
      ? dateObj.toLocaleDateString('ar-JO', { month: 'long', year: 'numeric' })
      : '',
  };
};

// ─── 5. Skeleton ──────────────────────────────────────────────────────────────

function AcademyDetailSkeleton() {
  return (
    <div className="container mx-auto px-4 py-16 animate-pulse">
      <div className="mb-12 flex gap-8 rounded-3xl bg-white p-8 shadow-sm">
        <div className="h-32 w-32 rounded-2xl bg-gray-200" />
        <div className="flex-1 space-y-3">
          <div className="h-7 w-1/2 rounded bg-gray-200" />
          <div className="h-4 w-full rounded bg-gray-100" />
          <div className="h-4 w-4/5 rounded bg-gray-100" />
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-40 rounded-2xl bg-white shadow-sm" />
        ))}
      </div>
    </div>
  );
}

// ─── 6. Page ──────────────────────────────────────────────────────────────────

export default function AcademyDetailPage() {
  const { academyId } = useParams();

  const [academy, setAcademy]   = useState(null);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  useEffect(() => {
    if (!academyId) return;
    let cancelled = false;

    const load = async () => {
      try {
        // Fetch academy node with paragraphs + images + taxonomy
        const node = await getNodesFull('networking_and_academic', {
          ...ACADEMY_FIELDS,
          filters: {},
        })
          .then((nodes) => nodes.find((n) => n.id === academyId) ?? null)
          .catch(() => null);

        // If getNodesFull list doesn't work well for single node,
        // use individual approach via drupalApi directly
        // But getNodesFull returns all nodes — find by id
        if (cancelled) return;

        if (!node) {
          setError(true);
          return;
        }

        const transformed = transformAcademy(node);

        // Fetch news linked to this academy
        const newsNodes = await getNodes('news', NEWS_IMAGE_FIELDS);
        const relatedNews = newsNodes
          .filter((n) => n.attributes.status)
          .filter((n) => n.relationships?.field_networking_and_academic?.data?.id === academyId)
          .map(transformNewsItem);

        setAcademy({ ...transformed, newsItems: relatedNews });
      } catch (err) {
        if (!cancelled) {
          console.error('AcademyDetailPage: failed to load', err);
          setError(err);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => { cancelled = true; };
  }, [academyId]);

  if (loading) {
    return (
      <main className="iec-page iec-page--academy-detail min-h-screen bg-gray-50 pt-[140px]">
        <InnerPageHero
          title="..."
          breadcrumbs={[{ label: 'الأكاديميات والشبكات', href: '/#academies' }]}
        />
        <AcademyDetailSkeleton />
      </main>
    );
  }

  if (error || !academy) return <Navigate to="/" replace />;

  return (
    <main className="iec-page iec-page--academy-detail min-h-screen bg-gray-50 pt-[140px]">
      <InnerPageHero
        title={academy.title}
        breadcrumbs={[
          { label: 'الأكاديميات والشبكات', href: '/#academies' },
          { label: academy.title },
        ]}
      />
      <AcademyDetailContent academy={academy} />
    </main>
  );
}