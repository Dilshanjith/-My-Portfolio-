import React, { useState } from 'react';
import './Navbar.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <nav className="navbar">
            <div className="container navbar-container">
                <a href="#" className="logo">Dilshanjith<span className="dot">.</span></a>
                <div className={`menu-icon ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </div>
                <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
                    <li><a href="#about" onClick={toggleMenu}>About</a></li>
                    <li><a href="#skills" onClick={toggleMenu}>Skills</a></li>
                    <li><a href="#projects" onClick={toggleMenu}>Projects</a></li>
                    <li><a href="#vision" onClick={toggleMenu}>Vision</a></li>
                    <li><a href="#contact" onClick={toggleMenu} className="btn-nav">Contact Me</a></li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
