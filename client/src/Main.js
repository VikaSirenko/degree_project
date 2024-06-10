import { useNavigate } from 'react-router-dom';
import Header from './Header'; 
import './css/Main.css';
import Footer from './Footer';
import React, { useState } from 'react';
import { useLanguage } from './LanguageContext';

const Main = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');
  const { translations } = useLanguage();

  const handleSearch = (event) => {
    event.preventDefault();
    setError('');

    if (!searchTerm.trim()) {
      setError(translations.main.searchError);
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
            placeholder={translations.main.searchLabel}
            className="search-input"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setError(''); 
            }}
          />
          <button type="submit" className="search-button">{translations.main.searchButton}</button>
        </form>
        {error && <p className="error">{error}</p>}
      </div>
      <Footer onNavigate={navigate} />
    </>
  );
};

export default Main;

