import React, { useState, useEffect } from 'react';

const CategoriesForm = ({ onSelect }) => {
  const [categories, setCategories] = useState([]);

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
    onSelect(e.target.value);
  };

  return (
    <div className='category-select'>
      <select onChange={handleSelectCategory} defaultValue="">
        <option disabled value=""> -- select category -- </option>
        {categories.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoriesForm;
