import React, { useState, useEffect } from 'react';

const CountriesForm = ({ onSelect }) => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      const response = await fetch('http://localhost:8080/getCountries');
      if (response.ok) {
        const data = await response.json();
        setCountries(data.countries);
      } else {
        console.error('Failed to fetch countries');
      }
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  };

  const handleSelectCountry = (e) => {
    onSelect(e.target.value);
  };

  return (
    <div className='country-select'>
      <select onChange={handleSelectCountry} defaultValue="">
        <option disabled value=""> -- select country -- </option>
        {countries.map((country, index) => (
          <option key={index} value={country}>
            {country}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CountriesForm;
