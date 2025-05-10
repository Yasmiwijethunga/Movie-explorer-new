// src/Components/Footer.jsx

import React from 'react';
import './Footer.css'; // External CSS for styling
import { Link } from 'react-router-dom'; // Enables internal routing links

// Footer component: appears at the bottom of every page
const Footer = () => {
  return (
    <footer className="footer">
      {/* Main container with branding, links, and contact info */}
      <div className="footer-container">
        
        {/* Brand section */}
        <div className="footer-brand">
          <h2>🎬 Movie Explorer</h2>
          <p>Your gateway to the world of movies.</p>
        </div>

        {/* Quick navigation links */}
        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/movies">Movies</Link></li>
            <li><Link to="/favorites">Favorites</Link></li>
            <li><Link to="/login">Login</Link></li>
          </ul>
        </div>

        {/* Contact information */}
        <div className="footer-contact">
          <h4>Contact Us</h4>
          <p>Email: yasmi@movieexplorer.com</p>
          <p>Phone: +1 234 567 8901</p>
        </div>
      </div>

      {/* Bottom copyright section */}
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Movie Explorer. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
