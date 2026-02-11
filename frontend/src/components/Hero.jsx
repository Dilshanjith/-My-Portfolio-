import React from 'react';
import './Hero.css';
import { usePortfolio } from '../context/PortfolioContext';

const Hero = () => {
    const { data } = usePortfolio(); // Use data from context

    return (
        <section className="hero" id="about">
            <div className="container hero-container">
                <div className="hero-content animate-fade-in">
                    <p className="hero-subtitle">Hi, I'm</p>
                    <h1 className="hero-title">{data.name} <span className="hand-wave">👋</span></h1>
                    <h2 className="hero-role">{data.role}</h2>
                    <p className="hero-desc">
                        {data.intro}
                    </p>
                    <div className="hero-buttons">
                        <a href="#projects" className="btn">See My Work</a>
                        <a href="#contact" className="btn btn-outline">Let's Connect</a>
                    </div>
                </div>
                <div className="hero-visual animate-fade-in delay-2">
                    <div className="profile-wrapper">
                        <img
                            src={data.image?.startsWith('uploads/')
                                ? `${(import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace('/api', '')}/${data.image}`
                                : data.image}
                            alt={data.name}
                            className="profile-img"
                        />
                        <div className="circle-pulse"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
