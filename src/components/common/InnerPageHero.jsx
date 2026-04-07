import { Link } from 'react-router-dom';
import { House, ChevronLeft } from 'lucide-react';

/**
 * Inner-page hero band: dot grid, brand background, breadcrumb, title, accent rule.
 *
 * @param {object} props
 * @param {string} props.title - Page heading (H1).
 * @param {Array<{ label: string, href?: string }>} props.breadcrumbs - After home: use `href` for links; omit on the last item (current page). Items without `href` and not last render as plain text.
 * @param {string} [props.className] - Extra classes on the root `iec-inner-hero` block.
 */
export function InnerPageHero({ title, breadcrumbs = [], className = '' }) {
  return (
    <div className={`iec-inner-hero relative overflow-hidden bg-gray-900 py-24 text-white ${className}`.trim()}>
      <div className="iec-inner-hero__backdrop absolute inset-0 z-0 bg-[#564636]">
        <div className="iec-inner-hero__shade absolute inset-0 bg-black/20" aria-hidden />
        <div
          className="iec-inner-hero__pattern absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(white 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
          aria-hidden
        />
      </div>
      <div className="iec-inner-hero__container container relative z-10 mx-auto px-4">
        <div className="iec-inner-hero__content max-w-4xl" data-aos="fade-up">
          <nav
            className="iec-inner-hero__breadcrumb mb-6 flex flex-wrap items-center gap-2 text-sm text-gray-300"
            aria-label="مسار التنقل"
          >
            <Link
              className="iec-inner-hero__crumb-home flex items-center gap-1 transition-colors hover:text-[#897D56]"
              to="/"
            >
              <House size={14} strokeWidth={2} aria-hidden className="shrink-0" />
              الرئيسية
            </Link>
            {breadcrumbs.map((item, index) => {
              const isCurrent = index === breadcrumbs.length - 1;
              return (
                <div key={`${item.label}-${index}`} className="iec-inner-hero__crumb-step flex items-center gap-2">
                  <ChevronLeft
                    className="iec-inner-hero__crumb-sep shrink-0 text-gray-500 rtl:rotate-180"
                    size={14}
                    strokeWidth={2}
                    aria-hidden
                  />
                  {item.href ? (
                    <Link
                      className="iec-inner-hero__crumb-link transition-colors hover:text-[#897D56]"
                      to={item.href}
                    >
                      {item.label}
                    </Link>
                  ) : isCurrent ? (
                    <span className="iec-inner-hero__crumb-current font-medium text-[#897D56]">{item.label}</span>
                  ) : (
                    <span className="iec-inner-hero__crumb-text text-gray-300">{item.label}</span>
                  )}
                </div>
              );
            })}
          </nav>
          <h1 className="iec-inner-hero__title mb-4 text-4xl leading-tight font-bold text-white md:text-5xl">{title}</h1>
          <div className="iec-inner-hero__accent h-1.5 w-24 rounded-full bg-[#897D56]" aria-hidden />
        </div>
      </div>
    </div>
  );
}
