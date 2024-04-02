import React, { useState, useEffect } from 'react';

const CountriesForm = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('Choose Country');
  const [isListOpen, setIsListOpen] = useState(false);

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
    setSelectedCountry(e.target.value);
    setIsListOpen(false); 
  };

  return (
    <div>
      {isListOpen ? (
        <select onChange={handleSelectCountry} onBlur={() => setIsListOpen(false)} autoFocus>
          <option disabled selected value> -- select an option -- </option>
          {countries.map((countryName, index) => (
            <option key={index} value={countryName}>
              {countryName}
            </option>
          ))}
        </select>
      ) : (
        <button onClick={() => setIsListOpen(!isListOpen)}>
          {selectedCountry}
        </button>
      )}
    </div>
  );
};

export default CountriesForm;
