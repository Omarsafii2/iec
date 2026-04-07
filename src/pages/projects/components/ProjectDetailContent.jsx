import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, CircleCheck } from 'lucide-react';

/** تفاصيل مشروع — نفس أسلوب التصميم المطلوب */
export function ProjectDetailContent({ project }) {
  return (
    <div className="iec-project-detail min-h-screen bg-gray-50 pb-20 pt-[140px]">
      <div className="iec-project-detail__container container mx-auto px-4">
        <Link
          to="/projects"
          className="iec-project-detail__back mb-6 inline-flex items-center text-gray-500 transition-colors hover:text-[#897D56]"
        >
          <ArrowRight className="iec-project-detail__back-icon ms-2 size-5 rtl:rotate-180" strokeWidth={2} aria-hidden />
          عودة للمشاريع
        </Link>

        <div className="iec-project-detail__card overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-xl">
          <div className="iec-project-detail__hero relative h-[400px] md:h-[500px]">
            <img
              src={project.image}
              alt={project.imageAlt || project.title}
              className="iec-project-detail__hero-img size-full object-cover"
            />
            <div className="iec-project-detail__hero-overlay absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="iec-project-detail__hero-text absolute inset-x-0 bottom-0 max-w-4xl p-8 text-white md:p-12">
              <div className="iec-project-detail__badges mb-4 flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-[#897D56] px-4 py-1.5 text-sm font-bold">{project.status}</span>
                <span className="inline-flex items-center gap-1 rounded-full bg-white/20 px-4 py-1.5 text-sm font-medium backdrop-blur-md">
                  <Calendar size={14} strokeWidth={2} aria-hidden />
                  {project.year}
                </span>
              </div>
              <h1 className="iec-project-detail__title text-4xl font-bold leading-tight md:text-5xl">
                {project.title}
              </h1>
            </div>
          </div>

          <div className="iec-project-detail__grid grid gap-12 p-8 md:grid-cols-12 md:p-12">
            <div className="iec-project-detail__main md:col-span-8">
              <h2 className="iec-project-detail__section-title mb-6 border-e-4 border-[#897D56] pe-4 text-2xl font-bold text-[#564636]">
                تفاصيل المشروع
              </h2>
              <div className="iec-project-detail__body max-w-none leading-relaxed text-gray-600">
                <p className="iec-project-detail__lead mb-6 text-xl font-medium text-gray-800">{project.lead}</p>
                {project.body.map((para, i) => (
                  <p key={i} className="iec-project-detail__para mb-4 last:mb-0">
                    {para}
                  </p>
                ))}
                <h3 className="iec-project-detail__objectives-title mb-4 mt-8 text-xl font-bold text-[#564636]">
                  الأهداف الرئيسية
                </h3>
                <ul className="iec-project-detail__objectives-list list-none space-y-3 pe-0">
                  {project.objectives.map((item, i) => (
                    <li key={i} className="iec-project-detail__objective flex items-center gap-3">
                      <CircleCheck className="size-5 shrink-0 text-[#897D56]" strokeWidth={2} aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="iec-project-detail__aside md:col-span-4">
              <div className="iec-project-detail__cta-card relative overflow-hidden rounded-2xl bg-[#564636] p-8 text-center text-white">
                <div className="relative z-10">
                  <h3 className="iec-project-detail__cta-title mb-2 text-2xl font-bold">كن شريكاً في النجاح</h3>
                  <p className="iec-project-detail__cta-text mb-6 text-white/80">
                    ساهم معنا في دعم هذا المشروع وتحقيق أهدافه النبيلة.
                  </p>
                  <a
                    href={`mailto:info@iec-alumni.jo?subject=${encodeURIComponent(`دعم مشروع — ${project.title}`)}`}
                    className="iec-project-detail__cta-btn inline-flex h-10 w-full items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-bold text-[#564636] transition-colors hover:bg-gray-100"
                  >
                    تواصل معنا للدعم
                  </a>
                </div>
                <div
                  className="pointer-events-none absolute start-0 top-0 size-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5 blur-2xl"
                  aria-hidden
                />
                <div
                  className="pointer-events-none absolute bottom-0 end-0 size-32 translate-x-1/2 translate-y-1/2 rounded-full bg-[#897D56]/20 blur-2xl"
                  aria-hidden
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
