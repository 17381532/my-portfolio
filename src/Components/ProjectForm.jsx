import React, { useState } from "react";
import "./ProjectForm.css";

export default function ProjectForm({ onAddProject, initialProject = null, onSave, submitLabel = "Add Project" }) {
	const [title, setTitle] = useState(initialProject ? initialProject.title : "");
	const [description, setDescription] = useState(initialProject ? initialProject.description : "");
	const [tech, setTech] = useState(initialProject ? (Array.isArray(initialProject.tech) ? initialProject.tech.join(', ') : (initialProject.tech || '')) : "");
	const [url, setUrl] = useState(initialProject ? (initialProject.url || '') : "");
	const [errors, setErrors] = useState({});

	const validate = () => {
		const e = {};
		if (!title.trim()) e.title = "Please enter a project title.";
		if (!description.trim()) e.description = "Please enter a short description.";
		if (url.trim() && !/^https?:\/\//i.test(url.trim())) e.url = "URL should start with http:// or https://";
		return e;
	};

	const handleSubmit = (ev) => {
		ev.preventDefault();
		const e = validate();
		if (Object.keys(e).length) {
			setErrors(e);
			return;
		}


		const project = {
			id: initialProject ? initialProject.id : Date.now(),
			title: title.trim(),
			description: description.trim(),
			tech: tech
				.split(",")
				.map((t) => t.trim())
				.filter(Boolean),
			url: url.trim() || null,
			createdAt: initialProject ? initialProject.createdAt : new Date().toISOString(),
		};

		if (initialProject && typeof onSave === "function") {
			onSave(project);
		} else if (typeof onAddProject === "function") {
			onAddProject(project);
		}

		// reset form
		if (!initialProject) {
			setTitle("");
			setDescription("");
			setTech("");
			setUrl("");
		}
		setErrors({});
	};

	return (
		<form className="project-form" onSubmit={handleSubmit} noValidate>
			<div>
				<label htmlFor="proj-title">Title *</label>
				<input
					id="proj-title"
					name="title"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					aria-invalid={errors.title ? "true" : "false"}
				/>
				{errors.title && <div className="error">{errors.title}</div>}
			</div>

			<div>
				<label htmlFor="proj-desc">Description *</label>
				<textarea
					id="proj-desc"
					name="description"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					rows={4}
					aria-invalid={errors.description ? "true" : "false"}
				/>
				{errors.description && <div className="error">{errors.description}</div>}
			</div>

			<div>
				<label htmlFor="proj-tech">Tech (comma separated)</label>
				<input
					id="proj-tech"
					name="tech"
					value={tech}
					onChange={(e) => setTech(e.target.value)}
					placeholder="React, Node, Tailwind"
				/>
			</div>

			<div>
				<label htmlFor="proj-url">Project URL</label>
				<input
					id="proj-url"
					name="url"
					value={url}
					onChange={(e) => setUrl(e.target.value)}
					placeholder="https://..."
					aria-invalid={errors.url ? "true" : "false"}
				/>
				{errors.url && <div className="error">{errors.url}</div>}
			</div>

			<div>
				<button type="submit">{submitLabel}</button>
			</div>
		</form>
	);
}
