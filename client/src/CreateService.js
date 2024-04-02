import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CountriesForm from './DisplayingCountries';
import CategoriesForm from './DisplayingCategories';

const CreateService = () => {
  const navigate = useNavigate();
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

  const handleCountrySelect = (countryName) => {
    setServiceData({ ...serviceData, countryName });
  };

  const handleCategorySelect = (categoryName) => {
    setServiceData({ ...serviceData, categoryName });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, description, location, categoryName, countryName } = serviceData;

    if (!title || !description || !location ) {
      setErrorMessage('Please fill out all fields.');
      return;
    }

    // Assuming the token is stored in localStorage
    const token = localStorage.getItem('token');
    if (!token) {
      setErrorMessage('You must be logged in to create a service.');
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

      if (response.ok) {
        alert('Service created successfully');
        navigate('/main'); // Redirect user to home or another page
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Failed to create service');
      }
    } catch (error) {
      console.error('Error creating service:', error);
      setErrorMessage('An error occurred while creating the service.');
    }
  };

  return (
    <div>
      <h2>Create Service</h2>
      {errorMessage && <p className="error">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Title" value={serviceData.title} onChange={handleChange} />
        <input type="text" name="description" placeholder="Description" value={serviceData.description} onChange={handleChange} />
        <input type="text" name="location" placeholder="Location" value={serviceData.location} onChange={handleChange} />
        <CategoriesForm onSelect={handleCategorySelect} />
        <CountriesForm onSelect={handleCountrySelect} />
        <button type="submit">Create Service</button>
      </form>
    </div>
  );
};

export default CreateService;
