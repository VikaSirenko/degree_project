import React from 'react';
import './css/UserServices.css';
import beauty from "./images/beauty.webp";

const UserServiceCard = ({ service,onInfoService, onEditService, onDeleteService, onViewAvailability }) => {
  return (
    <div className="user-service-card">
      <div className="user-service-icon">
        <img src={beauty} alt={service.title} />
      </div>
      <h3 className="user-service-title">{service.title}</h3>
      <div className="user-service-actions">
        <button onClick={() => onInfoService(service.id)} className="user-service-button">Learn More</button>
        <button onClick={() => onViewAvailability(service.id)} className="user-availability-button">Availability</button>
      </div>
      <div className="user-edit-delete-actions">
        <button onClick={() => onEditService(service.id)} className="user-edit-button">Edit</button>
        <button onClick={() => onDeleteService(service.id)} className="user-delete-button">Delete</button>
      </div>
    </div>
  );
};

const UserServicesGrid = ({ services, onInfoService, onEditService, onDeleteService, onViewAvailability }) => {
  return (
    <div className="user-services-grid">
      {services.map(service => (
        <UserServiceCard key={service.id} service={service} 
         onInfoService={onInfoService}
         onEditService={onEditService} 
         onDeleteService={onDeleteService}
         onViewAvailability={onViewAvailability}
        />
      ))}
    </div>
  );
};

export default UserServicesGrid;
