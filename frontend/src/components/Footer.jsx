import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container footer-container">
                <p className="copyright">© {new Date().getFullYear()} Dilshanjith. All rights reserved.</p>
                <div className="footer-links">
                    <p className="last-updated">Last Updated: February 2026</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
