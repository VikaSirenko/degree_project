import React from 'react';
import './css/ServicesGrid.css';
import beauty from "./images/beauty.webp"
import { Link } from 'react-router-dom';
import { useLanguage } from './LanguageContext';

const ServiceCard = ({ service }) => {
  const { translations } = useLanguage();
  return (
    <div className="service-card">
      <div className="service-icon">
        <img src={beauty} alt={service.title} />
      </div>
      <h3 className="service-title">{service.title}</h3>
      <Link to={`/service/${service.id}`} className="service-button">
        {translations.servicesGrid.learnMoreButton}
      </Link>
    </div>
  );
};

const ServicesGrid = ({ services }) => {
  return (
    <div className="services-grid">
      {services.map(service => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </div>
  );
};

export default ServicesGrid;