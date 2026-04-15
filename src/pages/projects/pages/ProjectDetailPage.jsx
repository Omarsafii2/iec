import { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { ProjectDetailContent } from '../components/ProjectDetailContent.jsx';
import { getNodeFull } from '../../../services/api/drupalApi.js';
import { DRUPAL_BASE_URL } from '../../../services/api/axios.config.js';

// ─── 1. Field config ──────────────────────────────────────────────────────────

const PROJECT_FIELDS = {
  imageFields: [
    { fieldName: 'field_media_image', mode: 'media', mediaSourceField: 'field_media_image' },
    { fieldName: 'field_icon',        mode: 'media', mediaSourceField: 'field_media_image' },
  ],
  taxonomyFields: [
    { fieldName: 'field_project_status' },  // resolved → term with attributes.name
  ],
  paragraphField:  null,   // no paragraphs on this node type
  paragraphFields: {},
};

// ─── 2. Transform ─────────────────────────────────────────────────────────────

const transformProjectDetail = (node) => {
  const attr = node.attributes;

  // Image
  const imageMedia = node.field_media_image_resolved;
  const imageUri   = imageMedia?.file?.attributes?.uri?.url ?? null;
  const image      = imageUri ? `${DRUPAL_BASE_URL}${imageUri}` : null;

  // Status from taxonomy term
  const statusTerm = node.field_project_status_resolved;
  const status     = statusTerm?.attributes?.name ?? '';

  // Parse body HTML into lead + body paragraphs
  const bodyHtml = attr.body?.processed ?? attr.body?.value ?? '';
  const doc      = new DOMParser().parseFromString(bodyHtml, 'text/html');
  const allParas = Array.from(doc.querySelectorAll('p'))
    .map((el) => el.textContent.trim())
    .filter(Boolean);

  const lead = allParas[0] ?? attr.body?.summary ?? '';
  const body = allParas.slice(1);   // remaining paragraphs

  // Objectives from field_main_goals (plain text array)
  const objectives = Array.isArray(attr.field_main_goals)
    ? attr.field_main_goals.map((g) => g.trim()).filter(Boolean)
    : [];

  return {
    id:        node.id,
    title:     attr.title    ?? '',
    image,
    imageAlt:  attr.title    ?? '',
    status,
    year:      attr.field_year ?? '',
    lead,
    body,
    objectives,
  };
};

// ─── 3. Skeleton ──────────────────────────────────────────────────────────────

function ProjectDetailSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 pb-20 pt-[140px]">
      <div className="container mx-auto px-4 animate-pulse">
        <div className="h-4 w-24 rounded bg-gray-200 mb-6" />
        <div className="overflow-hidden rounded-3xl bg-white shadow-xl">
          <div className="h-[400px] bg-gray-200" />
          <div className="p-12 space-y-4">
            <div className="h-6 w-2/3 rounded bg-gray-200" />
            <div className="h-4 w-full rounded bg-gray-100" />
            <div className="h-4 w-5/6 rounded bg-gray-100" />
            <div className="h-4 w-4/5 rounded bg-gray-100" />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── 4. Page ──────────────────────────────────────────────────────────────────

export default function ProjectDetailPage() {
  const { projectId } = useParams();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    if (!projectId) return;
    let cancelled = false;

    const load = async () => {
      try {
        const node = await getNodeFull(
          'our_projects_and_initiatives',
          projectId,
          PROJECT_FIELDS
        );
        if (cancelled) return;
        if (node) setProject(transformProjectDetail(node));
      } catch (err) {
        if (!cancelled) {
          console.error('ProjectDetailPage: failed to load', err);
          setError(err);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => { cancelled = true; };
  }, [projectId]);

  if (loading) return <ProjectDetailSkeleton />;
  if (error || !project) return <Navigate to="/projects" replace />;

  return (
    <main className="iec-page iec-page--project-detail">
      <ProjectDetailContent project={project} />
    </main>
  );
}