import { useEffect, useState } from 'react';
import Slider from '../../components/ui/Slider.jsx';
import { getNodes } from '../../services/api/drupalApi.js';
import { DRUPAL_BASE_URL } from '../../services/api/axios.config.js';

// ─── 1. Field config ──────────────────────────────────────────────────────────

const ACADEMY_IMAGE_FIELDS = [
  { fieldName: 'field_media_image', mode: 'media', mediaSourceField: 'field_media_image' },
];

// Taxonomy term UUIDs
const ACADEMIC_TERM_UUID  = 'fc986f47-15ec-4496-95a1-c65e4c2d9cb0'; // "Academic"
const NETWORKING_TERM_UUID = 'f7d9156f-562a-48b9-84c6-866957cb01b9'; // "Networking"

// ─── 2. Transform ─────────────────────────────────────────────────────────────

const transformAcademy = (node) => {
  const attr = node.attributes;

  const media   = node.field_media_image_resolved;
  const fileUri = media?.file?.attributes?.uri?.url ?? null;
  const image   = fileUri ? `${DRUPAL_BASE_URL}${fileUri}` : null;

  const typeId  = node.relationships?.field_type?.data?.id ?? null;

  return {
    id:     node.id,
    to:     `/academies/${node.id}`,
    title:  attr.title ?? '',
    image,
    typeId,
  };
};

// ─── 3. Skeleton ──────────────────────────────────────────────────────────────

function AcademiesSkeleton() {
  return (
    <section className="relative z-10 -mt-24 bg-[#564636] py-20" dir="rtl">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center animate-pulse">
          <div className="mx-auto h-8 w-56 rounded bg-white/20 mb-4" />
          <div className="mx-auto h-1 w-24 bg-[#897D56]" />
        </div>
        <div className="space-y-8">
          <div className="flex gap-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-32 w-32 shrink-0 rounded-xl bg-white/10 animate-pulse" />
            ))}
          </div>
          <div className="flex gap-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-32 w-32 shrink-0 rounded-xl bg-white/10 animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── 4. Component ─────────────────────────────────────────────────────────────

export function NetworksSection() {
  const [academicRow, setAcademicRow]    = useState([]);
  const [networkingRow, setNetworkingRow] = useState([]);
  const [loading, setLoading]             = useState(true);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const nodes = await getNodes('networking_and_academic', ACADEMY_IMAGE_FIELDS);
        if (cancelled) return;

        const transformed = nodes
          .filter((n) => n.attributes.status)
          .map(transformAcademy);

        setAcademicRow(transformed.filter((n) => n.typeId === ACADEMIC_TERM_UUID));
        setNetworkingRow(transformed.filter((n) => n.typeId === NETWORKING_TERM_UUID));
      } catch (err) {
        console.error('NetworksSection: failed to load', err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => { cancelled = true; };
  }, []);

  if (loading) return <AcademiesSkeleton />;

  // If both rows are empty fall back to nothing
  if (!academicRow.length && !networkingRow.length) return null;

  return (
    <section id="academies" className="relative z-10 -mt-24 bg-[#564636] py-20" dir="rtl">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white">الشبكات والأكاديميات</h2>
          <div className="mx-auto h-1 w-24 bg-[#897D56]" />
        </div>

        <div className="space-y-8">
          {academicRow.length > 0 && (
            <Slider variant="academies" items={academicRow} />
          )}
          {networkingRow.length > 0 && (
            <Slider variant="academies" items={networkingRow} />
          )}
        </div>
      </div>
    </section>
  );
}

export default NetworksSection;