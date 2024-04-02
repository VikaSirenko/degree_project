import React, { useState, useEffect } from 'react';

const CategoriesForm = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Choose Category');
  const [isListOpen, setIsListOpen] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:8080/getCategories');
      if (response.ok) {
        const data = await response.json();
        setCategories(data.categories);
      } else {
        console.error('Failed to fetch categories');
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleSelectCategory = (e) => {
    setSelectedCategory(e.target.value);
    setIsListOpen(false); 
  };

  return (
    <div>
      {isListOpen ? (
        <select onChange={handleSelectCategory} onBlur={() => setIsListOpen(false)} autoFocus>
          <option disabled selected value> -- select an option -- </option>
          {categories.map((categoryName, index) => (
            <option key={index} value={categoryName}>
              {categoryName}
            </option>
          ))}
        </select>
      ) : (
        <button onClick={() => setIsListOpen(!isListOpen)}>
          {selectedCategory}
        </button>
      )}
    </div>
  );
};

export default CategoriesForm;
