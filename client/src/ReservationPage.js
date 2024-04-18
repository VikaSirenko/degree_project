import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Header from './Header';
import './css/ReservationPage.css';

const ReservationPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (selectedDate) {
      fetchTimeSlots();
    }
  }, [selectedDate, id]);  

  const fetchTimeSlots = async () => {
    const offset = selectedDate.getTimezoneOffset() * 60000; 
    const localISODate = new Date(selectedDate.getTime() - offset).toISOString().split('T')[0];
    try {
      const response = await fetch(`http://localhost:8080/getListOfServicesTimeslots/${id}/${localISODate}`, {
        headers: {
          'authorization': token,
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch time slots');
      }
      const data = await response.json();
      setTimeSlots(data.timeSlots);
    } catch (err) {
      console.error('Error fetching time slots:', err);
      setError(err.message);
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedSlot(null);  
  };

  const handleSlotSelection = (slotId) => {
    setSelectedSlot(slotId);
    setTimeSlots(timeSlots.map(slot => ({
      ...slot,
      isSelected: slot.id === slotId,
    })));
  };

  const handleReservation = async () => {
    if (!selectedSlot) {
      setError("Please select a time slot before confirming the reservation.");
      return;
    }

    const offset = selectedDate.getTimezoneOffset() * 60000; 
    const bookingDate = new Date(selectedDate.getTime() - offset).toISOString().split('T')[0];
    try {
      const response = await fetch('http://localhost:8080/createBooking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authorization': token,
        },
        body: JSON.stringify({ serviceId: id, slotId: selectedSlot, booking_date: bookingDate }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to make reservation');
      }
      alert('Reservation successful!');
      navigate(`/service/${id}`);
    } catch (err) {
      console.error('Reservation failed:', err);
      setError(err.message);
    }
  };


  return (
    <>
      <Header onNavigate={navigate} />
      <div className="container">
        <h1>Reserve Service</h1>
        {error && <div className="error">{error}</div>}
        <div className="calendar-container">
          <Calendar
            onChange={handleDateChange}
            value={selectedDate}
            minDate={new Date()}
          />
        </div>
        <div className="time-slots-container">
          <h2>Available Time:</h2>
          {timeSlots.length > 0 ? (
            <ul className="time-slots-list">
              {timeSlots.map(slot => (
                <li key={slot.id} className={slot.isSelected ? 'selected' : ''}>
                  Time: {slot.start_time} - {slot.end_time}
                  <button 
                    onClick={() => handleSlotSelection(slot.id)}
                    className={`time-slot-button ${slot.isSelected ? 'selected-slot' : ''}`}>
                    Select
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No time slots available for the selected date.</p>
          )}
        </div>
        {selectedSlot && (
          <div className="confirm-reservation-container">
            <button onClick={handleReservation} className="confirm-button">
              Confirm Reservation
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default ReservationPage;
