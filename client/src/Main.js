import React from 'react';
import './css/Main.css';
import logo from './images/logo.webp';
import { useNavigate } from 'react-router-dom';


const Main = () => {
  const navigate = useNavigate();
  const handleCreateService = () => {navigate('/create-service')};
  const handleShowAllServices = () => {/* Display all services */};
  const handleChangeLanguage = () => {/* Show language options */};
  const handleMyAccount = () => {/* Navigate to my account page */};
  const handleSignOut = () => {/* Navigate to sign-in page */};
  const handleSearch = (event) => {
    event.preventDefault();
    // Execute search query
  };

  return (
    <>
      <header className="header">
        <img src={logo} alt="Logo" className="site-logo" />
        <button onClick={handleCreateService} className="header-button">Create Service</button>
        <button onClick={handleShowAllServices} className="header-button">All Services</button> {/* Added "All Services" button */}
        <button onClick={handleChangeLanguage} className="header-button">Change Language</button>
        <button onClick={handleMyAccount} className="header-button">My Account</button>
        <button onClick={handleSignOut} className="header-button">Sign Out</button>
      </header>
      <div className="search-container">
        <form onSubmit={handleSearch} className="search-form">
          <input type="text" placeholder="Search..." className="search-input"/>
          <button type="submit" className="search-button">Search</button>
        </form>
      </div>
      {/* Removed the "All Services" button from the bottom of the page */}
    </>
  );
};

export default Main;
