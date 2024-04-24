import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CountriesForm from './DisplayingCountries';
import CategoriesForm from './DisplayingCategories';
import Header from './Header';
import './css/EditService.css';

const EditService = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const [serviceData, setServiceData] = useState({
    title: '',
    description: '',
    location: '',
    categoryName: '',
    countryName: ''
  });
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchServiceDetails();
  }, []);

  const fetchServiceDetails = async () => {
    const token = localStorage.getItem('token');
    try {
      const encodedServiceId = encodeURIComponent(serviceId);
      const response = await fetch(`http://localhost:8080/getService/${encodedServiceId}`, {
        headers: { 'authorization': token}
      });
      if (!response.ok) throw new Error('Failed to fetch service details');
      const data = await response.json();
      setServiceData({
        title: data.title,
        description: data.description,
        location: data.location,
        categoryName: data.categoryName,
        countryName: data.countryName
      });
    } catch (error) {
      console.error('Error fetching service details:', error);
      setErrorMessage(error.message);
    }
  };

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
      setErrorMessage('Please fill out all fields.');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      setErrorMessage('You must be logged in to create a service.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/updateService/${serviceId}`, {
        method: 'PUT',
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
        alert('Service created successfully');
        navigate(`/create-time-slot/${data.serviceId}`); 
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
      <Header onNavigate={navigate} />
      <div className='edit-service-container'>
        <h2>Edit Service</h2>
        {errorMessage && <p className="error">{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          <label>
            Title:
            <input type="text" name="title" value={serviceData.title} onChange={handleChange} />
          </label>
          <label>
            Description:
            <input type="text" name="description" value={serviceData.description} onChange={handleChange} />
          </label>
          <label>
            Location:
            <input type="text" name="location" value={serviceData.location} onChange={handleChange} />
          </label>
          <label>
            Category: {serviceData.categoryName}
            <CategoriesForm selected={serviceData.categoryName} onSelect={handleCategorySelect} />
          </label>
          <label>
            Country: {serviceData.countryName}
            <CountriesForm selected={serviceData.countryName} onSelect={handleCountrySelect} />
          </label>
          <button type="submit">Update Service</button>
        </form>
      </div>
    </div>
  );
};

export default EditService;
