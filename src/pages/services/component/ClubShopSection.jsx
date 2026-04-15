import { useEffect, useState } from 'react';
import Card from '../../../components/ui/Card.jsx';
import { getNodes } from '../../../services/api/drupalApi.js';
import { DRUPAL_BASE_URL } from '../../../services/api/axios.config.js';

// ─── 1. Field config ──────────────────────────────────────────────────────────

const SHOP_IMAGE_FIELDS = [
  {
    fieldName:        'field_media_images',
    mode:             'media',
    mediaSourceField: 'field_media_image',
  },
];

// Taxonomy term UUID for "market"
const MARKET_TERM_UUID = '16aea6a0-b8e4-489d-a8a5-e1018becfbdb';

// ─── 2. Transform ─────────────────────────────────────────────────────────────

const transformProduct = (node) => {
  const attr = node.attributes;

  // field_media_images is a multi-value relationship.
  // drupalApi resolves it as an ARRAY of media entities, each with a .file property.
  // We need to handle: array, single object, or null.
  const mediaList = node.field_media_images_resolved;
  const resolvedList = Array.isArray(mediaList)
    ? mediaList
    : mediaList
      ? [mediaList]
      : [];

  // Card variant "slider-card" expects images as { src, alt } objects
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

  const price       = attr.field_price
    ? `${attr.field_price} ${attr.field_prefix ?? ''}`.trim()
    : null;

  const bodyHtml    = attr.body?.processed ?? attr.body?.value ?? '';
  const description = bodyHtml.replace(/<[^>]*>/g, '').trim();

  return {
    id:          node.id,
    title:       attr.title              ?? '',
    description,
    price,
    phone:       attr.field_phone_number ?? '',
    badge:       attr.field_tag          ?? null,  // e.g. "جديد" or "الأكثر مبيعاً"
    images,                                        // [{ src, alt }] — what slider-card expects
  };
};

// ─── 3. Skeleton ──────────────────────────────────────────────────────────────

function ShopSkeleton() {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="animate-pulse rounded-2xl bg-gray-100 p-6 space-y-4">
            <div className="h-56 w-full rounded-xl bg-gray-200" />
            <div className="h-5 w-2/3 rounded bg-gray-200" />
            <div className="h-4 w-full rounded bg-gray-100" />
            <div className="h-4 w-4/5 rounded bg-gray-100" />
            <div className="h-6 w-1/3 rounded bg-gray-200" />
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── 4. Component ─────────────────────────────────────────────────────────────

export function ClubShopSection() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const nodes = await getNodes('club_market_and_reservations', SHOP_IMAGE_FIELDS);
        if (cancelled) return;

        const transformed = nodes
          .filter((n) => n.attributes.status)
          .filter((n) => n.relationships?.field_market_reservations?.data?.id === MARKET_TERM_UUID)
          .map(transformProduct);

        setProducts(transformed);
      } catch (err) {
        if (!cancelled) {
          console.error('ClubShopSection: failed to load', err);
          setError(err);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => { cancelled = true; };
  }, []);

  if (loading) return <ShopSkeleton />;
  if (error || !products.length) return null;

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {products.map((p) => (
          <Card key={p.id} variant="slider-card" {...p} />
        ))}
      </div>
    </div>
  );
}

export default ClubShopSection;