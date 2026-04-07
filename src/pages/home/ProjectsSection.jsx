import { Link } from 'react-router-dom';
import { ArrowLeft, Users, ShoppingBag, Building, Target } from 'lucide-react';
import Card from '../../components/ui/Card.jsx';
import { PROJECTS } from '../projects/projectsData.js';

const ICON_BY_ID = {
  'alumni-connection': <Users className="size-6" strokeWidth={2} aria-hidden />,
  'club-shop': <ShoppingBag className="size-6" strokeWidth={2} aria-hidden />,
  'expansion-project': <Building className="size-6" strokeWidth={2} aria-hidden />,
  'club-strategy': <Target className="size-6" strokeWidth={2} aria-hidden />,
};

/** قسم المشاريع في الصفحة الرئيسية */
export function ProjectsSection() {
  return (
    <section
      className="relative overflow-hidden bg-white py-[96px] pt-[96px] pb-[96px]"
      dir="rtl"
      id="projects"
    >
      <div className="absolute start-0 top-0 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#897D56]/5 blur-3xl" />
      <div className="absolute end-0 bottom-0 h-[500px] w-[500px] translate-x-1/3 translate-y-1/3 rounded-full bg-[#564636]/5 blur-3xl" />

      <div className="relative z-10 container mx-auto px-4">
        <div className="mb-16 flex flex-col items-end justify-between gap-6 md:flex-row">
          <div className="max-w-2xl">
            <div className="mb-3 flex items-center gap-2">
              <span className="h-0.5 w-10 bg-[#897D56]" />
              <span className="text-sm font-medium tracking-wide text-[#897D56]">مبادراتنا</span>
            </div>
            <h2 className="mb-4 text-4xl font-bold leading-tight text-[#564636]">مشاريع النادي</h2>
            <p className="text-lg leading-relaxed text-gray-500">
              نطوّر مشاريع ريادية تخدم الأعضاء والمجتمع، من المنصات الرقمية إلى المرافق والمتاجر
              الخيرية، ضمن رؤية واضحة للنمو المستدام.
            </p>
          </div>

          <Link
            to="/projects"
            className="hidden h-12 items-center justify-center gap-2 rounded-full border border-[#897D56] bg-background px-8 text-base font-medium text-[#897D56] outline-none ring-offset-background transition-all hover:bg-[#897D56] hover:text-white focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:inline-flex"
          >
            <span>عرض المزيد</span>
            <ArrowLeft className="size-5" strokeWidth={2} aria-hidden />
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {PROJECTS.map((item) => (
            <Card
              key={item.id}
              variant="project"
              to={`/projects/${item.id}`}
              title={item.title}
              description={item.summary}
              image={item.image}
              imageAlt={item.imageAlt}
              icon={ICON_BY_ID[item.id]}
            />
          ))}
        </div>

        <div className="mt-12 flex justify-center md:hidden">
          <Link
            to="/projects"
            className="inline-flex h-14 w-full items-center justify-center rounded-xl border border-[#897D56] bg-background px-4 py-2 text-lg font-medium text-[#897D56] outline-none ring-offset-background transition-all hover:bg-[#897D56] hover:text-white focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            عرض المزيد
          </Link>
        </div>
      </div>
    </section>
  );
}
