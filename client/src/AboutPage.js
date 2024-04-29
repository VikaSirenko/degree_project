import React from 'react';
import './css/AboutPage.css'; 
import Header from './Header';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';


const AboutPage = () => {
  const navigate = useNavigate();
  return (
    <>
    <Header onNavigate={navigate} />
    <div className="about-container">
      <h1>About Us</h1>
      <p>Welcome to ReserveHub, your reliable partner in finding and booking essential services online. Whether you're looking to schedule a haircut, secure a spot at a local workshop, or book a consultation with a professional, we've got you covered.</p>
      <p>Our platform connects you with a wide range of service providers, making it easy to compare options, read reviews, and make informed decisions about the services you need. We're committed to helping streamline your scheduling needs with our intuitive booking system.</p>
      <p>At ReserveHub, we believe that booking services should be hassle-free, transparent, and trustworthy. Our mission is to empower customers by providing them with a comprehensive platform that not only saves time but also ensures quality and satisfaction.</p>
      <p>Thank you for choosing us to assist with your service booking needs. We're excited to help you find the perfect services that fit your lifestyle and needs.</p>
    </div>
    <Footer onNavigate={navigate} />
    </>
  );
}

export default AboutPage;
