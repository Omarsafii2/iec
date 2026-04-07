import { useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const navBtnClass =
  'pointer-events-auto flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-white shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-black/60 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 md:opacity-0 md:group-hover:opacity-100';

/**
 * @param {object} props
 * @param {boolean} props.open
 * @param {Array<{ embedUrl: string, title?: string }>} props.videos
 * @param {number | null} props.index
 * @param {() => void} props.onClose
 * @param {(i: number) => void} props.onSelectIndex
 */
export function VideoEmbedModal({ open, videos = [], index, onClose, onSelectIndex }) {
  const goPrev = useCallback(() => {
    if (index === null || !videos.length) return;
    onSelectIndex(index <= 0 ? videos.length - 1 : index - 1);
  }, [videos.length, index, onSelectIndex]);

  const goNext = useCallback(() => {
    if (index === null || !videos.length) return;
    onSelectIndex(index >= videos.length - 1 ? 0 : index + 1);
  }, [videos.length, index, onSelectIndex]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') goPrev();
      if (e.key === 'ArrowLeft') goNext();
    };
    window.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose, goPrev, goNext]);

  if (!open || index === null || !videos[index]) return null;

  const item = videos[index];
  const embedSrc = item.embedUrl.includes('?') ? `${item.embedUrl}&rel=0` : `${item.embedUrl}?rel=0`;

  return (
    <div
      className="iec-video-embed-modal group fixed inset-0 z-[100] flex flex-row-reverse items-center justify-center bg-black/90 p-4 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-label={item.title ? `تشغيل: ${item.title}` : 'مشغل الفيديو'}
      onClick={onClose}
    >
      <button
        type="button"
        className="iec-video-embed-modal__close absolute start-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/45 text-white shadow-md backdrop-blur-sm transition-colors hover:bg-black/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/35"
        aria-label="إغلاق"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
      >
        <X size={22} strokeWidth={2} aria-hidden />
      </button>

      {videos.length > 1 ? (
        <div className="iec-video-embed-modal__nav dir-ltr" onClick={(e) => e.stopPropagation()}>
          <button
            type="button"
            className={`iec-video-embed-modal__nav-btn iec-video-embed-modal__nav-btn--prev absolute start-4 top-1/2 z-10 ${navBtnClass}`}
            aria-label="الفيديو السابق"
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
          >
            <ChevronRight className="rtl:rotate-180" size={24} strokeWidth={2} aria-hidden />
          </button>
          <button
            type="button"
            className={`iec-video-embed-modal__nav-btn iec-video-embed-modal__nav-btn--next absolute end-4 top-1/2 z-10 ${navBtnClass}`}
            aria-label="الفيديو التالي"
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
          >
            <ChevronLeft className="rtl:rotate-180" size={24} strokeWidth={2} aria-hidden />
          </button>
        </div>
      ) : null}

      <div
        className="iec-video-embed-modal__body relative w-full max-w-5xl px-2"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="iec-video-embed-modal__frame-wrap overflow-hidden rounded-xl shadow-2xl ring-1 ring-white/10">
          <div className="iec-video-embed-modal__aspect relative aspect-video w-full bg-black">
            <iframe
              key={embedSrc}
              title={item.title || 'فيديو'}
              src={embedSrc}
              className="iec-video-embed-modal__iframe absolute inset-0 size-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
        {item.title ? (
          <p className="iec-video-embed-modal__caption mt-4 text-center text-sm font-medium text-white/90">
            {item.title}
          </p>
        ) : null}
      </div>
    </div>
  );
}
