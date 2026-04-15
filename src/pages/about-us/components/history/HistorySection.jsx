import { useEffect, useState } from 'react';
import { BookOpen, Target, Users } from 'lucide-react';
import Card from '../../../../components/ui/Card.jsx';
import { getNodesFull } from '../../../../services/api/drupalApi.js';
import { DRUPAL_BASE_URL } from '../../../../services/api/axios.config.js';

// ─── 1. Field config ──────────────────────────────────────────────────────────

const IMAGE_FIELDS = [
  { fieldName: 'field_media_image',  mode: 'media', mediaSourceField: 'field_media_image' },
  { fieldName: 'field_second_image', mode: 'media', mediaSourceField: 'field_media_image' },
];

const PARAGRAPH_FIELDS = {
  'paragraph--founding_date': {
    imageFields: [
      { fieldName: 'field_icon', mode: 'media', mediaSourceField: 'field_media_image' },
    ],
  },
};

// ─── 2. Helpers ───────────────────────────────────────────────────────────────

const resolveImageUrl = (resolved) => {
  const uri = resolved?.file?.attributes?.uri?.url ?? null;
  return uri ? `${DRUPAL_BASE_URL}${uri}` : null;
};

const stripHtml = (html) => (html ?? '').replace(/<[^>]*>/g, '').trim();

// ─── 3. Transform ─────────────────────────────────────────────────────────────

const transformNode = (node) => {
  const attr = node.attributes;

  const image       = resolveImageUrl(node.field_media_image_resolved);
  const secondImage = resolveImageUrl(node.field_second_image_resolved);

  // body and description as HTML (rendered with dangerouslySetInnerHTML)
  const bodyHtml        = attr.body?.processed        ?? attr.body?.value        ?? '';
  const descriptionHtml = attr.field_description?.processed
                       ?? attr.field_description?.value ?? '';

  // Paragraphs — each has field_title, field_body, field_classification, field_icon
  const paragraphs = (node.field_founding_date_paragraph_resolved ?? []).map((p) => ({
    id:             p.id,
    title:          p.attributes?.field_title          ?? '',
    bodyHtml:       p.attributes?.field_body?.processed ?? p.attributes?.field_body?.value ?? '',
    bodyText:       stripHtml(p.attributes?.field_body?.processed ?? p.attributes?.field_body?.value),
    classification: p.attributes?.field_classification ?? '',
    iconUrl:        resolveImageUrl(p.field_icon_resolved),
  }));

  return {
    id:             node.id,
    place:          attr.field_place_of_the_section ?? '',   // "top" | "bottom"
    tag:            attr.field_tag                  ?? '',
    bodyHtml,
    descriptionHtml,
    image,
    secondImage,
    paragraphs,
  };
};

// ─── 4. Skeleton ──────────────────────────────────────────────────────────────

function HistorySkeleton() {
  return (
    <div className="container mx-auto px-4 py-20 animate-pulse space-y-24">
      <div className="rounded-3xl bg-white p-12 shadow-sm">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7 space-y-4">
            <div className="h-6 w-full rounded bg-gray-200" />
            <div className="h-4 w-5/6 rounded bg-gray-100" />
            <div className="h-4 w-4/5 rounded bg-gray-100" />
          </div>
          <div className="lg:col-span-5 h-64 rounded-2xl bg-gray-200" />
        </div>
      </div>
      <div className="grid gap-16 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="h-8 w-2/3 rounded bg-gray-200" />
          <div className="h-4 w-full rounded bg-gray-100" />
          <div className="h-4 w-5/6 rounded bg-gray-100" />
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="h-32 rounded-2xl bg-gray-200" />
            <div className="h-32 rounded-2xl bg-gray-200" />
          </div>
        </div>
        <div className="h-[600px] rounded-3xl bg-gray-200" />
      </div>
    </div>
  );
}

// ─── 5. Top section ───────────────────────────────────────────────────────────

