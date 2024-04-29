import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/EditProfile.css'; 
import Header from './Header';
import Footer from './Footer';

const EditProfile = () => {
  const navigate = useNavigate();
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
          throw new Error('Failed to fetch user data');
        }
        const data = await response.json();
        setUserData({ ...data, password: '', confirmPassword: '' }); 
      } catch (err) {
        setError(err.message);
        console.error('Error fetching user data:', err);
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
      setError("Passwords do not match.");
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
        throw new Error(errorData.message || 'Failed to update user data');
      }
      alert('Profile updated successfully');
      navigate('/'); 
    } catch (err) {
      setError(err.message);
      console.error('Error updating user data:', err);
    }
  };

  return (
    <>
        <Header onNavigate={navigate} />
        <div className="edit-profile-container">
        <h1>Edit Profile</h1>
        {error && <div className="error">{error}</div>}
        <form onSubmit={handleSubmit}>
            <label>
            First Name:
            <input
                type="text"
                name="firstName"
                value={userData.firstName}
                onChange={handleChange}
            />
            </label>
            <label>
            Last Name:
            <input
                type="text"
                name="lastName"
                value={userData.lastName}
                onChange={handleChange}
            />
            </label>
            <label>
            Email:
            <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
            />
            </label>
            <label>
            Password (leave blank to keep the same):
            <input
                type="password"
                name="password"
                value={userData.password}
                onChange={handleChange}
                placeholder="Enter new password"
            />
            </label>
            <label>
            Confirm New Password:
            <input
                type="password"
                name="confirmPassword"
                value={userData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm new password"
            />
            </label>
            <button type="submit">Update Profile</button>
        </form>
        </div>
        <Footer onNavigate={navigate} />
    </>
  );
};

export default EditProfile;

