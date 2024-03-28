import React from 'react';
import './css/Main.css';
import logo from './images/logo.webp';

const Main = () => {
  // Event handlers (You'll need to implement the actual navigation logic)
  const handleCreateService = () => {/* Navigate to create service page */};
  const handleChangeLanguage = () => {/* Show language options */};
  const handleSignOut = () => {/* Navigate to sign-in page */};
  const handleSearch = (event) => {
    event.preventDefault();
    // Execute search query
  };
  const handleShowAllServices = () => {/* Display all services */};

  return (
    <>
      <header className="header">
        <img src={logo} alt="Logo" className="site-logo" />
        <button onClick={handleCreateService} className="header-button">Create service</button>
        <button onClick={handleChangeLanguage} className="header-button">Change Language</button>
        <button onClick={handleSignOut} className="header-button">Sign out</button>
      </header>
      <div className="search-container">
        <form onSubmit={handleSearch} className="search-form">
          <input type="text" placeholder="Search..." className="search-input"/>
          <button type="submit" className="search-button">Search</button>
        </form>
      </div>
      <button onClick={handleShowAllServices} className="all-services-button">All Services</button>
    </>
  );
};

export default Main;

