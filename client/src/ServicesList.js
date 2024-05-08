import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import ServicesGrid from './ServicesGrid';
import "./css/ServicesList.css";
import Footer from './Footer';
import CategoriesForm from './DisplayingCategories';
import CountriesForm from './DisplayingCountries';
import Calendar from 'react-calendar';



const ServicesPerPage = 8;

const ServicesList = () => {
  const navigate = useNavigate();
  //const [services, setServices] = useState([]);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [allServices, setAllServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());



  useEffect(() => {
    fetchServices();
  }, [currentPage]);

  useEffect(() => {
    filterServices();
  }, [selectedCategory, selectedCountry, allServices]);

  const fetchServices = async () => {
    try {
      const response = await fetch('http://localhost:8080/getServices');
      if (!response.ok) {
        throw new Error(`Failed to fetch services: ${response.status}`);
      }
      const data = await response.json();
      setAllServices(data.services); 
      setTotalPages(Math.ceil(data.services.length / ServicesPerPage)); 
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  const filterServices = () => {
    let services = [...allServices];
    console.log('All Services:', services);
    if (selectedCategory) {
        services = services.filter(service => String(service.categoryName) === String(selectedCategory));
    }
    if (selectedCountry) {
        services = services.filter(service => String(service.countryName) === String(selectedCountry));
    }

    setFilteredServices(services);
    setTotalPages(Math.ceil(services.length / ServicesPerPage));
    setCurrentPage(1);
    console.log('Filtered Services:', services);
  };

  const checkAvailability = async () => {
    if(filteredServices.length > 0){
        try {
            const response = await fetch(`http://localhost:8080/checkServiceAvailability`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    filtred_services: filteredServices,
                    date: selectedDate.toISOString().split('T')[0]
                })
            });
            if (!response.ok) {
                throw new Error(`Failed to check service availability: ${response.status}`);
            }
            const data = await response.json();
            setFilteredServices(data.availableServices);
            setTotalPages(Math.ceil(data.availableServices.length / ServicesPerPage));
        } catch (err) {
            console.error(err);
            setError(err.message);
        }
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
  const currentServices = filteredServices.slice(indexOfFirstService, indexOfLastService);

  return (
    <>
        <Header onNavigate={navigate} />
        <div className="filters-container">
            <div className="category-filter">
                <h3>Select Category</h3>
                <CategoriesForm onSelect={setSelectedCategory} />
            </div>
            <div className="country-filter">
                <h3>Select Country</h3>
                <CountriesForm onSelect={setSelectedCountry} />
            </div>
        </div>
        <div className="calendar-container">
            <Calendar value={selectedDate} onChange={setSelectedDate} />
            <button onClick={checkAvailability} className="check-availability-btn">Check Availability</button>
        </div>
        {error && <div className="error-message">{error}</div>}
        {filteredServices.length > 0 ? (
            <>
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
            </>
        ) : (
            <div className="no-services-message">
                No services available matching the criteria.
            </div>
        )}
        <Footer onNavigate={navigate} />
    </>
  );
};
export default ServicesList;


