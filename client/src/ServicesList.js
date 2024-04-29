import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import ServicesGrid from './ServicesGrid';
import "./css/ServicesList.css";
import Footer from './Footer';


const ServicesPerPage = 16;

const ServicesList = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchServices();
  }, [currentPage]);

  const fetchServices = async () => {
    try {
      const response = await fetch('http://localhost:8080/getServices');
      if (!response.ok) {
        throw new Error(`Failed to fetch services: ${response.status}`);
      }
      const data = await response.json();
      setServices(data.services); 
      setTotalPages(Math.ceil(data.services.length / ServicesPerPage)); 
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  const goToPrevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  
  const indexOfLastService = currentPage * ServicesPerPage;
  const indexOfFirstService = indexOfLastService - ServicesPerPage;
  const currentServices = services.slice(indexOfFirstService, indexOfLastService);

  return (
    <>
      <Header onNavigate={navigate} />
      {error && <div className="error-message">{error}</div>}
      <ServicesGrid services={currentServices} />
      <div className="pagination">
        <button onClick={goToPrevPage} disabled={currentPage === 1}>
          Prev
        </button>
        <span>{currentPage}</span>
        <button onClick={goToNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
      <Footer onNavigate={navigate} />
    </>
  );
};

export default ServicesList;


