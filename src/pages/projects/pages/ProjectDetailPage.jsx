import { Navigate, useParams } from 'react-router-dom';
import { getProjectById } from '../projectsData.js';
import { ProjectDetailContent } from '../components/ProjectDetailContent.jsx';

export default function ProjectDetailPage() {
  const { projectId } = useParams();
  const project = projectId ? getProjectById(projectId) : undefined;

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  return (
    <main className="iec-page iec-page--project-detail">
      <ProjectDetailContent project={project} />
    </main>
  );
}
