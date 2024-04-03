import React from 'react';
import logo from './images/logo.webp';
import './css/Header.css';

const Header = ({ onNavigate }) => {
  return (
    <header className="header">
      <img src={logo} alt="Logo" className="site-logo" />
      <button onClick={() => onNavigate('/create-service')} className="header-button">Create Service</button>
      <button onClick={() => onNavigate('/services-list')} className="header-button">All Services</button> 
      <button className="header-button">Change Language</button> {/* Assuming future implementation */}
      <button className="header-button">My Account</button> {/* Assuming future implementation */}
      <button onClick={() => onNavigate('/')} className="header-button">Sign Out</button> {/* Navigate to sign-in page */}
    </header>
  );
};

export default Header;
