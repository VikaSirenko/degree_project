import React from 'react';
import './css/Footer.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useLanguage } from './LanguageContext';

const Footer = () => {
  const { translations } = useLanguage();
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h2>{translations.footer.aboutTitle}</h2>
          <p>{translations.footer.text}</p>
        </div>
        <div className="footer-section links">
          <h2>{translations.footer.contact}</h2>
          <ul>
            <li><a href="/main">{translations.footer.home}</a></li>
            <li><a href="/about-page">{translations.footer.about}</a></li>
            <li><a href="/services-list">{translations.footer.services}</a></li>
          </ul>
        </div>
        <div className="footer-section social">
          <h2>{translations.footer.follow}</h2>
          <div className="social-links">
            <a href="https://www.facebook.com/fpm.kpi.ua/" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a>
            <a href="https://twitter.com/bts_bighit?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>
            <a href="https://www.instagram.com/vika_sirenko_/" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; {translations.footer.info}
      </div>
    </footer>
  );
};

export default Footer;
