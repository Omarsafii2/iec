import { useEffect, useState, useCallback } from 'react';
import { FileText, Download, X } from 'lucide-react';
import { getNodes } from '../../../../services/api/drupalApi.js';
import { DRUPAL_BASE_URL } from '../../../../services/api/axios.config.js';
import { downloadPublicFile } from '../../../../lib/downloadPublicFile.js';

const ACHIEVEMENTS_INTRO_TITLE =
  'يعمل نادي الخريجين على تحقيق أهدافه من خلال عدة فعاليات هادفة، ومنها:';

// ─── 1. Field config ──────────────────────────────────────────────────────────

const ACHIEVEMENTS_FILE_FIELDS = [
  {
    fieldName:        'field_file',
    mode:             'media',
    mediaSourceField: 'field_media_document',
  },
];

// ─── 2. Transform ─────────────────────────────────────────────────────────────

const stripHtmlToText = (html) =>
  html
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();

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

  // Year: field_date when set, else created (many nodes omit field_date in JSON:API)
  const dateForYear = attr.field_date || attr.created;
  const year        = dateForYear ? new Date(dateForYear).getFullYear().toString() : '';
  const sortTime    = dateForYear ? new Date(dateForYear).getTime() : 0;

  // Body: Drupal often returns body: null; when present use processed HTML; else optional summary (plain)
  const bodyField   = attr.body;
  const rawHtml     = (bodyField?.processed ?? bodyField?.value ?? '').trim();
  const bodyHtml    = rawHtml;
  const summaryText = (bodyField?.summary ?? '').trim();
  const description = bodyHtml ? stripHtmlToText(bodyHtml) : summaryText;

  return {
    id:               node.id,
    title:            attr.title ?? '',
    description,
    bodyHtml,
    year,
    sortTime,
    fileUrl,
    downloadFilename: fileName,
    pdfMeta:          fileSizeLabel,
  };
};

// ─── 3. Skeleton ──────────────────────────────────────────────────────────────

