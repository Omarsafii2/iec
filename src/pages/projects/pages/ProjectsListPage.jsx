import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { InnerPageHero } from '../../../components/common/InnerPageHero.jsx';
import Card from '../../../components/ui/Card.jsx';
import { getNodes } from '../../../services/api/drupalApi.js';
import { DRUPAL_BASE_URL } from '../../../services/api/axios.config.js';

// ─── 1. Field config ──────────────────────────────────────────────────────────

const PROJECT_IMAGE_FIELDS = [
  { fieldName: 'field_media_image', mode: 'media', mediaSourceField: 'field_media_image' },
  { fieldName: 'field_icon',        mode: 'media', mediaSourceField: 'field_media_image' },
];

// ─── 2. Transform ─────────────────────────────────────────────────────────────

const transformProject = (node) => {
  const attr = node.attributes;

  const imageMedia = node.field_media_image_resolved;
  const imageUri   = imageMedia?.file?.attributes?.uri?.url ?? null;
  const image      = imageUri ? `${DRUPAL_BASE_URL}${imageUri}` : null;

  const iconMedia = node.field_icon_resolved;
  const iconUri   = iconMedia?.file?.attributes?.uri?.url ?? null;
  const iconUrl   = iconUri ? `${DRUPAL_BASE_URL}${iconUri}` : null;

  const summary = attr.body?.summary
    || (attr.body?.processed ?? attr.body?.value ?? '')
        .replace(/<[^>]*>/g, '')
        .trim()
        .slice(0, 160)
    || '';

  return {
    id:       node.id,
    title:    attr.title ?? '',
    summary,
    image,
    imageAlt: attr.title ?? '',
    iconUrl,
  };
};

// ─── 3. Skeleton ──────────────────────────────────────────────────────────────

function ProjectsListSkeleton() {
  return (
    <div className="container mx-auto px-4 py-16">
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
  );
}

// ─── 4. Page ──────────────────────────────────────────────────────────────────

export default function ProjectsListPage() {
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
          console.error('ProjectsListPage: failed to load', err);
          setError(err);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => { cancelled = true; };
  }, []);

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

        {loading && <ProjectsListSkeleton />}

        {!loading && !error && projects.length > 0 && (
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
        )}
      </div>
    </main>
  );
}