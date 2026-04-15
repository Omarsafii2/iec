import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Card from '../../components/ui/Card.jsx';
import { getNodes } from '../../services/api/drupalApi.js';
import { DRUPAL_BASE_URL } from '../../services/api/axios.config.js';

// ─── 1. Field config ──────────────────────────────────────────────────────────

const PROJECT_IMAGE_FIELDS = [
  {
    fieldName:        'field_media_image',
    mode:             'media',
    mediaSourceField: 'field_media_image',
  },
  {
    fieldName:        'field_icon',
    mode:             'media',
    mediaSourceField: 'field_media_image',
  },
];

// ─── 2. Transform ─────────────────────────────────────────────────────────────

const transformProject = (node) => {
  const attr = node.attributes;

  const imageMedia = node.field_media_image_resolved;
  const imageUri   = imageMedia?.file?.attributes?.uri?.url ?? null;
  const image      = imageUri ? `${DRUPAL_BASE_URL}${imageUri}` : null;

  const iconMedia  = node.field_icon_resolved;
  const iconUri    = iconMedia?.file?.attributes?.uri?.url ?? null;
  const iconUrl    = iconUri ? `${DRUPAL_BASE_URL}${iconUri}` : null;

  // summary: prefer body.summary, fall back to stripping body HTML
  const summary = attr.body?.summary
    || (attr.body?.processed ?? attr.body?.value ?? '')
        .replace(/<[^>]*>/g, '')
        .trim()
        .slice(0, 160)
    || '';

  return {
    id:      node.id,
    title:   attr.title ?? '',
    summary,
    image,
    imageAlt: attr.title ?? '',
    iconUrl,
    year:    attr.field_year ?? null,
    goals:   Array.isArray(attr.field_main_goals)
      ? attr.field_main_goals.map((g) => g.trim()).filter(Boolean)
      : [],
  };
};

// ─── 3. Skeleton ──────────────────────────────────────────────────────────────

function ProjectsSkeleton() {
  return (
    <section className="relative overflow-hidden bg-white py-24" dir="rtl">
      <div className="container mx-auto px-4">
        <div className="mb-16 space-y-3 animate-pulse">
          <div className="h-4 w-24 rounded bg-gray-200" />
          <div className="h-8 w-48 rounded bg-gray-200" />
          <div className="h-4 w-96 rounded bg-gray-100" />
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="animate-pulse overflow-hidden rounded-[2rem] bg-white shadow-lg">
              <div className="h-64 bg-gray-200" />
              <div className="p-6 space-y-3">
                <div className="h-5 w-3/4 rounded bg-gray-200" />
                <div className="h-4 w-full rounded bg-gray-100" />
                <div className="h-4 w-5/6 rounded bg-gray-100" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 4. Component ─────────────────────────────────────────────────────────────

export function ProjectsSection() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const nodes = await getNodes('our_projects_and_initiatives', PROJECT_IMAGE_FIELDS);
        if (cancelled) return;

        const transformed = nodes
          .filter((n) => n.attributes.status)
          .map(transformProject);

        setProjects(transformed);
      } catch (err) {
        if (!cancelled) {
          console.error('ProjectsSection: failed to load', err);
          setError(err);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => { cancelled = true; };
  }, []);

  if (loading) return <ProjectsSkeleton />;
  if (error || !projects.length) return null;

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
          {projects.map((item) => (
            <Card
              key={item.id}
              variant="project"
              to={`/projects/${item.id}`}
              title={item.title}
              description={item.summary}
              image={item.image}
              imageAlt={item.imageAlt}
              icon={
                item.iconUrl
                  ? <img src={item.iconUrl} alt="" className="size-6 object-contain" aria-hidden />
                  : null
              }
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

export default ProjectsSection;