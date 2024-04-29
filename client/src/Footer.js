import React from 'react';
import './css/Footer.css';
import '@fortawesome/fontawesome-free/css/all.min.css';


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
            <li><a href="/about-page">About</a></li>
            <li><a href="/services-list">Services</a></li>
          </ul>
        </div>
        <div className="footer-section social">
          <h2>Follow Us</h2>
          <div className="social-links">
            <a href="https://www.facebook.com/fpm.kpi.ua/" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a>
            <a href="https://twitter.com/bts_bighit?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>
            <a href="https://www.instagram.com/vika_sirenko_/" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; reserveHub.com | Designed by Vika Sirenko
      </div>
    </footer>
  );
};

export default Footer;
