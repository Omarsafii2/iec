import { useEffect, useState } from 'react';
import { FileText, Download } from 'lucide-react';
import { getNodes } from '../../../../services/api/drupalApi.js';
import { DRUPAL_BASE_URL } from '../../../../services/api/axios.config.js';
import { downloadPublicFile } from '../../../../lib/downloadPublicFile.js';

// ─── 1. Field config ──────────────────────────────────────────────────────────

const ACHIEVEMENTS_FILE_FIELDS = [
  {
    fieldName:        'field_file',
    mode:             'media',
    mediaSourceField: 'field_media_document',
  },
];

// ─── 2. Transform ─────────────────────────────────────────────────────────────

const transformAchievement = (node) => {
  const attr = node.attributes;

  // PDF file
  const fileMedia        = node.field_file_resolved;
  const fileUri          = fileMedia?.file?.attributes?.uri?.url ?? null;
  const fileUrl          = fileUri ? `${DRUPAL_BASE_URL}${fileUri}` : null;
  const fileName         = fileMedia?.file?.attributes?.filename ?? 'تقرير-الإنجاز.pdf';
  const fileSizeBytes    = fileMedia?.file?.attributes?.filesize ?? null;
  const fileSizeLabel    = fileSizeBytes
    ? fileSizeBytes >= 1_048_576
      ? `${(fileSizeBytes / 1_048_576).toFixed(1)} MB`
      : `${Math.round(fileSizeBytes / 1024)} KB`
    : 'PDF';

  // Year from field_date (e.g. "2026-04-15" → "2026")
  const year = attr.field_date ? new Date(attr.field_date).getFullYear().toString() : '';

  // Description
  const bodyHtml    = attr.body?.processed ?? attr.body?.value ?? '';
  const description = bodyHtml.replace(/<[^>]*>/g, '').trim();

  return {
    id:               node.id,
    title:            attr.title ?? '',
    description,
    year,
    fileUrl,
    downloadFilename: fileName,
    pdfMeta:          fileSizeLabel,
  };
};

// ─── 3. Skeleton ──────────────────────────────────────────────────────────────

function AchievementsSkeleton() {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="relative mx-auto max-w-4xl space-y-16 border-r-2 border-gray-200 pr-10 mr-4 md:pr-14">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="animate-pulse rounded-2xl bg-gray-100 p-8 space-y-4">
            <div className="h-6 w-16 rounded-lg bg-gray-200" />
            <div className="h-5 w-2/3 rounded bg-gray-200" />
            <div className="h-4 w-full rounded bg-gray-100" />
            <div className="h-4 w-4/5 rounded bg-gray-100" />
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="flex gap-3 items-center">
                <div className="h-10 w-10 rounded-lg bg-gray-200" />
                <div className="space-y-1">
                  <div className="h-3 w-24 rounded bg-gray-200" />
                  <div className="h-3 w-16 rounded bg-gray-100" />
                </div>
              </div>
              <div className="h-10 w-10 rounded-full bg-gray-200" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── 4. Sub-component ─────────────────────────────────────────────────────────

function TimelineCard({ year, title, description, fileUrl, downloadFilename, pdfMeta }) {
  return (
    <div className="group relative" data-aos="fade-up">
      <div
        className="absolute top-0 -right-[52px] z-10 h-5 w-5 rounded-full border-4 border-white bg-[#897D56] shadow-sm md:-right-[68px]"
        aria-hidden
      />
      <div className="group rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-shadow hover:shadow-md">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
          <span className="inline-block rounded-lg bg-[#897D56]/10 px-3 py-1 text-sm font-bold text-[#897D56]">
            {year}
          </span>
        </div>
        <h3 className="mb-2 text-xl font-bold text-[#564636]">{title}</h3>
        <p className="mb-6 text-gray-600">{description}</p>

        {/* PDF row — only shown if a file exists */}
        {fileUrl && (
          <div className="flex items-center justify-between border-t border-gray-50 pt-6">
            <div className="flex items-center gap-3">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50 text-red-500"
                aria-hidden
              >
                <FileText size={20} strokeWidth={2} />
              </div>
              <div className="flex flex-col text-start">
                <span className="text-sm font-medium text-gray-700">تقرير الإنجاز</span>
                <span className="text-xs text-gray-400">{pdfMeta}</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => void downloadPublicFile(fileUrl, downloadFilename)}
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-gray-50 text-gray-400 transition-all duration-300 group-hover:bg-[#897D56] group-hover:text-white"
              aria-label={`تحميل تقرير الإنجاز — ${year}`}
            >
              <Download size={18} strokeWidth={2} aria-hidden />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── 5. Component ─────────────────────────────────────────────────────────────

export function AchievementsSection() {
  const [items, setItems]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const nodes = await getNodes('club_achievements', ACHIEVEMENTS_FILE_FIELDS);
        if (cancelled) return;

        const transformed = nodes
          .filter((n) => n.attributes.status)
          .map(transformAchievement)
          // Sort newest first by year
          .sort((a, b) => b.year.localeCompare(a.year));

        setItems(transformed);
      } catch (err) {
        if (!cancelled) {
          console.error('AchievementsSection: failed to load', err);
          setError(err);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => { cancelled = true; };
  }, []);

  if (loading) return <AchievementsSkeleton />;
  if (error || !items.length) return null;

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="relative mx-auto max-w-4xl space-y-16 border-r-2 border-[#897D56]/20 pr-10 mr-4 md:pr-14">
        {items.map((item) => (
          <TimelineCard key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
}

export default AchievementsSection;