import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play } from 'lucide-react';
import { VideoEmbedModal } from './VideoEmbedModal.jsx';

/** شريط العودة + شبكة الفيديوهات + نافذة التشغيل */
export function VideoAlbumDetailContent({ album }) {
  const [playerIndex, setPlayerIndex] = useState(null);
  const videos = album.videos || [];
  const open = playerIndex !== null;

  return (
    <div className="iec-video-album container mx-auto px-4 py-20">
      <div className="iec-video-album__toolbar mb-8 flex items-center gap-4" data-aos="fade-up">
        <Link
          to="/news/videos"
          className="iec-video-album__back flex h-10 w-10 shrink-0 rotate-180 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 transition-all hover:border-[#897D56] hover:bg-[#897D56] hover:text-white"
          aria-label="العودة إلى مكتبة الفيديو"
        >
          <ArrowRight size={20} strokeWidth={2} className="iec-video-album__back-icon rtl:rotate-180" />
        </Link>
        <div className="iec-video-album__meta">
          <h2 className="iec-video-album__title text-2xl font-bold text-[#564636]">{album.title}</h2>
          <p className="iec-video-album__summary mt-1 text-sm text-gray-500">
            {album.date} • {album.videoCount} فيديو
          </p>
        </div>
      </div>

      <div className="iec-video-album__grid grid gap-8 md:grid-cols-2 lg:grid-cols-3" data-aos="fade-up">
        {videos.map((video, i) => (
          <button
            key={video.id || `video-${i}`}
            type="button"
            className="iec-video-album__card group cursor-pointer border-0 bg-transparent p-0 text-start outline-none focus-visible:ring-2 focus-visible:ring-[#897D56] focus-visible:ring-offset-2"
            onClick={() => setPlayerIndex(i)}
          >
            <div className="iec-video-album__thumb relative mb-4 h-56 overflow-hidden rounded-2xl shadow-sm transition-all duration-300 group-hover:shadow-lg">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="iec-video-album__thumb-img size-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="iec-video-album__thumb-overlay absolute inset-0 flex items-center justify-center bg-black/30 transition-colors duration-300 group-hover:bg-black/50">
                <div className="iec-video-album__play flex h-14 w-14 items-center justify-center rounded-full border-2 border-white/50 bg-white/20 pl-1 text-white backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                  <Play size={24} strokeWidth={2} fill="white" className="iec-video-album__play-icon text-white" aria-hidden />
                </div>
              </div>
              <div className="iec-video-album__duration absolute bottom-4 end-4 rounded-lg bg-black/60 px-2 py-1 text-xs text-white backdrop-blur-sm">
                {video.duration}
              </div>
            </div>
            <h3 className="iec-video-album__card-title mb-1 text-lg leading-tight font-bold text-gray-800 transition-colors group-hover:text-[#897D56]">
              {video.title}
            </h3>
            <p className="iec-video-album__card-date text-sm text-gray-500">{video.date}</p>
          </button>
        ))}
      </div>

      <VideoEmbedModal
        open={open}
        videos={videos}
        index={playerIndex}
        onClose={() => setPlayerIndex(null)}
        onSelectIndex={setPlayerIndex}
      />
    </div>
  );
}
