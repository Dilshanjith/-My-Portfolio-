import React from 'react';
import './Projects.css';
import { usePortfolio } from '../context/PortfolioContext';

const Projects = () => {
    const { data } = usePortfolio();

    return (
        <section className="section" id="projects">
            <div className="container">
                <h2 className="title">Future-Proof Projects</h2>
                <p className="subtitle">
                    Ideally built with scalability in mind. Each project entry documents the "Why" and "How".
                </p>
                <div className="projects-grid">
                    {data.projects.map((project, index) => (
                        <div className="card project-card" key={index}>
                            <h3 className="project-title">{project.title}</h3>
                            <p className="project-desc">{project.description}</p>
                            <div className="tech-tags">
                                {project.tech && project.tech.map(t => (
                                    <span key={t} className="tech-tag">{t}</span>
                                ))}
                            </div>
                            <div className="project-links">
                                <a href={project.link} className="btn-link">View Project →</a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
