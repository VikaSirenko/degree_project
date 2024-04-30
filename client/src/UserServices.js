import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import UserServicesGrid from './UserServicesGrid'; 
import "./css/ServicesList.css"; 
import "./css/UserServices.css"; 
import Footer from './Footer';

const UserServices = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUserServices();
  }, []);

  const fetchUserServices = async () => {
    const token = localStorage.getItem('token'); 
    if (!token) {
      setError("Authorization token is required");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/getUserServices', {
        method: 'GET',
        headers: {
            'Authorization': token,
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user services');
      }

      const data = await response.json();
      setServices(data.services); 
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setError(err.message);
      setIsLoading(false);
    }
  };

  const handleEditService = (serviceId) => {
    navigate(`/edit-service/${serviceId}`);
  };

  const handleInfoService = (serviceId) => {
    navigate(`/service/${serviceId}`);
  };

  const handleViewAvailability = (serviceId) => {
    navigate(`/service-bookings/${serviceId}`);
  };

  const handleDeleteService = async (serviceId) => {
    const token = localStorage.getItem('token'); 
    try {
      const response = await fetch(`http://localhost:8080/deleteService/${serviceId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': token,
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete service');
      }

      setServices(services.filter(service => service.id !== serviceId)); 
      alert('Service deleted successfully');
    } catch (err) {
      console.error('Error deleting service:', err);
      setError(err.message);
    }
  };

 

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <>
        <Header onNavigate={navigate} />
        <div className="error">{error}</div>
      </>
    );
  }

  return (
    <>
      <Header onNavigate={navigate} />
      <div className="user-services-container">
        <h1>My Services</h1>
        {services.length > 0 ? (
          <UserServicesGrid 
            services={services}
            onInfoService={handleInfoService}
            onEditService={handleEditService}  
            onDeleteService={handleDeleteService}
            onViewAvailability={handleViewAvailability}
          />
        ) : (
          <p>No services found.</p>
        )}
      </div>
      <Footer onNavigate={navigate} />
    </>
  );
};

export default UserServices;
