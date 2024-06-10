import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Header from './Header';
import { useNavigate, useParams } from 'react-router-dom';
import './css/CreateTimeSlot.css';
import moment from 'moment';
import Footer from './Footer';
import { useLanguage } from './LanguageContext';

const CreateTimeSlot = () => {
  const navigate = useNavigate();
  const { serviceId } = useParams();
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [timeSlots, setTimeSlots] = useState([]);
  const [error, setError] = useState('');
  const { translations } = useLanguage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (!token) {
      setError(translations.createTimeSlot.logInError);
      return;
    }

    if (endTime <= startTime) {
      setError(translations.createTimeSlot.timeError);
      return; 
    }

    const formattedStartTime = moment(startTime).format('HH:mm');
    const formattedEndTime = moment(endTime).format('HH:mm');

    try {
      const response = await fetch('http://localhost:8080/createTimeSlot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authorization': token,
        },
        body: JSON.stringify({
          serviceId,
          start_time: formattedStartTime,
          end_time: formattedEndTime
        }),
      });

      if (response.ok) {
        const newSlot = { start_time: formattedStartTime, end_time: formattedEndTime };
        setTimeSlots([...timeSlots, newSlot]);
        setStartTime(new Date());
        setEndTime(new Date());
        setError('');
        alert(translations.createTimeSlot.successfulAlert);
      } else {
        const errorData = await response.json();
        setError(errorData.message || translations.createTimeSlot.failedAlert);
      }
    } catch (error) {
      console.error(translations.createTimeSlot.anyAddingError, error);
      setError(translations.createTimeSlot.anyAddingError);
    }
  };

  const handleComplete = () => {
    navigate(`/service/${serviceId}`);
  };

  return (
    <>
      <Header onNavigate={navigate} />
      <div className="create-time-slot-container">
        <h2>{translations.createTimeSlot.title}</h2>
        {error && <div className="error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-section">
            <label>
              {translations.createTimeSlot.startLabel}
              <DatePicker
                selected={startTime}
                onChange={setStartTime}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Start Time"
                dateFormat="HH:mm"
              />
            </label>
            <label>
              {translations.createTimeSlot.endLable}
              <DatePicker
                selected={endTime}
                onChange={setEndTime}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="End Time"
                dateFormat="HH:mm"
              />
            </label>
            <button type="submit">{translations.createTimeSlot.createButton}</button>
            <button type="button" onClick={handleComplete} className="complete-button">{translations.createTimeSlot.completeButton}</button>
          </div>
        </form>
        <div className="time-slots-list">
          <h3>{translations.createTimeSlot.listLable}</h3>
          <ul>
            {timeSlots.map((slot, index) => (
              <li key={index}>{`${translations.createTimeSlot.startLabel} ${slot.start_time}, ${translations.createTimeSlot.endLabe} ${slot.end_time}`}</li>
            ))}
          </ul>
        </div>
      </div>
      <Footer onNavigate={navigate} />
    </>
  );
};

export default CreateTimeSlot;
