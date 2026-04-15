import { useEffect, useState } from 'react';
import Card from '../../../../components/ui/Card.jsx';
import { getNodes } from '../../../../services/api/drupalApi.js';
import { DRUPAL_BASE_URL } from '../../../../services/api/axios.config.js';

// ─── 1. Field config ──────────────────────────────────────────────────────────

const GOALS_IMAGE_FIELDS = [
  {
    fieldName: 'field_icon',
    mode: 'media',
    mediaSourceField: 'field_media_image',
  },
];

// ─── 2. Transform ─────────────────────────────────────────────────────────────

const transformGoal = (node) => {
  const attr = node.attributes;

  // Icon image
  const media   = node.field_icon_resolved;
  const fileUri = media?.file?.attributes?.uri?.url ?? null;
  const iconUrl = fileUri ? `${DRUPAL_BASE_URL}${fileUri}` : null;

  // Description — strip HTML tags from body
  const bodyHtml    = attr.body?.processed ?? attr.body?.value ?? '';
  const description = bodyHtml.replace(/<[^>]*>/g, '').trim();

  return {
    id:          node.id,
    title:       attr.title ?? '',
    description,
    iconUrl,
  };
};

// ─── 3. Skeleton ──────────────────────────────────────────────────────────────

function GoalsSkeleton() {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="animate-pulse rounded-2xl bg-gray-100 p-6 space-y-4">
            <div className="h-10 w-10 rounded-lg bg-gray-200" />
            <div className="h-4 w-2/3 rounded bg-gray-200" />
            <div className="h-3 w-full rounded bg-gray-100" />
            <div className="h-3 w-4/5 rounded bg-gray-100" />
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── 4. Component ─────────────────────────────────────────────────────────────

export function ObjectivesSection() {
  const [goals, setGoals]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const nodes = await getNodes('club_goals', GOALS_IMAGE_FIELDS);
        if (cancelled) return;

        const transformed = nodes
          .filter((n) => n.attributes.status)
          .map(transformGoal);

        setGoals(transformed);
      } catch (err) {
        if (!cancelled) {
          console.error('ObjectivesSection: failed to load', err);
          setError(err);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => { cancelled = true; };
  }, []);

  if (loading) return <GoalsSkeleton />;
  if (error || !goals.length) return null;

  return (
    <div className="container mx-auto px-4 py-20">
      <div
        className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2"
        data-aos="fade-up"
      >
        {goals.map((goal) => (
          <Card
            key={goal.id}
            variant="objectives"
            icon={
              goal.iconUrl
                ? <img src={goal.iconUrl} alt="" className="size-8 object-contain" aria-hidden />
                : null
            }
            title={goal.title}
            description={goal.description}
          />
        ))}
      </div>
    </div>
  );
}

export default ObjectivesSection;