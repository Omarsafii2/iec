import { useEffect, useState } from 'react';
import { FileText, Download } from 'lucide-react';
import { getNodes } from '../../../../services/api/drupalApi.js';
import { DRUPAL_BASE_URL } from '../../../../services/api/axios.config.js';
import { downloadPublicFile } from '../../../../lib/downloadPublicFile.js';

// ─── 1. Field config ──────────────────────────────────────────────────────────
// field_icon  → media--image    → source field: field_media_image
// field_file  → media--document → source field: field_media_file

const BYLAWS_IMAGE_FIELDS = [
  {
    fieldName:        'field_icon',
    mode:             'media',
    mediaSourceField: 'field_media_image',
  },
  {
    fieldName:        'field_file',
    mode:             'media',
    mediaSourceField: 'field_media_document',   // confirmed from Drupal API error response
  },
];

// ─── 2. Transform ─────────────────────────────────────────────────────────────

const transformBylaws = (node) => {
  const attr = node.attributes;

  // Icon image
  const iconMedia  = node.field_icon_resolved;
  const iconUri    = iconMedia?.file?.attributes?.uri?.url ?? null;
  const iconUrl    = iconUri ? `${DRUPAL_BASE_URL}${iconUri}` : null;

  // PDF file
  const fileMedia  = node.field_file_resolved;
  const fileUri    = fileMedia?.file?.attributes?.uri?.url ?? null;
  const fileUrl    = fileUri ? `${DRUPAL_BASE_URL}${fileUri}` : null;
  const fileName   = fileMedia?.file?.attributes?.filename ?? 'النظام-الداخلي.pdf';

  // Description
  const bodyHtml    = attr.body?.processed ?? attr.body?.value ?? '';
  const description = bodyHtml.replace(/<[^>]*>/g, '').trim();

  return {
    id: node.id,
    title:       attr.title  ?? 'النظام الداخلي للنادي',
    description,
    iconUrl,
    fileUrl,
    fileName,
  };
};

// ─── 3. Skeleton ──────────────────────────────────────────────────────────────

function BylawsSkeleton() {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="mx-auto max-w-3xl text-center animate-pulse">
        <div className="rounded-3xl border border-gray-100 bg-white p-12 shadow-lg space-y-6">
          <div className="mx-auto h-24 w-24 rounded-full bg-gray-200" />
          <div className="mx-auto h-6 w-1/2 rounded bg-gray-200" />
          <div className="space-y-2">
            <div className="mx-auto h-4 w-full rounded bg-gray-100" />
            <div className="mx-auto h-4 w-4/5 rounded bg-gray-100" />
          </div>
          <div className="mx-auto h-14 w-48 rounded-xl bg-gray-200" />
        </div>
      </div>
    </div>
  );
}

// ─── 4. Component ─────────────────────────────────────────────────────────────

export function BylawsSection() {
  const [bylaws, setBylaws]   = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const nodes = await getNodes('internal_laws', BYLAWS_IMAGE_FIELDS);
        if (cancelled) return;

        const published = nodes.filter((n) => n.attributes.status);
        if (published.length) setBylaws(transformBylaws(published[0]));
      } catch (err) {
        if (!cancelled) {
          console.error('BylawsSection: failed to load', err);
          setError(err);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => { cancelled = true; };
  }, []);

  if (loading) return <BylawsSkeleton />;
  if (error || !bylaws) return null;

  const { title, description, iconUrl, fileUrl, fileName } = bylaws;

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="mx-auto max-w-3xl text-center" data-aos="fade-up">
        <div className="rounded-3xl border border-gray-100 bg-white p-12 shadow-lg">

          {/* Icon */}
          <div
            className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-[#897D56]/10 text-[#897D56]"
            aria-hidden
          >
            {iconUrl
              ? <img src={iconUrl} alt="" className="size-12 object-contain" aria-hidden />
              : <FileText className="size-12" strokeWidth={2} />
            }
          </div>

          {/* Title */}
          <h2 className="mb-4 text-2xl font-bold text-[#564636]">{title}</h2>

          {/* Description */}
          <p className="mb-10 text-lg leading-relaxed text-gray-600">{description}</p>

          {/* Download button — only shown if a file exists */}
          {fileUrl && (
            <button
              type="button"
              onClick={() => void downloadPublicFile(fileUrl, fileName)}
              className="mx-auto flex h-14 w-fit cursor-pointer items-center justify-center gap-3 rounded-xl bg-[#564636] px-8 py-2 text-lg font-medium whitespace-nowrap text-white shadow-lg ring-offset-background transition-all hover:bg-[#3e3226] hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
            >
              <Download className="size-5 shrink-0" strokeWidth={2} aria-hidden />
              تحميل ملف PDF
            </button>
          )}

        </div>
      </div>
    </div>
  );
}

export default BylawsSection;