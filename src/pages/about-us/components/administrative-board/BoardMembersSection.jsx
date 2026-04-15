import { useEffect, useState } from 'react';
import Card from '../../../../components/ui/Card.jsx';
import { getNodes } from '../../../../services/api/drupalApi.js';
import { DRUPAL_BASE_URL } from '../../../../services/api/axios.config.js';

// ─── 1. Field config ──────────────────────────────────────────────────────────

const BOARD_IMAGE_FIELDS = [
  {
    fieldName: 'field_media_image',
    mode: 'media',
    mediaSourceField: 'field_media_image',
  },
];

// ─── 2. Transform ─────────────────────────────────────────────────────────────

const transformMember = (node) => {
  const attr = node.attributes;

  // Portrait
  const media    = node.field_media_image_resolved;
  const fileUri  = media?.file?.attributes?.uri?.url ?? null;
  const image    = fileUri ? `${DRUPAL_BASE_URL}${fileUri}` : null;

  // LinkedIn — Drupal stores it as { uri, title }
  const linkedin = attr.field_linkidin?.uri
    ? {
        href:  attr.field_linkidin.uri.replace('internal:', '') || '#',
        label: attr.field_linkidin.title || 'LinkedIn',
      }
    : null;

  return {
    id:       node.id,
    name:     attr.title          ?? '',
    position: attr.field_position ?? '',
    email:    attr.field_email    ?? '',
    image,
    linkedin,
  };
};

// ─── 3. Skeleton ──────────────────────────────────────────────────────────────

function BoardSkeleton() {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="animate-pulse rounded-2xl bg-gray-100 p-6 space-y-4">
            <div className="h-40 w-full rounded-xl bg-gray-200" />
            <div className="h-4 w-3/4 rounded bg-gray-200" />
            <div className="h-3 w-1/2 rounded bg-gray-100" />
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── 4. Component ─────────────────────────────────────────────────────────────

export function BoardMembersSection() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const nodes = await getNodes('members_of_the_board_of_director', BOARD_IMAGE_FIELDS);
        if (cancelled) return;

        const transformed = nodes
          .filter((n) => n.attributes.status)   // published only
          .map(transformMember);

        setMembers(transformed);
      } catch (err) {
        if (!cancelled) {
          console.error('BoardMembersSection: failed to load', err);
          setError(err);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => { cancelled = true; };
  }, []);

  if (loading) return <BoardSkeleton />;

  if (error || !members.length) return null;

  return (
    <div className="container mx-auto px-4 py-20">
      <div
        className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        data-aos="fade-up"
      >
        {members.map((member) => (
          <Card key={member.id} variant="board-members" {...member} />
        ))}
      </div>
    </div>
  );
}

export default BoardMembersSection;