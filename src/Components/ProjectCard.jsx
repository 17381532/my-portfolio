// src/components/ProjectCard.jsx
import { useState } from 'react';
import './ProjectCard.css';
import ProjectForm from './ProjectForm';

export default function ProjectCard({ project, onEdit, onDelete }) {
  const [editing, setEditing] = useState(false);

  const handleSave = (updated) => {
    if (typeof onEdit === 'function') onEdit(updated);
    setEditing(false);
  };
  // Add to your ProjectCard component for extra interactivity
const handleCardClick = (e) => {
  const card = e.currentTarget;
  card.style.animation = 'clickPulse 0.3s ease';
  setTimeout(() => {
    card.style.animation = '';
  }, 300);
};

// Add this CSS for click animation
// @keyframes clickPulse {
  // 0% { transform: scale(1); }
  // 50% { transform: scale(0.98); }
  // 100% { transform: scale(1); }
// }

  return (
    <div className="project-card">
      {editing ? (
        <ProjectForm
          initialProject={project}
          onSave={handleSave}
          submitLabel="Save"
        />
      ) : (
        <>
          {project.imageUrl && (
            <img src={project.imageUrl} alt={project.title} />
          )}
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          {project.url && (
            <a href={project.url} target="_blank" rel="noopener noreferrer">
              View Project
            </a>
          )}
          <div className="card-actions">
            <button onClick={() => setEditing(true)}>Edit</button>
            <button onClick={() => onDelete && onDelete()} className="danger">Delete</button>
          </div>
        </>
      )}
    </div>
  );
}
