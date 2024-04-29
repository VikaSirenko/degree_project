import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CountriesForm from './DisplayingCountries';
import CategoriesForm from './DisplayingCategories';
import Header from './Header';
import './css/EditService.css';
import Footer from './Footer';

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

  const fetchTimeSlots = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:8080/getListOfAllServicesTimeslots/${serviceId}`, {
        headers: { 'authorization': token }
      });
      if (!response.ok) throw new Error('Failed to fetch time slots');
      const data = await response.json();
      setTimeSlots(data.timeSlots);
    } catch (error) {
      console.error('Error fetching time slots:', error);
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

      if (response.ok) {
        setShowModal(true);
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Failed to create service');
      }
    } catch (error) {
      console.error('Error creating service:', error);
      setErrorMessage('An error occurred while creating the service.');
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
        throw new Error('Failed to delete time slot');
      }

      const updatedTimeSlots = timeSlots.filter(slot => slot._id !== timeSlotId);
      setTimeSlots(updatedTimeSlots);
      alert('Time slot deleted successfully');
      window.location.reload();
    } catch (error) {
      console.error('Error deleting time slot:', error);
      setErrorMessage('An error occurred while deleting the time slot.');
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

        {showModal && (
        <div className="modal">
            <div className="modal-content">
            <p>Do you want to add new time slots?</p>
            <div className="button-container">
                <button onClick={handleAddTimeSlots}>Yes</button>
                <button onClick={handleViewService}>No</button>
            </div>
            </div>
        </div>
        )}

        <div>
          <h3>Time Slots</h3>
          {timeSlots.length > 0 ? (
            <ul className="time-slots-list">
              {timeSlots.map(slot => (
                <li key={slot.id} className={slot.isSelected ? 'selected' : ''}>
                  Time: {slot.start_time} - {slot.end_time}
                  <button
                    onClick={() => handleDeleteTimeSlot(slot.id)}
                    className={`time-slot-button ${slot.isSelected ? 'selected-slot' : ''}`}>
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No time slots available for the selected date.</p>
          )}
        </div>
      </div>
      <Footer onNavigate={navigate} />
    </div>
  );
};

export default EditService;
