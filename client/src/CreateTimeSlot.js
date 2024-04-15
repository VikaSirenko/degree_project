import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Header from './Header';
import { useNavigate, useParams } from 'react-router-dom';
import './css/CreateTimeSlot.css';
import moment from 'moment';

const CreateTimeSlot = () => {
  const navigate = useNavigate();
  const { serviceId } = useParams();
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [timeSlots, setTimeSlots] = useState([]);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (!token) {
      setError('You must be logged in to create a time slot.');
      return;
    }

    if (endTime <= startTime) {
      setError('End time must be later than start time.');
      return; // Stop the form submission
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
        alert('Time slot created successfully');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to create time slot');
      }
    } catch (error) {
      console.error('Error creating time slot:', error);
      setError('An error occurred while creating the time slot.');
    }
  };

  const handleComplete = () => {
    navigate(`/service/${serviceId}`);
  };

  return (
    <>
      <Header onNavigate={navigate} />
      <div className="create-time-slot-container">
        <h2>Create Time Slot for Service</h2>
        {error && <div className="error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-section">
            <label>
              Start Time:
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
              End Time:
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
            <button type="submit">Create Time Slot</button>
            <button type="button" onClick={handleComplete} className="complete-button">Complete Time Slots</button>
          </div>
        </form>
        <div className="time-slots-list">
          <h3>Created Time Slots:</h3>
          <ul>
            {timeSlots.map((slot, index) => (
              <li key={index}>{`Start Time: ${slot.start_time}, End Time: ${slot.end_time}`}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default CreateTimeSlot;
