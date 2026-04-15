import { useEffect, useState } from 'react';
import { Quote } from 'lucide-react';
import { getNodes } from '../../../../services/api/drupalApi.js';
import { DRUPAL_BASE_URL } from '../../../../services/api/axios.config.js';

// ─── Image field config ───────────────────────────────────────────────────────

const DIRECTOR_IMAGE_FIELDS = [
  {
    fieldName: 'field_media_image',
    mode: 'media',
    mediaSourceField: 'field_media_image',
  },
];

// ─── Transform ────────────────────────────────────────────────────────────────

/**
 * Transforms a raw Drupal `secretary_general_s_speech` node into the shape
 * DirectorWordSection expects:
 * {
 *   id, name, role, heading, portrait, portraitAlt, bioItems, bodyHtml
 * }
 */
const transformDirectorNode = (node) => {
  const attr = node.attributes;

  // ── Portrait image ────────────────────────────────────────────────────────
  const media      = node.field_media_image_resolved;
  const fileUri    = media?.file?.attributes?.uri?.url ?? null;
  const portrait   = fileUri ? `${DRUPAL_BASE_URL}${fileUri}` : null;
  const portraitAlt = media?.file?.attributes?.filename ?? attr.field_name ?? 'الامين العام';

  // ── Bio list items (strip HTML, extract <li> text) ────────────────────────
  const bodyHtml = attr.body?.processed ?? attr.body?.value ?? '';
  const bioItems = (() => {
    if (!bodyHtml) return [];
    const doc   = new DOMParser().parseFromString(bodyHtml, 'text/html');
    const items = Array.from(doc.querySelectorAll('li'));
    return items.map((li) => li.textContent.trim()).filter(Boolean);
  })();

  return {
    id:          node.id,
    name:        attr.field_name     ?? '',
    role:        attr.field_position ?? '',
    heading:     attr.title          ?? attr.field_name ?? '',
    portrait,
    portraitAlt,
    bioItems,
    bodyHtml,   // kept as fallback for non-list bodies
  };
};

// ─── Loading skeleton ─────────────────────────────────────────────────────────

function DirectorSkeleton() {
  return (
    <div className="container mx-auto px-4 py-20 animate-pulse">
      <div className="grid items-start gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="h-96 w-full rounded-2xl bg-gray-200" />
        </div>
        <div className="lg:col-span-7 space-y-4 pt-4">
          <div className="h-7 w-2/5 rounded bg-gray-200" />
          {[80, 92, 75, 88, 70, 83].map((w) => (
            <div key={w} className="flex gap-3 items-center">
              <div className="h-2 w-2 rounded-full bg-gray-300 shrink-0" />
              <div className="h-4 rounded bg-gray-100" style={{ width: `${w}%` }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * Fetches the first published `secretary_general_s_speech` node and renders
 * the secretary-general's portrait + bio card.
 *
 * @param {string} [fallbackPortrait] - Shown while loading or if no image is returned.
 */
export function DirectorWordSection({ fallbackPortrait = '/images/secretary-general.png' }) {
  const [director, setDirector] = useState(null);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const nodes = await getNodes('secretary_general_s_speech', DIRECTOR_IMAGE_FIELDS);
        if (cancelled) return;

        const published = nodes.filter((n) => n.attributes.status);
        if (published.length) setDirector(transformDirectorNode(published[0]));
      } catch (err) {
        if (!cancelled) {
          console.error('DirectorWordSection: failed to load data', err);
          setError(err);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => { cancelled = true; };
  }, []);

  if (loading) return <DirectorSkeleton />;

  // On error or no data the section still renders with whatever we have
  const {
    name        = '',
    role        = '',
    heading     = '',
    portrait    = null,
    portraitAlt = 'الامين العام',
    bioItems    = [],
    bodyHtml    = '',
  } = director ?? {};

  const resolvedPortrait = portrait ?? fallbackPortrait;

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="grid items-start gap-12 lg:grid-cols-12" data-aos="fade-up">

        {/* ── Portrait ── */}
        <div className="relative lg:col-span-5">
          <div className="relative transform overflow-hidden rounded-2xl border-4 border-white shadow-2xl transition-transform duration-500 hover:rotate-0 lg:rotate-2">
            <img
              src={resolvedPortrait}
              alt={portraitAlt}
              className="h-auto w-full object-cover"
              onError={(e) => { e.currentTarget.src = fallbackPortrait; }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" aria-hidden />
            <div className="absolute bottom-6 right-6 text-white">
              <p className="text-xl font-bold">{name}</p>
              <p className="text-sm opacity-90">{role}</p>
            </div>
          </div>
          <div
            className="absolute -top-6 -right-6 -z-10 hidden h-full w-full rounded-2xl border-2 border-[#897D56]/20 lg:block"
            aria-hidden
          />
        </div>

        {/* ── Bio card ── */}
        <div className="lg:col-span-7">
          <div className="relative rounded-3xl border border-gray-100 bg-white p-8 shadow-sm md:p-12">
            <Quote
              className="absolute top-8 start-8 h-24 w-24 -scale-x-100 text-[#897D56]/10"
              strokeWidth={2}
              aria-hidden
            />

            <h2 className="relative z-10 mb-6 text-2xl font-bold text-[#564636]">{heading}</h2>

            <div className="relative z-10 space-y-6 text-lg leading-relaxed text-gray-600">
              {bioItems.length > 0 ? (
                <ul className="space-y-4">
                  {bioItems.map((text) => (
                    <li key={text} className="flex gap-3">
                      <span className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-[#897D56]" aria-hidden />
                      <span>{text}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div
                  className="prose prose-lg prose-stone max-w-none"
                  dangerouslySetInnerHTML={{ __html: bodyHtml }}
                />
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default DirectorWordSection;