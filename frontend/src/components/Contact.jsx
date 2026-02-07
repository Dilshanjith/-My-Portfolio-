import React from 'react';
import './Contact.css';
import { usePortfolio } from '../context/PortfolioContext';
import { Mail, Github, Linkedin, Twitter } from 'lucide-react';

const Contact = () => {
    const { data } = usePortfolio();
    return (
        <section className="section" id="contact">
            <div className="container contact-container">
                <h2 className="title">Let's Connect</h2>
                <p className="subtitle">I'm always open to collaborating on innovative projects.</p>
                <div className="contact-grid">
                    <a href={`mailto:${data.contact.email}`} className="card contact-card">
                        <Mail className="contact-icon" size={48} />
                        <h3>Email</h3>
                        <p>{data.contact.email}</p>
                    </a>
                    <a href={`https://${data.contact.github}`} target="_blank" rel="noopener noreferrer" className="card contact-card">
                        <Github className="contact-icon" size={48} />
                        <h3>GitHub</h3>
                        <p>View Code</p>
                    </a>
                    <a href={`https://${data.contact.linkedin}`} target="_blank" rel="noopener noreferrer" className="card contact-card">
                        <Linkedin className="contact-icon" size={48} />
                        <h3>LinkedIn</h3>
                        <p>Connect</p>
                    </a>
                    <a href={`https://twitter.com/${data.contact.twitter.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="card contact-card">
                        <Twitter className="contact-icon" size={48} />
                        <h3>Twitter / X</h3>
                        <p>Follow Me</p>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Contact;
