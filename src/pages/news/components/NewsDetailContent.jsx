import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Printer, Share2 } from 'lucide-react';

const articleBodyClass =
  'max-w-none text-lg leading-relaxed [&_h3]:mt-8 [&_h3]:mb-4 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-[#564636] [&_p]:mb-4 [&_p]:text-gray-600 [&_ul]:my-4 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pe-6 [&_li]:text-gray-600 [&_strong]:font-bold [&_strong]:text-[#564636]';

/** صفحة تفاصيل الخبر (محتوى المقال) */
export function NewsDetailContent({
  article,
  backTo = '/news/news',
  backLabel = 'العودة للأخبار',
}) {
  const handleShare = useCallback(async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: article.title, url });
      } else if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
      }
    } catch {
      /* dismissed or unsupported */
    }
  }, [article.title]);

  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  return (
    <div className="iec-news-detail container mx-auto px-4 py-20">
      <div className="iec-news-detail__inner mx-auto max-w-4xl" data-aos="fade-up">
        <Link
          to={backTo}
          className="iec-news-detail__back w-fit mb-6 flex h-10 items-center gap-2 px-2 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-100 hover:text-[#564636] print:hidden"
        >
          <ArrowRight size={18} strokeWidth={2} className="iec-news-detail__back-icon w-min-content" aria-hidden />
          {backLabel}
        </Link>

        <article className="iec-news-detail__article overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
          <div className="iec-news-detail__hero relative h-64 w-full md:h-96">
            <img
              src={article.image}
              alt={article.imageAlt || article.title}
              className="iec-news-detail__hero-img size-full object-cover"
            />
            <div className="iec-news-detail__hero-overlay absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/60 to-transparent p-8 md:p-12">
              <div className="iec-news-detail__hero-meta mb-3 flex flex-wrap items-center gap-3 text-sm font-medium text-white/90">
                <span className="iec-news-detail__category rounded-full bg-[#897D56] px-3 py-1">{article.category}</span>
                <span className="iec-news-detail__hero-date flex items-center gap-1">
                  <Calendar size={14} strokeWidth={2} aria-hidden />
                  {article.date}
                </span>
              </div>
              <h1 className="iec-news-detail__headline text-2xl leading-tight font-bold text-white md:text-4xl">
                {article.title}
              </h1>
            </div>
          </div>

          <div className="iec-news-detail__body p-8 md:p-12">
            <div className="iec-news-detail__meta-row mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 pb-6 print:hidden">
              <div className="iec-news-detail__published text-sm text-gray-500">نشر في: {article.date}</div>
              <div className="iec-news-detail__actions flex gap-2">
                <button
                  type="button"
                  className="iec-news-detail__action iec-news-detail__action--share inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 transition-colors hover:text-[#897D56]"
                  aria-label="مشاركة"
                  onClick={handleShare}
                >
                  <Share2 size={18} strokeWidth={2} aria-hidden />
                </button>
                <button
                  type="button"
                  className="iec-news-detail__action iec-news-detail__action--print inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 transition-colors hover:text-[#897D56]"
                  aria-label="طباعة"
                  onClick={handlePrint}
                >
                  <Printer size={18} strokeWidth={2} aria-hidden />
                </button>
              </div>
            </div>

            <div
              className={`iec-news-detail__content ${articleBodyClass}`}
              dangerouslySetInnerHTML={{ __html: article.bodyHtml }}
            />
          </div>
        </article>
      </div>
    </div>
  );
}
