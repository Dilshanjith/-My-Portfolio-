import React from 'react';
import './Vision.css';
import { usePortfolio } from '../context/PortfolioContext';

const Vision = () => {
    const { data } = usePortfolio();
    return (
        <section className="section" id="vision">
            <div className="container vision-container">
                <h2 className="title">Vision & Goals</h2>
                <div className="vision-cards">
                    {data.vision.map((item, index) => (
                        <div className="vision-item card" key={index}>
                            <div className="vision-number">0{index + 1}</div>
                            <h3 className="vision-title">{item.title}</h3>
                            <p className="vision-desc">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Vision;
