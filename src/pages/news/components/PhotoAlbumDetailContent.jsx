import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ImageLightbox } from './ImageLightbox.jsx';

/** شريط العودة + الشبكة + اللايتبوكس */
export function PhotoAlbumDetailContent({ album }) {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const images = album.images || [];
  const open = lightboxIndex !== null;

  return (
    <div className="iec-photo-album container mx-auto px-4 py-20">
      <div className="iec-photo-album__toolbar mb-8 flex items-center gap-4" data-aos="fade-up">
        <Link
          to="/news/photos"
          className="iec-photo-album__back flex rotate-180 h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 transition-all hover:border-[#897D56] hover:bg-[#897D56] hover:text-white"
          aria-label="العودة إلى أرشيف الصور"
        >
          <ArrowRight size={20} strokeWidth={2} className="iec-photo-album__back-icon rtl:rotate-180" />
        </Link>
        <div className="iec-photo-album__meta">
          <h2 className="iec-photo-album__title text-2xl font-bold text-[#564636]">{album.title}</h2>
          <p className="iec-photo-album__summary mt-1 text-sm text-gray-500">
            {album.date} • {album.photoCount} صورة
          </p>
        </div>
      </div>

      <div
        className="iec-photo-album__grid grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4"
        data-aos="fade-up"
      >
        {images.map((img, i) => (
          <button
            key={`${img.src}-${i}`}
            type="button"
            className="iec-photo-album__thumb group relative aspect-square cursor-pointer overflow-hidden rounded-xl border-0 bg-transparent p-0 text-start outline-none focus-visible:ring-2 focus-visible:ring-[#897D56] focus-visible:ring-offset-2"
            onClick={() => setLightboxIndex(i)}
          >
            <img
              src={img.src}
              alt={img.alt || `${album.title} ${i + 1}`}
              className="iec-photo-album__thumb-img size-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div
              className="iec-photo-album__thumb-overlay pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20"
              aria-hidden
            />
          </button>
        ))}
      </div>

      <ImageLightbox
        open={open}
        images={images}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onSelectIndex={setLightboxIndex}
      />
    </div>
  );
}
