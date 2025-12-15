// src/App.jsx
import { useState, useEffect } from 'react';
import Header from './Components/Header';
import ProjectList from './Components/ProjectList';
import ProjectForm from './Components/ProjectForm';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import { mockProjects } from './assets/Data/mockProjects';

function App() {
  const [projects, setProjects] = useState([]);

  const handleUpdateProject = (updated) => {
    setProjects((prev) => prev.map((p) => (p.id === updated.id ? { ...p, ...updated } : p)));
  };

  const handleDeleteProject = (id) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  useEffect(() => {
    // ... (your existing useEffect to fetch projects)
  }, []);

  const STORAGE_KEY = 'my_portfolio_projects_v1';

  // load from localStorage, fallback to mock data
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        setProjects(JSON.parse(raw));
        return;
      }
    } catch (e) {
      console.warn('Could not read projects from localStorage', e);
    }

    // fallback seed from mockProjects if available
    if (Array.isArray(mockProjects) && mockProjects.length) {
      setProjects(mockProjects);
    }
  }, []);

  // persist projects to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    } catch (e) {
      console.warn('Could not write projects to localStorage', e);
    }
  }, [projects]);

  return (
    <div className="App">
      <Header />

      <Routes>
        <Route
          path="/"
          element={
            <main id="home" className="fade-in">
              <h1>Welcome to My Portfolio</h1>
              <p>I'm a passionate developer creating amazing digital experiences</p>
            </main>
          }
        />
        <Route
          path="/about"
          element={
            <section id="about" className="container fade-in">
              <h2>About Me</h2>
              <p>This is where you can write a little about yourself. Share your journey, skills, and what drives you as a developer.</p>
            </section>
          }
        />
        <Route
          path="/projects"
          element={
            <section id="projects" className="container fade-in">
              <h2>My Projects</h2>
              <ProjectForm onAddProject={(proj) => setProjects((p) => [proj, ...p])} />
              <ProjectList projects={projects} onUpdateProject={handleUpdateProject} onDeleteProject={handleDeleteProject} />
            </section>
          }
        />
        <Route
          path="/contact"
          element={
            <section id="contact" className="container fade-in">
              <h2>Contact</h2>
              <p>Feel free to reach out to me through any of these platforms:</p>
              
              <div className="contact-container">
                <div className="contact-buttons">
                  <a 
                    href="https://www.instagram.com/ingakubalo" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="contact-button instagram-button"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.405a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z"/>
                    </svg>
                    Instagram
                  </a>
                  
                  <a 
                    href="https://www.facebook.com/ingakubalo" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="contact-button facebook-button"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    Facebook
                  </a>
                  
                  <a 
                    href="mailto:ingakubalo95@gmail.com" 
                    className="contact-button email-button"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                    Email
                  </a>
                  
                  <a 
                    href="https://www.linkedin.com/in/ingakubalo" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="contact-button linkedin-button"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    LinkedIn
                  </a>
                </div>
              </div>
            </section>
          }
        />
      </Routes>
    </div>
  );
}

export default App;