import React, { useState } from 'react';
import './css/Registration.css'; 
import { useNavigate } from 'react-router-dom'; 

const Registration = () => {
  const navigate = useNavigate(); 
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [formValidationMessage, setFormValidationMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    setFormValidationMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.values(formData).some(value => value.trim() === '')) {
        setFormValidationMessage('Please fill out all fields.');
        return;
    }

    if (formData.password !== formData.confirmPassword) {
        setFormValidationMessage("Passwords don't match!");
        return;
    }

    try {
        const response = await fetch('http://localhost:8080/userRegistration', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
          });
          

      if (response.ok) {
        const result = await response.json();
        alert(result.message); 
        navigate('/main'); 
      } else {
        const error = await response.json();
        alert(error.message);
      }
    } catch (error) {
      alert('An error occurred while sending the data');
    }
  };

  return (
    <div className="registration-form">
      <h2>Registration Form</h2>
      {formValidationMessage && <p className="validation-message">{formValidationMessage}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" />
        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" />
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
        <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" />
        <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm password" />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Registration;

