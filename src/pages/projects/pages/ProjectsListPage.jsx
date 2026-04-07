import { Link } from 'react-router-dom';
import { ArrowLeft, Users, ShoppingBag, Building, Target } from 'lucide-react';
import { InnerPageHero } from '../../../components/common/InnerPageHero.jsx';
import Card from '../../../components/ui/Card.jsx';
import { PROJECTS } from '../projectsData.js';

const ICON_BY_ID = {
  'alumni-connection': <Users className="size-6" strokeWidth={2} aria-hidden />,
  'club-shop': <ShoppingBag className="size-6" strokeWidth={2} aria-hidden />,
  'expansion-project': <Building className="size-6" strokeWidth={2} aria-hidden />,
  'club-strategy': <Target className="size-6" strokeWidth={2} aria-hidden />,
};

/** قائمة مشاريع النادي */
export default function ProjectsListPage() {
  return (
    <main className="iec-page iec-page--projects-list min-h-screen bg-gray-50 pt-[140px]">
      <InnerPageHero
        title="مشاريع النادي"
        breadcrumbs={[{ label: 'المشاريع' }]}
      />
      <div className="container mx-auto px-4 py-16">
        <div className="mb-10 flex justify-end">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#897D56] hover:text-[#564636]"
          >
            <span>العودة للرئيسية</span>
            <ArrowLeft className="size-4 rtl:rotate-180" strokeWidth={2} aria-hidden />
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
      </div>
    </main>
  );
}
