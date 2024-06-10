import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Header from './Header';
import './css/ReservationPage.css';
import Footer from './Footer';
import { useLanguage } from './LanguageContext';


const ReservationPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');
  const { translations } = useLanguage();

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
        throw new Error(errorData.message || translations.reservationPage.failedTimeAlert);
      }
      const data = await response.json();
      setTimeSlots(data.timeSlots);
    } catch (err) {
      console.error(translations.reservationPage.failedTimeAlert, err);
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
      setError(translations.reservationPage.timeError);
      return;
    }

    if (!token) {
      setError(translations.reservationPage.logInError);
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
        throw new Error(errorData.message || translations.reservationPage.failedBookingAlert);
      }
      alert(translations.reservationPage.successfulAlert);
      navigate(`/service/${id}`);
    } catch (err) {
      console.error(translations.reservationPage.failedBookingAlert, err);
      setError(err.message);
    }
  };


  return (
    <>
      <Header onNavigate={navigate} />
      <div className="container">
        <h1>{translations.reservationPage.title}</h1>
        {error && <div className="error">{error}</div>}
        <div className="calendar-container">
          <Calendar
            onChange={handleDateChange}
            value={selectedDate}
            minDate={new Date()}
          />
        </div>
        <div className="time-slots-container">
          <h2>{translations.reservationPage.availableLable}</h2>
          {timeSlots.length > 0 ? (
            <ul className="time-slots-list">
              {timeSlots.map(slot => (
                <li key={slot.id} className={slot.isSelected ? 'selected' : ''}>
                  {translations.reservationPage.timeLabel} {slot.start_time} - {slot.end_time}
                  <button 
                    onClick={() => handleSlotSelection(slot.id)}
                    className={`time-slot-button ${slot.isSelected ? 'selected-slot' : ''}`}>
                    {translations.reservationPage.selectButton}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p> {translations.reservationPage.noTimeMes}</p>
          )}
        </div>
        {selectedSlot && (
          <div className="confirm-reservation-container">
            <button onClick={handleReservation} className="confirm-button">
            {translations.reservationPage.confirmButton}
            </button>
          </div>
        )}
      </div>
      <Footer onNavigate={navigate} />
    </>
  );
};

export default ReservationPage;
