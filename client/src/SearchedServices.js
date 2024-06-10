import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from './Header';
import ServicesGrid from './ServicesGrid';
import "./css/ServicesList.css";
import Footer from './Footer';
import CountriesForm from './DisplayingCountries';
import CategoriesForm from './DisplayingCategories';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import "./css/FiltersComponent.css"
import { useLanguage } from './LanguageContext';

const ServicesPerPage = 8;

const SearchedServices = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const title = queryParams.get('title');
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [allServices, setAllServices] = useState([]);
    const [filteredServices, setFilteredServices] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedDate, setSelectedDate] = useState(new Date());
    const { translations } = useLanguage();
    useEffect(() => {
        if (title) {
            fetchSearchedServices(title);
        }
    }, [title]);

    useEffect(() => {
        filterServices();
    }, [selectedCategory, selectedCountry, allServices]);

    const fetchSearchedServices = async (searchTitle) => {
        try {
            const response = await fetch(`http://localhost:8080/getSearchedServices`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: searchTitle
                })
            });
            if (!response.ok) {
                throw new Error(`${translations.serchedServices.failedAlert} ${response.status}`);
            }
            const data = await response.json();
            setAllServices(data.services);
        } catch (err) {
            console.error(err);
            setError(err.message);
        }
    };

    const filterServices = () => {
        let services = [...allServices];
        if (selectedCategory) {
            services = services.filter(service => String(service.categoryName) === String(selectedCategory));
        }
        if (selectedCountry) {
            services = services.filter(service => String(service.countryName) === String(selectedCountry));
        }

        setFilteredServices(services);
        setTotalPages(Math.ceil(services.length / ServicesPerPage));
        setCurrentPage(1);
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
                    throw new Error(`${translations.serchedServices.failedCheckAvailability}  ${response.status}`);
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
                    <h3>{translations.serchedServices.selectCategoryLabel}</h3>
                    <CategoriesForm onSelect={setSelectedCategory} />
                </div>
                <div className="country-filter">
                    <h3>{translations.serchedServices.selectCountryLabel}</h3>
                    <CountriesForm onSelect={setSelectedCountry} />
                </div>
            </div>
            <div className="calendar-container">
                <Calendar value={selectedDate} onChange={setSelectedDate} />
                <button onClick={checkAvailability} className="check-availability-btn">{translations.serchedServices.checkAvailabilityButton}</button>
            </div>
            {error && <div className="error-message">{error}</div>}
            {filteredServices.length > 0 ? (
                <>
                    <ServicesGrid services={currentServices} />
                    <div className="pagination">
                        <button onClick={goToPrevPage} disabled={currentPage === 1}>
                            {translations.serchedServices.prev}
                        </button>
                        <span>{currentPage}</span>
                        <button onClick={goToNextPage} disabled={currentPage === totalPages}>
                            {translations.serchedServices.next}
                        </button>
                    </div>
                </>
            ) : (
                <div className="no-services-message">
                    {translations.serchedServices.noServicesLabel}
                </div>
            )}
            <Footer onNavigate={navigate} />
        </>
    );
};    

export default SearchedServices;
