import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/UserProfile.css'; 
import Header from './Header';
import user_profile from './images/user_profile.webp'
import Footer from './Footer';
import { useLanguage } from './LanguageContext';

const UserProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');
  const { translations } = useLanguage();

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await fetch('http://localhost:8080/getUserData', {
        headers: { 'authorization': token },
      });
      if (!response.ok) throw new Error(translations.userProfile.failedFetchUser);
      const data = await response.json();
      setUser(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch('http://localhost:8080/deleteUser', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', 'Authorization': token },
        body: JSON.stringify({ _id: user.id }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || translations.userProfile.failedAlert);
      }
      alert(translations.userProfile.successfulAlert);
      navigate('/'); 
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = () => {
    navigate(`/edit-profile/${user.id}`); 
  };

  const viewMyServices = () => {
    navigate(`/user-services`);
  };

  const viewMyReservations = () => {
    navigate(`/user-bookings/${user.id}`);
  };

  if (!user) {
    return <div>{translations.userProfile.logInError}</div>;
  }

  return (
    <>
      <Header onNavigate={navigate} />
      <div className="user-profile">
        <h1>{translations.userProfile.title}</h1>
        <img src={user_profile} alt="User" className="user-image" />
        {error && <div className="error">{error}</div>}
        <p><strong>{translations.userProfile.firstnameLabel}</strong> {user.firstName}</p>
        <p><strong>{translations.userProfile.LastNameLabel}</strong> {user.lastName}</p>
        <p><strong>{translations.userProfile.emailLabel}</strong> {user.email}</p>
        <div className="profile-actions">
          <button onClick={handleEdit}>{translations.userProfile.editButton}</button>
          <button onClick={handleDelete}>{translations.userProfile.deleteButton}</button>
        </div>
        <div className="service-actions">
          <button onClick={viewMyServices}>{translations.userProfile.viewServicesButton}</button>
          <button onClick={viewMyReservations}>{translations.userProfile.viewReservationButton}</button>
        </div>
      </div>
      <Footer onNavigate={navigate} />
    </>
  );

};

export default UserProfile;
