import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './css/ServiceDetails.css';
import Header from './Header'; 
import { useNavigate } from 'react-router-dom';
import beauty from './images/beauty.webp'
import AddReview from './AddReview';
import ReviewsSection from './ReviewsSection';
import Footer from './Footer';
import { useLanguage } from './LanguageContext';

const ServiceDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [error, setError] = useState('');
  const { translations } = useLanguage();

  useEffect(() => {
    const fetchServiceDetail = async () => {
      try {
        const response = await fetch(`http://localhost:8080/getService/${id}`); 
        if (!response.ok) {
          throw new Error(`${translations.serviceDatails.serviceError}  ${response.statusText}`);
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
    return <div>{translations.userBookings.loading}</div>;
  }

  const handleReserveClick = () => {
    navigate(`/reserve/${id}`);
  };

  return (
    <>
      <Header onNavigate={navigate} />
      <div className="service-detail-container">
        <img src={beauty} alt="Service" className="service-image" />
        <div className="service-info">
          <h1>{service.title}</h1>
          <p><strong>{translations.serviceDatails.desctiptionLabel}</strong> {service.description}</p>
          <p><strong>{translations.serviceDatails.locationLabel}</strong> {service.location}</p>
          <p><strong>{translations.serviceDatails.categoryLabel}</strong> {service.categoryName}</p>
          <p><strong>{translations.serviceDatails.countryLabel}</strong> {service.countryName}</p>
          <button onClick={handleReserveClick} className="reserve-button">{translations.serviceDatails.reserveButton}</button>
          <AddReview serviceId={id} />
        </div>
        <ReviewsSection serviceId={id} /> 
      </div>
      <Footer onNavigate={navigate} />
    </>
  );
};

export default ServiceDetails;