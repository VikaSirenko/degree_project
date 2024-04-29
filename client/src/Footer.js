import React from 'react';
import './css/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h2>About Us</h2>
          <p>We are a leading platform for booking and managing services. We help you connect with the best service providers in your area.</p>
        </div>
        <div className="footer-section links">
          <h2>Contact Us</h2>
          <ul>
            <li><a href="/main">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="/services-list">Services</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>
        <div className="footer-section social">
          <h2>Follow Us</h2>
          <div className="social-links">
            <a href="/main"><i className="fab fa-facebook-f"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; yourwebsite.com | Designed by Vika Sirenko
      </div>
    </footer>
  );
};

export default Footer;
