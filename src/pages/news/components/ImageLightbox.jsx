import { useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const navBtnClass =
  'pointer-events-auto flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-white shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-black/60 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 md:opacity-0 md:group-hover:opacity-100';

/**
 * @param {object} props
 * @param {boolean} props.open
 * @param {Array<{ src: string, alt?: string }>} props.images
 * @param {number | null} props.index
 * @param {() => void} props.onClose
 * @param {(i: number) => void} props.onSelectIndex
 */
export function ImageLightbox({ open, images = [], index, onClose, onSelectIndex }) {
  const goPrev = useCallback(() => {
    if (index === null || !images.length) return;
    onSelectIndex(index <= 0 ? images.length - 1 : index - 1);
  }, [images.length, index, onSelectIndex]);

  const goNext = useCallback(() => {
    if (index === null || !images.length) return;
    onSelectIndex(index >= images.length - 1 ? 0 : index + 1);
  }, [images.length, index, onSelectIndex]);

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

  if (!open || index === null || !images[index]) return null;

  const item = images[index];

  return (
    <div
      className="iec-image-lightbox group fixed inset-0 z-[100] flex flex-row-reverse items-center justify-center bg-black/90 p-4 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-label="معاينة الصورة"
      onClick={onClose}
    >
      <button
        type="button"
        className="iec-image-lightbox__close absolute start-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/45 text-white shadow-md backdrop-blur-sm transition-colors hover:bg-black/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/35"
        aria-label="إغلاق"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
      >
        <X size={22} strokeWidth={2} aria-hidden />
      </button>

      {images.length > 1 ? (
        <div className="iec-image-lightbox__nav dir-ltr" onClick={(e) => e.stopPropagation()}>
          <button
            type="button"
            className={`iec-image-lightbox__nav-btn iec-image-lightbox__nav-btn--prev absolute start-4 top-1/2 z-10 ${navBtnClass}`}
            aria-label="الصورة السابقة"
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
          >
            <ChevronRight className="rtl:rotate-180" size={24} strokeWidth={2} aria-hidden />
          </button>
          <button
            type="button"
            className={`iec-image-lightbox__nav-btn iec-image-lightbox__nav-btn--next absolute end-4 top-1/2 z-10 ${navBtnClass}`}
            aria-label="الصورة التالية"
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
        className="iec-image-lightbox__stage relative max-h-[calc(100vh-2rem)] max-w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={item.src}
          alt={item.alt || ''}
          className="iec-image-lightbox__img max-h-[calc(100vh-2rem)] max-w-full rounded-xl object-contain shadow-2xl ring-1 ring-white/10"
        />
      </div>
    </div>
  );
}
