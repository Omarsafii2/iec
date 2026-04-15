import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock } from 'lucide-react';
import { getNodes } from '../../services/api/drupalApi.js';
import { DRUPAL_BASE_URL } from '../../services/api/axios.config.js';
import fallbackImg from '../../../assets/images/hour.png';

// ─── 1. Field config ──────────────────────────────────────────────────────────

const IMAGE_FIELDS = [
  { fieldName: 'field_media_image', mode: 'media', mediaSourceField: 'field_media_image' },
];

// ─── 2. Transform ─────────────────────────────────────────────────────────────

const transformInitiative = (node) => {
  const attr = node.attributes;

  const media   = node.field_media_image_resolved;
  const fileUri = media?.file?.attributes?.uri?.url ?? null;
  const image   = fileUri ? `${DRUPAL_BASE_URL}${fileUri}` : null;

  const bodyHtml    = attr.body?.processed ?? attr.body?.value ?? '';
  const description = bodyHtml.replace(/<[^>]*>/g, '').trim();

  // CTA button — resolve internal: links to a React Router path
  const rawCta  = attr.field_call_to_action_button;
  const ctaHref = rawCta?.uri?.startsWith('internal:')
    ? rawCta.uri.replace('internal:', '') || '/'
    : rawCta?.uri ?? '/contact';
  const ctaLabel = rawCta?.title || 'شارك معنا الآن';

  return {
    id:          node.id,
    title:       attr.title    ?? '',
    description,
    tag:         attr.field_tag ?? '',
    image,
    ctaHref,
    ctaLabel,
  };
};

// ─── 3. Component ─────────────────────────────────────────────────────────────

export function VolunteerHourSection() {
  const [data, setData]       = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const nodes = await getNodes('an_hour_makes_a_difference', IMAGE_FIELDS);
        if (cancelled) return;
        const published = nodes.filter((n) => n.attributes.status);
        if (published.length) setData(transformInitiative(published[0]));
      } catch (err) {
        console.error('VolunteerHourSection: failed to load', err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => { cancelled = true; };
  }, []);

  // Derive display values — fall back to static defaults while loading or on error
  const title       = data?.title       ?? 'مبادرة "ساعة تصنع الفرق"';
  const description = data?.description ?? '';
  const tag         = data?.tag         ?? 'مبادرة تطوعية';
  const image       = data?.image       ?? fallbackImg;
  const ctaHref     = data?.ctaHref     ?? '/contact';
  const ctaLabel    = data?.ctaLabel    ?? 'شارك معنا الآن';

  return (
    <section className="relative overflow-hidden bg-white py-16" dir="rtl">
      <div className="absolute top-0 right-0 h-64 w-64 -translate-y-1/2 translate-x-1/2 rounded-full bg-[#897D56]/5 blur-3xl" />

      <div className="relative z-10 container mx-auto px-4">
        <div className="flex flex-col items-center gap-8 rounded-[2rem] bg-[#564636]/5 p-8 md:flex-row md:gap-16 md:p-12">

          {/* Image */}
          <div className="flex w-full shrink-0 justify-center md:w-1/3 md:justify-start">
            <div className="relative w-full max-w-[280px] rotate-2 overflow-hidden rounded-2xl border-4 border-white shadow-lg transition-transform duration-500 hover:rotate-0">
              <img
                src={image}
                alt={title}
                className="h-auto w-full"
                onError={(e) => { e.currentTarget.src = fallbackImg; }}
              />
            </div>
          </div>

          {/* Content */}
          <div className="w-full text-right md:w-2/3">
            {tag && (
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#897D56]/10 px-3 py-1 text-sm font-bold text-[#897D56]">
                <Clock className="size-4 shrink-0" strokeWidth={2} aria-hidden />
                <span>{tag}</span>
              </div>
            )}

            <h2 className="mb-6 text-3xl font-bold leading-tight text-[#564636] md:text-4xl">
              {title}
            </h2>

            {description && (
              <p className="mb-8 text-lg leading-relaxed text-gray-600">{description}</p>
            )}

            <Link
              to={ctaHref}
              className="inline-flex h-12 items-center justify-center whitespace-nowrap rounded-xl bg-[#897D56] px-8 py-2 text-lg font-medium text-white shadow-lg outline-none ring-offset-background transition-all hover:bg-[#756A45] hover:shadow-xl focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              {ctaLabel}
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}

export default VolunteerHourSection;