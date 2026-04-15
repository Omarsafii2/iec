import { useEffect, useState } from 'react';
import Card from '../../../components/ui/Card.jsx';
import { getNodes } from '../../../services/api/drupalApi.js';
import { DRUPAL_BASE_URL } from '../../../services/api/axios.config.js';

// ─── 1. Field config ──────────────────────────────────────────────────────────

const VENUE_IMAGE_FIELDS = [
  {
    fieldName:        'field_media_images',
    mode:             'media',
    mediaSourceField: 'field_media_image',
  },
];

// Taxonomy term UUID for "Reservations"
const RESERVATIONS_TERM_UUID = '3173c0f8-48a6-49fb-b664-b68f0bf51a78';

// ─── 2. Transform ─────────────────────────────────────────────────────────────

const transformVenue = (node) => {
  const attr = node.attributes;

  const mediaList    = node.field_media_images_resolved;
  const resolvedList = Array.isArray(mediaList)
    ? mediaList
    : mediaList ? [mediaList] : [];

  // Card reservation-venue expects images as [{ src, alt }]
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
    badge:       attr.field_tag          ?? null,
    images,
  };
};

// ─── 3. Skeleton ──────────────────────────────────────────────────────────────

function VenueSkeleton() {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="animate-pulse rounded-3xl bg-gray-100 overflow-hidden">
            <div className="h-72 w-full bg-gray-200" />
            <div className="p-8 space-y-4">
              <div className="h-6 w-2/3 rounded bg-gray-200" />
              <div className="h-4 w-full rounded bg-gray-100" />
              <div className="h-4 w-4/5 rounded bg-gray-100" />
              <div className="h-12 w-full rounded-xl bg-gray-200 mt-6" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── 4. Component ─────────────────────────────────────────────────────────────

export function VenueReservationsSection() {
  const [venues, setVenues]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const nodes = await getNodes('club_market_and_reservations', VENUE_IMAGE_FIELDS);
        if (cancelled) return;

        const transformed = nodes
          .filter((n) => n.attributes.status)
          .filter((n) => n.relationships?.field_market_reservations?.data?.id === RESERVATIONS_TERM_UUID)
          .map(transformVenue);

        setVenues(transformed);
      } catch (err) {
        if (!cancelled) {
          console.error('VenueReservationsSection: failed to load', err);
          setError(err);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => { cancelled = true; };
  }, []);

  if (loading) return <VenueSkeleton />;
  if (error || !venues.length) return null;

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {venues.map((venue) => (
          <Card key={venue.id} variant="reservation-venue" {...venue} />
        ))}
      </div>
    </div>
  );
}

export default VenueReservationsSection;