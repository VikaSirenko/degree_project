import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CountriesForm from './DisplayingCountries';
import CategoriesForm from './DisplayingCategories';
import Header from './Header'; 
import './css/CreateService.css';
import Footer from './Footer';
import { useLanguage } from './LanguageContext';

const CreateService = () => {
  const navigate = useNavigate();
  const { translations } = useLanguage();
  const [serviceData, setServiceData] = useState({
    title: '',
    description: '',
    location: '',
    categoryName: '',
    countryName: ''
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setServiceData({ ...serviceData, [e.target.name]: e.target.value });
  };

  const handleCategorySelect = (categoryName) => {
    setServiceData({ ...serviceData, categoryName });
  };

  const handleCountrySelect = (countryName) => {
    setServiceData({ ...serviceData, countryName });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, description, location, categoryName, countryName } = serviceData;

    if (!title || !description || !location ) {
      setErrorMessage(translations.createService.fillInError);
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      setErrorMessage(translations.createService.logInError);
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/createService', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authorization': token
        },
        body: JSON.stringify({
          title, 
          description, 
          location, 
          categoryName, 
          countryName
        })
      });

      const data = await response.json();
      if (response.ok) {
        alert(translations.createService.successfulAlert);
        navigate(`/create-time-slot/${data.serviceId}`); 
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || translations.createService.failedAlert);
      }
    } catch (error) {
      console.error(translations.createService.anyCreatingArror, error);
      setErrorMessage(translations.createService.anyCreatingArror);
    }
  };

  return (
    <div>
      <Header onNavigate={navigate} />
      <div className='create-service-form'>
        <h2>{translations.createService.title}</h2>
        {errorMessage && <p className="error">{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          <input type="text" name="title" placeholder={translations.createService.titleService} value={serviceData.title} onChange={handleChange} />
          <input type="text" name="description" placeholder={translations.createService.description} value={serviceData.description} onChange={handleChange} />
          <input type="text" name="location" placeholder={translations.createService.location} value={serviceData.location} onChange={handleChange} />
          <CategoriesForm onSelect={handleCategorySelect} />
          <CountriesForm onSelect={handleCountrySelect} />
          <button type="submit">{translations.createService.createButton}</button>
        </form>
      </div>
      <Footer onNavigate={navigate} />
    </div>
  );
};

export default CreateService;
