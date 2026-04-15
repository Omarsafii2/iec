import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, X } from 'lucide-react';

// ─── Auto-thumbnail hook ──────────────────────────────────────────────────────
// Loads the video, seeks to 1s, captures a frame via canvas → data URL

function useVideoThumbnail(src) {
  const [thumb, setThumb] = useState(null);

  useEffect(() => {
    if (!src) return;

    const video   = document.createElement('video');
    video.src     = src;
    video.crossOrigin = 'anonymous';
    video.muted   = true;
    video.preload = 'metadata';

    const capture = () => {
      video.currentTime = 1; // seek to 1 second
    };

    const draw = () => {
      try {
        const canvas  = document.createElement('canvas');
        canvas.width  = video.videoWidth  || 320;
        canvas.height = video.videoHeight || 180;
        canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
        setThumb(canvas.toDataURL('image/jpeg', 0.8));
      } catch {
        // CORS or other issue — leave thumb as null
      }
      video.src = ''; // free memory
    };

    video.addEventListener('loadedmetadata', capture);
    video.addEventListener('seeked', draw);
    video.load();

    return () => {
      video.removeEventListener('loadedmetadata', capture);
      video.removeEventListener('seeked', draw);
      video.src = '';
    };
  }, [src]);

  return thumb;
}

// ─── Single video card with auto-thumbnail ────────────────────────────────────

function VideoCard({ video, index, onClick }) {
  const thumbnail = useVideoThumbnail(video.src);

  return (
    <button
      type="button"
      className="group cursor-pointer border-0 bg-transparent p-0 text-start outline-none focus-visible:ring-2 focus-visible:ring-[#897D56] focus-visible:ring-offset-2"
      onClick={onClick}
    >
      <div className="relative mb-4 h-56 overflow-hidden rounded-2xl bg-gray-200 shadow-sm transition-all duration-300 group-hover:shadow-lg">
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={video.title || `فيديو ${index + 1}`}
            className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          // Fallback while thumbnail is generating
          <div className="size-full animate-pulse bg-gray-300" />
        )}
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition-colors duration-300 group-hover:bg-black/50">
          <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-white/50 bg-white/20 pl-1 text-white backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
            <Play size={24} strokeWidth={2} fill="white" aria-hidden />
          </div>
        </div>
      </div>
      <h3 className="mb-1 text-lg leading-tight font-bold text-gray-800 transition-colors group-hover:text-[#897D56]">
        {video.title}
      </h3>
    </button>
  );
}

// ─── Video Player Modal ───────────────────────────────────────────────────────

function VideoPlayerModal({ open, videos = [], index, onClose }) {
  if (!open || index === null || !videos[index]) return null;
  const item = videos[index];

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <button
        type="button"
        className="absolute start-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/45 text-white shadow-md backdrop-blur-sm transition-colors hover:bg-black/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/35"
        aria-label="إغلاق"
        onClick={(e) => { e.stopPropagation(); onClose(); }}
      >
        <X size={22} strokeWidth={2} aria-hidden />
      </button>

      <div className="relative w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
        <video
          key={item.src}
          src={item.src}
          controls
          autoPlay
          className="w-full rounded-xl shadow-2xl ring-1 ring-white/10"
        />
        {item.title && (
          <p className="mt-4 text-center text-sm font-medium text-white/90">{item.title}</p>
        )}
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function VideoAlbumDetailContent({ album }) {
  const [playerIndex, setPlayerIndex] = useState(null);
  const videos = album.videos || [];

  return (
    <div className="iec-video-album container mx-auto px-4 py-20">

      <div className="mb-8 flex items-center gap-4" data-aos="fade-up">
        <Link
          to="/news/videos"
          className="flex h-10 w-10 shrink-0 rotate-180 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 transition-all hover:border-[#897D56] hover:bg-[#897D56] hover:text-white"
          aria-label="العودة إلى مكتبة الفيديو"
        >
          <ArrowRight size={20} strokeWidth={2} className="rtl:rotate-180" />
        </Link>
        <div>
          <h2 className="text-2xl font-bold text-[#564636]">{album.title}</h2>
          <p className="mt-1 text-sm text-gray-500">
            {album.date} • {album.videoCount} فيديو
          </p>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3" data-aos="fade-up">
        {videos.map((video, i) => (
          <VideoCard
            key={video.id || `video-${i}`}
            video={video}
            index={i}
            onClick={() => setPlayerIndex(i)}
          />
        ))}
      </div>

      <VideoPlayerModal
        open={playerIndex !== null}
        videos={videos}
        index={playerIndex}
        onClose={() => setPlayerIndex(null)}
      />
    </div>
  );
}

export default VideoAlbumDetailContent;