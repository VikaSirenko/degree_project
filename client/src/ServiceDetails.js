import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './css/ServiceDetails.css';
import Header from './Header'; 
import { useNavigate } from 'react-router-dom';
import beauty from './images/beauty.webp'
import AddReview from './AddReview';
import ReviewsSection from './ReviewsSection';

const ServiceDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchServiceDetail = async () => {
      try {
        const response = await fetch(`http://localhost:8080/getService/${id}`); 
        if (!response.ok) {
          throw new Error(`Service not found: ${response.statusText}`);
        }
        const data = await response.json();
        setService(data);
      } catch (err) {
        setError(err.message);
      }
    };

  fetchServiceDetail();
  }, [id]); 

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!service) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header onNavigate={navigate} />
      <div className="service-detail-container">
        <img src={beauty} alt="Service" className="service-image" />
        <h1>{service.title}</h1>
        <p><strong>Description:</strong> {service.description}</p>
        <p><strong>Location:</strong> {service.location}</p>
        <p><strong>Category:</strong> {service.categoryName}</p>
        <p><strong>Country:</strong> {service.countryName}</p>
        <button onClick={() => {/* Handle reservation logic here */}} className="reserve-button">Reserve</button>
        <AddReview serviceId={id} />
        <ReviewsSection serviceId={id} /> 
      </div>
    </>
  );
};

export default ServiceDetails;