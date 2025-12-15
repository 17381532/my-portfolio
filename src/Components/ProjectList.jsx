// src/components/ProjectList.jsx
import ProjectCard from './ProjectCard';
import './ProjectList.css';

export default function ProjectList({ projects, onUpdateProject, onDeleteProject }) {
  return (
    <div className="project-list">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          onEdit={(p) => onUpdateProject && onUpdateProject(p)}
          onDelete={() => onDeleteProject && onDeleteProject(project.id)}
        />
      ))}
    </div>
  );
}