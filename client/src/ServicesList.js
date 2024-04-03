import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import ServicesGrid from './ServicesGrid';


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
      const response = await fetch(`http://localhost:8080/getServices?page=${currentPage}&limit=${ServicesPerPage}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch services: ${response.status}`);
      }
      const data = await response.json();
      setServices(data.services.slice(0, ServicesPerPage)); 
      const total = data.services.length; 
      setTotalPages(Math.ceil(total / ServicesPerPage));
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  const indexOfLastService = currentPage * ServicesPerPage;
  const indexOfFirstService = indexOfLastService - ServicesPerPage;
  const currentServices = services.slice(indexOfFirstService, indexOfLastService);

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <Header onNavigate={navigate} />
      {error && <div className="error-message">{error}</div>}
      <ServicesGrid services={currentServices} />

      <div className="pagination">
        {pageNumbers.map(number => (
          <button key={number} onClick={() => goToPage(number)}>
            {number}
          </button>
        ))}
      </div>
    </>
  );
};

export default ServicesList;
