import React from 'react';
import './css/ServicesGrid.css';
import beauty from "./images/beauty.webp"
import { Link } from 'react-router-dom';

const ServiceCard = ({ service }) => {
  return (
    <div className="service-card">
      <div className="service-icon">
        <img src={beauty} alt={service.title} />
      </div>
      <h3 className="service-title">{service.title}</h3>
      <Link to={`/service/${service.id}`} className="service-button">
        Learn More
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