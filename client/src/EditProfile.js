import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/EditProfile.css'; 
import Header from './Header';
import Footer from './Footer';
import { useLanguage } from './LanguageContext';

const EditProfile = () => {
  const navigate = useNavigate();
  const { translations } = useLanguage();
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''  
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:8080/getUserData', {
          headers: {
            'authorization': token
          }
        });
        if (!response.ok) {
          throw new Error(translations.EditProfile.errorFetching);
        }
        const data = await response.json();
        setUserData({ ...data, password: '', confirmPassword: '' }); 
      } catch (err) {
        setError(err.message);
        console.error(translations.EditProfile.errorFetching, err);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (userData.password !== userData.confirmPassword) {
      setError(translations.EditProfile.errorPassword);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8080/updateUser', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'authorization': token
        },
        body: JSON.stringify({
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          password: userData.password  
        })
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || translations.EditProfile.errorUpdate);
      }
      alert(translations.EditProfile.successfulAlert);
      navigate('/'); 
    } catch (err) {
      setError(err.message);
      console.error(translations.EditProfile.errorUpdate, err);
    }
  };

  return (
    <>
        <Header onNavigate={navigate} />
        <div className="edit-profile-container">
        <h1>{translations.EditProfile.editProfile}</h1>
        {error && <div className="error">{error}</div>}
        <form onSubmit={handleSubmit}>
            <label>
            {translations.EditProfile.firstName}
            <input
                type="text"
                name="firstName"
                value={userData.firstName}
                onChange={handleChange}
            />
            </label>
            <label>
            {translations.EditProfile.lastName}
            <input
                type="text"
                name="lastName"
                value={userData.lastName}
                onChange={handleChange}
            />
            </label>
            <label>
            {translations.EditProfile.email}
            <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
            />
            </label>
            <label>
            {translations.EditProfile.password}
            <input
                type="password"
                name="password"
                value={userData.password}
                onChange={handleChange}
                placeholder={translations.EditProfile.enterPassword}
            />
            </label>
            <label>
            {translations.EditProfile.confirmPassword}
            <input
                type="password"
                name="confirmPassword"
                value={userData.confirmPassword}
                onChange={handleChange}
                placeholder={translations.EditProfile.enterConfirmPassword}
            />
            </label>
            <button type="submit">{translations.EditProfile.updateButton}</button>
        </form>
        </div>
        <Footer onNavigate={navigate} />
    </>
  );
};

export default EditProfile;

