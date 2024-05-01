import { useNavigate } from 'react-router-dom';
import Header from './Header'; 
import './css/Main.css';
import Footer from './Footer';
import React, { useState } from 'react';


const Main = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');

  const handleSearch = (event) => {
    event.preventDefault();
    setError('');

    if (!searchTerm.trim()) {
      setError("Please enter a search term.");
      return;
    }

    navigate(`/searched-services?title=${encodeURIComponent(searchTerm)}`);
  };

  

  return (
    <>
      <Header onNavigate={navigate} />
      <div className="search-container">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Search..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setError(''); 
            }}
          />
          <button type="submit" className="search-button">Search</button>
        </form>
        {error && <p className="error">{error}</p>}
      </div>
      <Footer onNavigate={navigate} />
    </>
  );
};

export default Main;

