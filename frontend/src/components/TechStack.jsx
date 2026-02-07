import React from 'react';
import './TechStack.css';
import { usePortfolio } from '../context/PortfolioContext';

const TechStack = () => {
    const { data } = usePortfolio();
    return (
        <section className="section" id="skills">
            <div className="container">
                <h2 className="title">My Tech Stack & Skills</h2>
                <div className="skills-grid">
                    {Object.entries(data.techStack).map(([category, skills]) => (
                        <div className="card skill-card" key={category}>
                            <h3 className="skill-category">{category.toUpperCase()}</h3>
                            <div className="skill-list">
                                {skills.map(skill => (
                                    <span className="skill-badge" key={skill}>{skill}</span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TechStack;
