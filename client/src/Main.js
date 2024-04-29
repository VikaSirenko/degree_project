import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header'; 
import './css/Main.css';
import Footer from './Footer';


const Main = () => {
  const navigate = useNavigate();

  const handleSearch = (event) => {
    event.preventDefault();
    // Execute search query
  };

  

  return (
    <>
      <Header onNavigate={navigate} />
      <div className="search-container">
        <form onSubmit={handleSearch} className="search-form">
          <input type="text" placeholder="Search..." className="search-input"/>
          <button type="submit" className="search-button">Search</button>
        </form>
      </div>
      <Footer onNavigate={navigate} />
    </>
  );
};

export default Main;