function AchievementsSkeleton() {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="mx-auto mb-12 max-w-4xl animate-pulse space-y-3 px-4 md:px-0">
        <div className="h-7 w-full max-w-3xl rounded bg-gray-200" />
        <div className="h-7 w-4/5 max-w-2xl rounded bg-gray-100" />
      </div>
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

// ─── 4. Sub-components ───────────────────────────────────────────────────────

const formatCounter = (index) => String(index ?? '').padStart(2, '0');

function AchievementDetailModal({ open, item, onClose }) {
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (!open) return undefined;
    window.addEventListener('keydown', handleKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, handleKeyDown]);

  if (!open || !item) return null;

  const bodyHtml = item.bodyHtml?.trim();
  const description = item.description?.trim();

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#1a1410]/55 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="achievement-modal-title"
      onClick={onClose}
    >
      <div
        className="relative flex max-h-[min(85vh,720px)] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-2xl"
        dir="rtl"
        lang="ar"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex shrink-0 items-start justify-between gap-4 border-b border-gray-100 px-6 py-5">
          <div className="min-w-0 flex-1">
            {item.index ? (
              <span
                className="mb-2 inline-flex h-10 min-w-10 items-center justify-center rounded-xl bg-[#897D56]/10 px-3 font-['Cairo',sans-serif] text-lg font-extrabold tabular-nums text-[#897D56]"
                aria-hidden
              >
                {formatCounter(item.index)}
              </span>
            ) : null}
            <h2 id="achievement-modal-title" className="text-xl font-bold leading-snug text-[#564636] md:text-2xl">
              {item.title}
            </h2>
          </div>
          <button
            type="button"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-gray-100 hover:text-[#564636]"
            aria-label="إغلاق"
            onClick={onClose}
          >
            <X size={22} strokeWidth={2} aria-hidden />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 py-5">
          {bodyHtml ? (
            <div
              className="iec-achievements-modal__body prose prose-sm prose-stone max-w-none text-gray-600 [&_a]:text-[#897D56] [&_p]:mb-3 [&_p:last-child]:mb-0 [&_ul]:my-2 [&_li]:my-0.5"
              dangerouslySetInnerHTML={{ __html: bodyHtml }}
            />
          ) : description ? (
            <p className="whitespace-pre-wrap text-base leading-relaxed text-gray-600">{description}</p>
          ) : (
            <p className="text-base leading-relaxed text-gray-500">لا توجد تفاصيل إضافية.</p>
          )}
        </div>

        {item.fileUrl ? (
          <div className="flex shrink-0 items-center justify-between gap-4 border-t border-gray-100 px-6 py-4">
            <div className="flex min-w-0 items-center gap-3">
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-500"
                aria-hidden
              >
                <FileText size={20} strokeWidth={2} />
              </div>
              <div className="min-w-0 flex flex-col text-start">
                <span className="text-sm font-medium text-gray-700">تقرير الإنجاز</span>
                <span className="text-xs text-gray-400">{item.pdfMeta}</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => void downloadPublicFile(item.fileUrl, item.downloadFilename)}
              className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full bg-[#897D56]/10 text-[#897D56] transition-colors hover:bg-[#897D56] hover:text-white"
              aria-label={`تحميل تقرير الإنجاز — ${item.title}`}
            >
              <Download size={18} strokeWidth={2} aria-hidden />
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function TimelineCard({ index, title, description, bodyHtml, fileUrl, downloadFilename, pdfMeta, onOpen }) {
  const hasDetail = Boolean(bodyHtml?.trim() || description?.trim());

  return (
    <div className="group relative" data-aos="fade-up">
      {/* <div
        className="absolute top-0 -right-[52px] z-10 h-5 w-5 rounded-full border-4 border-white bg-[#897D56] shadow-sm md:-right-[68px]"
        aria-hidden
      /> */}
      <div
        role={hasDetail ? 'button' : undefined}
        tabIndex={hasDetail ? 0 : undefined}
        onClick={hasDetail ? onOpen : undefined}
        onKeyDown={
          hasDetail
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onOpen();
                }
              }
            : undefined
        }
        className={`group rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-md ${
          hasDetail ? 'cursor-pointer hover:border-[#897D56]/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#897D56]/40' : ''
        }`}
      >
        <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
          <span className="inline-flex h-10 min-w-10 items-center justify-center rounded-xl bg-[#897D56]/10 px-3 font-['Cairo',sans-serif] text-lg font-extrabold tabular-nums text-[#897D56]">
            {formatCounter(index)}
          </span>
          {hasDetail ? (
            <span className="text-xs font-semibold text-[#897D56]/80">اضغط لعرض التفاصيل</span>
          ) : null}
        </div>
        <h3 className={`text-xl font-bold text-[#564636] ${hasDetail ? 'line-clamp-3' : ''}`}>{title}</h3>

        {/* PDF row — only shown if a file exists */}
        {fileUrl && (
          <div className={`flex items-center justify-between border-t border-gray-50 ${hasDetail ? 'mt-6' : 'mt-4'} pt-6`}>
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
              onClick={(e) => {
                e.stopPropagation();
                void downloadPublicFile(fileUrl, downloadFilename);
              }}
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-gray-50 text-gray-400 transition-all duration-300 group-hover:bg-[#897D56] group-hover:text-white"
              aria-label={`تحميل تقرير الإنجاز — ${title}`}
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
  const [items, setItems]         = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const nodes = await getNodes('club_achievements', ACHIEVEMENTS_FILE_FIELDS);
        if (cancelled) return;

        const transformed = nodes
          .filter((n) => n.attributes.status)
          .map(transformAchievement)
          .sort((a, b) => b.sortTime - a.sortTime);

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
      <header className=" mb-12 max-w-4xl text-start" dir="rtl" lang="ar" data-aos="fade-up">
        <h2 className="font-['Cairo',sans-serif] text-xl font-bold leading-relaxed text-[#564636] md:text-2xl">
          {ACHIEVEMENTS_INTRO_TITLE}
        </h2>
      </header>

      <div className="relative mx-auto max-w-4xl space-y-16 border-r-2 border-[#897D56]/20 pr-10 mr-4 md:pr-14">
        {items.map(({ sortTime: _st, ...card }, index) => (
          <TimelineCard
            key={card.id}
            {...card}
            index={index + 1}
            onOpen={() => setSelectedItem({ ...card, index: index + 1 })}
          />
        ))}
      </div>

      <AchievementDetailModal
        open={Boolean(selectedItem)}
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </div>
  );
}

export default AchievementsSection;