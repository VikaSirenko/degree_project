import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CountriesForm from './DisplayingCountries';
import CategoriesForm from './DisplayingCategories';
import Header from './Header';
import './css/EditService.css';
import Footer from './Footer';
import { useLanguage } from './LanguageContext';

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
  const [timeSlots, setTimeSlots] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const { translations } = useLanguage();

  useEffect(() => {
    fetchServiceDetails();
    fetchTimeSlots();
  }, []);

  const fetchServiceDetails = async () => {
    const token = localStorage.getItem('token');
    try {
      const encodedServiceId = encodeURIComponent(serviceId);
      const response = await fetch(`http://localhost:8080/getService/${encodedServiceId}`, {
        headers: { 'authorization': token}
      });
      if (!response.ok) throw new Error(translations.editService.fatchError);
      const data = await response.json();
      setServiceData({
        title: data.title,
        description: data.description,
        location: data.location,
        categoryName: data.categoryName,
        countryName: data.countryName
      });
    } catch (error) {
      console.error(translations.editService.fetchError, error);
      setErrorMessage(error.message);
    }
  };

  const fetchTimeSlots = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:8080/getListOfAllServicesTimeslots/${serviceId}`, {
        headers: { 'authorization': token }
      });
      if (!response.ok) throw new Error(translations.editService.fetchTimeError);
      const data = await response.json();
      setTimeSlots(data.timeSlots);
    } catch (error) {
      console.error(translations.editService.fetchTimeError, error);
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
      setErrorMessage(translations.editService.fillError);
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      setErrorMessage(translations.editService.logInError);
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

      if (response.ok) {
        setShowModal(true);
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || translations.editService.fetchUpdateError);
      }
    } catch (error) {
      console.error(translations.editService.fetchUpdateError, error);
      setErrorMessage(translations.editService.fetchUpdateError);
    }
  };

  const handleDeleteTimeSlot = async (timeSlotId) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://localhost:8080/deleteTimeSlot', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'authorization': token
        },
        body: JSON.stringify({ 
            _id: timeSlotId,
            serviceId: serviceId })
      });

      if (!response.ok) {
        throw new Error(translations.editService.fetchDeleteError);
      }

      const updatedTimeSlots = timeSlots.filter(slot => slot._id !== timeSlotId);
      setTimeSlots(updatedTimeSlots);
      alert(translations.editService.successfulAlert);
      window.location.reload();
    } catch (error) {
      console.error(translations.editService.fetchDeleteError, error);
      setErrorMessage(translations.editService.fetchDeleteError);
    }
  };

  const handleAddTimeSlots = () => {
    setShowModal(false);
    navigate(`/create-time-slot/${serviceId}`);
  };

  const handleViewService = () => {
    setShowModal(false);
    navigate(`/service/${serviceId}`);
  };

  return (
    <div>
      <Header onNavigate={navigate} />
      <div className='edit-service-container'>
        <h2>{translations.editService.editServiceTitle}</h2>
        {errorMessage && <p className="error">{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          <label>
            {translations.editService.title}
            <input type="text" name="title" value={serviceData.title} onChange={handleChange} />
          </label>
          <label>
            {translations.editService.description}
            <input type="text" name="description" value={serviceData.description} onChange={handleChange} />
          </label>
          <label>
            {translations.editService.location}
            <input type="text" name="location" value={serviceData.location} onChange={handleChange} />
          </label>
          <label>
            {translations.editService.category} {serviceData.categoryName}
            <CategoriesForm selected={serviceData.categoryName} onSelect={handleCategorySelect} />
          </label>
          <label>
            {translations.editService.country} {serviceData.countryName}
            <CountriesForm selected={serviceData.countryName} onSelect={handleCountrySelect} />
          </label>
          <button type="submit">{translations.editService.updateButton}</button>
        </form>

        {showModal && (
        <div className="modal">
            <div className="modal-content">
            <p>{translations.editService.addTime}</p>
            <div className="button-container">
                <button onClick={handleAddTimeSlots}>{translations.editService.yes}</button>
                <button onClick={handleViewService}>{translations.editService.no}</button>
            </div>
            </div>
        </div>
        )}

        <div>
          <h3>{translations.editService.timeTitle}</h3>
          {timeSlots.length > 0 ? (
            <ul className="time-slots-list">
              {timeSlots.map(slot => (
                <li key={slot.id} className={slot.isSelected ? 'selected' : ''}>
                  {translations.editService.time} {slot.start_time} - {slot.end_time}
                  <button
                    onClick={() => handleDeleteTimeSlot(slot.id)}
                    className={`time-slot-button ${slot.isSelected ? 'selected-slot' : ''}`}>
                    {translations.editService.delete}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>{translations.editService.message}</p>
          )}
        </div>
      </div>
      <Footer onNavigate={navigate} />
    </div>
  );
};

export default EditService;
