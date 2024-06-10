import React from 'react';
import logo from './images/logo.webp';
import './css/Header.css';
import { useLanguage } from './LanguageContext';


const Header = ({ onNavigate }) => {
  const token = localStorage.getItem('token');
  const { translations, toggleLanguage } = useLanguage();

  const handleAuthClick = () => {
    if (token) {
      localStorage.removeItem('token');
      onNavigate('/');
    } else {
      onNavigate('/');
    }
  };

  return (
    <header className="header">
      <button onClick={() => onNavigate('/main')} className="logo-button">
        <img src={logo} alt="Logo" className="site-logo" />
      </button>
      <button onClick={() => onNavigate('/create-service')} className="header-button" data-short-label="CS">{translations.header.createLabel}</button>
      <button onClick={() => onNavigate('/services-list')} className="header-button" data-short-label="All">{translations.header.servicesLabel}</button> 
      <button onClick={toggleLanguage} className="header-button" data-short-label="Lan">{translations.header.languageButton}</button> 
      <button onClick={() => onNavigate('/user-profile')} className="header-button" data-short-label="Acc">{translations.header.accountLabel}</button> 
      <button onClick={handleAuthClick} className="header-button">
        {token ? translations.header.signOutLabel : translations.header.signInLabel}
      </button>
    </header>
  );
};

export default Header;
