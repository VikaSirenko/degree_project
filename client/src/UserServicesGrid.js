import React from 'react';
import './css/UserServices.css';
import beauty from "./images/beauty.webp";
import { Link } from 'react-router-dom';

const UserServiceCard = ({ service, onEditService, onDeleteService }) => {
  return (
    <div className="user-service-card">
      <div className="user-service-icon">
        <img src={beauty} alt={service.title} />
      </div>
      <h3 className="user-service-title">{service.title}</h3>
      <div className="user-service-actions">
        <Link to={`/service/${service.id}`} className="service-button">
          Learn More
        </Link>
      </div>
      <div className="user-edit-delete-actions">
        <button onClick={() => onEditService(service.id)} className="user-edit-button">Edit</button>
        <button onClick={() => onDeleteService(service.id)} className="user-delete-button">Delete</button>
      </div>
    </div>
  );
};

const UserServicesGrid = ({ services, onEditService, onDeleteService }) => {
  return (
    <div className="user-services-grid">
      {services.map(service => (
        <UserServiceCard key={service.id} service={service} 
         onEditService={onEditService} 
         onDeleteService={onDeleteService}
        />
      ))}
    </div>
  );
};

export default UserServicesGrid;
