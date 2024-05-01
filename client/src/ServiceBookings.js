import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Header from './Header';
import Footer from './Footer';
import './css/ServiceBookings.css';

const ServiceBookings = () => {
  const navigate = useNavigate();
  const { serviceId } = useParams();
  const [bookings, setBookings] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [displayBookings, setDisplayBookings] = useState([]);
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchBookings();
  }, [serviceId]);  

  const fetchBookings = async () => {
    try {
      const response = await fetch(`http://localhost:8080/getServiceBookings/${serviceId}`);
      if (!response.ok) throw new Error('Failed to fetch bookings');
      const data = await response.json();
      setBookings(data.bookings.map(booking => ({
        ...booking,
        booking_date: new Date(booking.booking_date) 
      })));
    } catch (err) {
      console.error('Error fetching bookings:', err);
      setError(err.message);
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date); 
    const offset = date.getTimezoneOffset() * 60000; 
    const dateString = new Date(date.getTime() - offset).toISOString().split('T')[0];
    const filteredBookings = bookings.filter(booking =>
      booking.booking_date.toISOString().split('T')[0] === dateString
    );
    setDisplayBookings(filteredBookings);
};



return (
    <>
      <Header onNavigate={navigate} />
      <div className="container">
        <h1>Service Bookings Calendar</h1>
        {error && <div className="error">{error}</div>}
        <div className="calendar-container">
          <Calendar
            onChange={handleDateChange}
            value={selectedDate}
            tileClassName={({ date, view }) => {
              const dateString = date.toISOString().split('T')[0];
              if (bookings.some(d => d.booking_date === dateString)) {
                return 'highlight';
              }
            }}
            minDate={new Date()}
          />
        </div>
        {displayBookings.length > 0 ? (
          <ul className="bookings-list">
            {displayBookings.map((booking, index) => (
              <li key={index} className="booking-item">
                <div className="booking-detail">
                  <strong>Date:</strong> {new Date(booking.booking_date).toLocaleDateString()}
                </div>
                <div className="booking-detail">
                  <strong>Customer:</strong> {booking.userFirstName} {booking.userLastName}
                </div>
                <div className="booking-detail">
                  <strong>Time Slot:</strong> {booking.slotStartTime} - {booking.slotEndTime}
                </div>
              </li>
            ))}
          </ul>
        ) : <p className="no-bookings">No bookings available for this date.</p>}
      </div>
      <Footer onNavigate={navigate} />
    </>
);

};

export default ServiceBookings;