function TopSection({ node }) {
  // Parse body HTML into paragraphs for the styled layout
  const doc   = new DOMParser().parseFromString(node.bodyHtml, 'text/html');
  const paras = Array.from(doc.querySelectorAll('p, strong'))
    .map((el) => el.textContent.trim())
    .filter(Boolean);

  // Use description paragraphs if available
  const descDoc   = new DOMParser().parseFromString(node.descriptionHtml, 'text/html');
  const descParas = Array.from(descDoc.querySelectorAll('p'))
    .map((el) => el.textContent.trim())
    .filter(Boolean);

  const mainText  = paras[0]  || '';
  const desc1     = descParas[0] || '';
  const desc2     = descParas[1] || '';

  return (
    <div className="mx-auto mb-24 max-w-7xl">
      <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm md:p-12" data-aos="fade-up">
        <div className="grid items-center gap-16 lg:grid-cols-12">
          <div className="order-2 lg:order-1 lg:col-span-7">
            <div className="max-w-none text-gray-600">
              {mainText && (
                <p className="mb-8 border-b border-gray-100 pb-8 text-xl leading-loose font-bold text-[#564636]">
                  {mainText}
                </p>
              )}
              {desc1 && <p className="mb-6 leading-relaxed">{desc1}</p>}
              {desc2 && <p className="leading-relaxed">{desc2}</p>}
            </div>
          </div>

          {node.image && (
            <div className="relative order-1 lg:order-2 lg:col-span-5">
              <div className="relative z-10 overflow-hidden rounded-2xl border-4 border-white shadow-xl transition-transform duration-500 hover:scale-[1.02]">
                <img
                  src={node.image}
                  alt="نشاطات نادي خريجي الكلية العلمية الإسلامية"
                  className="w-full object-cover"
                />
              </div>
              <div
                className="absolute -top-6 -left-6 hidden h-full w-full rounded-2xl border-2 border-[#897D56]/20 lg:block"
                aria-hidden
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── 6. Bottom section ────────────────────────────────────────────────────────

function BottomSection({ node }) {
  // Parse description into paragraphs
  const descDoc   = new DOMParser().parseFromString(node.descriptionHtml, 'text/html');
  const descParas = Array.from(descDoc.querySelectorAll('p'))
    .map((el) => el.textContent.trim())
    .filter(Boolean);

  // Split paragraphs by classification
  const visionPara  = node.paragraphs.find((p) => p.classification === 'vision');
  const messagePara = node.paragraphs.find((p) => p.classification === 'our_message');
  const factsPara   = node.paragraphs.find((p) => p.classification === 'facts');

  // Map to Card variant props
  const valueCards = [
    visionPara && {
      title:       visionPara.title,
      description: visionPara.bodyText,
      icon:        visionPara.iconUrl
        ? <img src={visionPara.iconUrl} alt="" className="size-6 object-contain" aria-hidden />
        : <Target size={24} strokeWidth={2} aria-hidden className="transition-colors group-hover:text-white" />,
      variant: 'history-vision',
    },
    messagePara && {
      title:       messagePara.title,
      description: messagePara.bodyText,
      icon:        messagePara.iconUrl
        ? <img src={messagePara.iconUrl} alt="" className="size-6 object-contain" aria-hidden />
        : <BookOpen size={24} strokeWidth={2} aria-hidden className="transition-colors group-hover:text-white" />,
      variant: 'history-mission',
    },
  ].filter(Boolean);

  return (
    <div className="mx-auto max-w-7xl">
      <div className="grid items-start gap-16 lg:grid-cols-2">

        {/* Left — text + cards */}
        <div className="order-2 flex flex-col gap-8 lg:order-1" data-aos="fade-up">
          <div>
            {node.tag && (
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#897D56]/10 px-3 py-1 text-sm font-semibold text-[#897D56]">
                <span className="h-2 w-2 rounded-full bg-[#897D56]" />
                {node.tag}
              </div>
            )}
            <div
              className="mb-6 text-4xl leading-tight font-bold text-[#564636] md:text-5xl [&_h2]:text-4xl [&_h2]:leading-tight [&_span]:text-[#897D56]"
              dangerouslySetInnerHTML={{ __html: node.bodyHtml }}
            />
            <div className="space-y-4 text-justify text-lg leading-relaxed text-gray-600">
              {descParas.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </div>

          {valueCards.length > 0 && (
            <div className="grid gap-4 sm:grid-cols-2">
              {valueCards.map((card) => (
                <Card key={card.title} {...card} />
              ))}
            </div>
          )}
        </div>

        {/* Right — images + facts badge */}
        <div className="relative order-1 hidden min-h-[600px] h-full md:block lg:order-2" data-aos="fade-up">
          <div
            className="absolute top-10 left-10 right-0 bottom-0 -z-10 translate-x-4 translate-y-4 rounded-3xl border-2 border-[#897D56]/20"
            aria-hidden
          />

          {node.image && (
            <div className="absolute top-0 right-0 z-10 h-[85%] w-[85%] overflow-hidden rounded-3xl shadow-2xl">
              <img
                src={node.image}
                alt="تاريخ النادي"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#564636]/60 to-transparent" />
              <div className="absolute bottom-6 right-6 text-right text-white">
                <p className="text-lg font-bold">تاريخ عريق</p>
                <p className="text-sm text-white/80">منذ التأسيس</p>
              </div>
            </div>
          )}

          {node.secondImage && (
            <div className="absolute bottom-8 left-0 z-20 aspect-[4/5] w-[55%] overflow-hidden rounded-2xl border-4 border-white shadow-2xl">
              <img
                src={node.secondImage}
                alt="أعضاء النادي"
                className="h-full w-full object-cover"
              />
            </div>
          )}

          {factsPara && (
            <div className="absolute top-12 left-8 z-30 rounded-xl bg-white/90 p-4 shadow-lg backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-[#897D56] p-2 text-white">
                  {factsPara.iconUrl
                    ? <img src={factsPara.iconUrl} alt="" className="size-6 object-contain" aria-hidden />
                    : <Users size={24} strokeWidth={2} aria-hidden />
                  }
                </div>
                <div>
                  <p className="text-xl font-bold text-[#564636]">{factsPara.title}</p>
                  <p className="text-xs text-gray-500">{factsPara.bodyText}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Mobile image fallback */}
        {node.image && (
          <div className="order-1 mb-8 md:hidden" data-aos="fade-up">
            <img
              src={node.image}
              alt="نشاطات النادي"
              className="h-[400px] w-full rounded-2xl object-cover shadow-lg"
            />
          </div>
        )}
      </div>
    </div>
  );
}

// ─── 7. Main component ────────────────────────────────────────────────────────

export function HistorySection() {
  const [topNode, setTopNode]       = useState(null);
  const [bottomNode, setBottomNode] = useState(null);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const nodes = await getNodesFull('founding_date', {
          imageFields:    IMAGE_FIELDS,
          paragraphField: 'field_founding_date_paragraph',
          paragraphFields: PARAGRAPH_FIELDS,
        });

        if (cancelled) return;

        const transformed = nodes
          .filter((n) => n.attributes.status)
          .map(transformNode);

        setTopNode(transformed.find((n) => n.place === 'top')    ?? null);
        setBottomNode(transformed.find((n) => n.place === 'bottom') ?? null);
      } catch (err) {
        if (!cancelled) {
          console.error('HistorySection: failed to load', err);
          setError(err);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => { cancelled = true; };
  }, []);

  if (loading) return <HistorySkeleton />;
  if (error) return null;

  return (
    <div className="container mx-auto px-4 py-20">
      {topNode    && <TopSection    node={topNode}    />}
      {bottomNode && <BottomSection node={bottomNode} />}
    </div>
  );
}

export default HistorySection;