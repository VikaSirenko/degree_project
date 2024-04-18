import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/UserProfile.css'; 
import Header from './Header';
import user_profile from './images/user_profile.webp'

const UserProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await fetch('http://localhost:8080/getUserData', {
        headers: { 'authorization': token },
      });
      if (!response.ok) throw new Error('Failed to fetch user data');
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
        throw new Error(errorData.message || 'Failed to delete user');
      }
      alert('User deleted successfully');
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
    navigate(`/my-reservations/${user.id}`);
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header onNavigate={navigate} />
      <div className="user-profile">
        <h1>User Profile</h1>
        <img src={user_profile} alt="User" className="user-image" />
        {error && <div className="error">{error}</div>}
        <p><strong>First Name:</strong> {user.firstName}</p>
        <p><strong>Last Name:</strong> {user.lastName}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <div className="profile-actions">
          <button onClick={handleEdit}>Edit Profile</button>
          <button onClick={handleDelete}>Delete Profile</button>
        </div>
        <div className="service-actions">
          <button onClick={viewMyServices}>View My Services</button>
          <button onClick={viewMyReservations}>View My Reservations</button>
        </div>
      </div>
    </>
  );

};

export default UserProfile;
