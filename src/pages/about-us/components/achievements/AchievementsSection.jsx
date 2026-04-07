import { FileText, Download } from 'lucide-react';
import { downloadPublicFile } from '../../../../lib/downloadPublicFile.js';
import { CLUB_ACHIEVEMENTS } from './achievementsData.js';

function TimelineCard({ year, title, description, pdfHref, downloadFilename, pdfMeta }) {
  return (
    <div className="group relative" data-aos="fade-up">
      <div className="absolute top-0 -right-[52px] z-10 h-5 w-5 rounded-full border-4 border-white bg-[#897D56] shadow-sm md:-right-[68px]" aria-hidden />
      <div className="group rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-shadow hover:shadow-md">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
          <span className="inline-block rounded-lg bg-[#897D56]/10 px-3 py-1 text-sm font-bold text-[#897D56]">
            {year}
          </span>
        </div>
        <h3 className="mb-2 text-xl font-bold text-[#564636]">{title}</h3>
        <p className="mb-6 text-gray-600">{description}</p>
        <div className="flex items-center justify-between border-t border-gray-50 pt-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50 text-red-500" aria-hidden>
              <FileText size={20} strokeWidth={2} />
            </div>
            <div className="flex flex-col text-start">
              <span className="text-sm font-medium text-gray-700">تقرير الإنجاز</span>
              <span className="text-xs text-gray-400">{pdfMeta}</span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => void downloadPublicFile(pdfHref, downloadFilename)}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-gray-50 text-gray-400 transition-all duration-300 group-hover:bg-[#897D56] group-hover:text-white"
            aria-label={`تحميل تقرير الإنجاز — ${year}`}
          >
            <Download size={18} strokeWidth={2} aria-hidden />
          </button>
        </div>
      </div>
    </div>
  );
}

/** خط زمني لإنجازات النادي مع تحميل PDF لكل بطاقة */
export function AchievementsSection({ items = CLUB_ACHIEVEMENTS }) {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="relative mx-auto max-w-4xl space-y-16 border-r-2 border-[#897D56]/20 pr-10 mr-4 md:pr-14">
        {items.map((item) => (
          <TimelineCard key={`${item.year}-${item.title}`} {...item} />
        ))}
      </div>
    </div>
  );
}
