import React from 'react';
import './css/ServicesGrid.css';
import beauty from "./images/beauty.webp";
import { Link } from 'react-router-dom';

const ServiceCard = ({ service, onEditService, onDeleteService }) => {  // Include the functions as props here
  return (
    <div className="service-card">
      <div className="service-icon">
        <img src={beauty} alt={service.title} />
      </div>
      <h3 className="service-title">{service.title}</h3>
      <Link to={`/service/${service.id}`} className="service-button">
        Learn More
      </Link>
      <button onClick={() => onEditService(service.id)} className="edit-button">Edit</button>
      <button onClick={() => onDeleteService(service.id)} className="delete-button">Delete</button>
    </div>
  );
};

const UserServicesGrid = ({ services, onEditService, onDeleteService }) => {  // Include the functions as props here
  return (
    <div className="services-grid">
      {services.map(service => (
        <ServiceCard key={service.id} service={service} 
         onEditService={onEditService} 
         onDeleteService={onDeleteService}
        />
      ))}
    </div>
  );
};

export default UserServicesGrid;
