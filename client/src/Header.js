import React from 'react';
import logo from './images/logo.webp';
import './css/Header.css';


const Header = ({ onNavigate }) => {
  const token = localStorage.getItem('token');

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
      <button onClick={() => onNavigate('/create-service')} className="header-button">Create Service</button>
      <button onClick={() => onNavigate('/services-list')} className="header-button">All Services</button> 
      <button className="header-button">Change Language</button> {/* Assuming future implementation */}
      <button onClick={() => onNavigate('/user-profile')} className="header-button">My Account</button> 
      <button onClick={handleAuthClick} className="header-button">
        {token ? 'Sign Out' : 'Sign In'}
      </button>
    </header>
  );
};

export default Header;
