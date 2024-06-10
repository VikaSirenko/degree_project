import React from 'react';
import './css/AboutPage.css'; 
import Header from './Header';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from './LanguageContext';



const AboutPage = () => {
  const navigate = useNavigate();
  const { translations } = useLanguage();
  return (
    <>
      <Header onNavigate={navigate} />
      <div className="about-container">
        <h1>{translations.aboutPage.title}</h1>
        <p>{translations.aboutPage.paragraph1}</p>
        <p>{translations.aboutPage.paragraph2}</p>
        <p>{translations.aboutPage.paragraph3}</p>
        <p>{translations.aboutPage.paragraph4}</p>
      </div>
      <Footer onNavigate={navigate} />
    </>
  );
}

export default AboutPage;
