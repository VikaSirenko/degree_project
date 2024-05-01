import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import './css/UserBookings.css';

const UserBookings = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
    const [bookings, setBookings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchUserBookings();
    }, [userId]);

    const fetchUserBookings = async () => {
        try {
            const response = await fetch(`http://localhost:8080/getUserBookings/${userId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch bookings');
            }
            const data = await response.json();
            const sortedBookings = data.bookings.sort((a, b) => new Date(a.booking_date) - new Date(b.booking_date));
            setBookings(sortedBookings);
            setIsLoading(false);
        } catch (err) {
            console.error('Error fetching bookings:', err);
            setError(err.message);
            setIsLoading(false);
        }
    }; 

    const deleteBooking = async (bookingId) => {
        const token = localStorage.getItem('token');
        if (!token) {
            setError('You must be logged in to delete a booking.');
            return;
        }

        if (window.confirm("Are you sure you want to delete this booking?")) {
            try {
                const response = await fetch(`http://localhost:8080/deleteBooking`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': token,
                    },
                    body: JSON.stringify({ _id: bookingId })
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Failed to delete booking');
                }

                setBookings(bookings.filter(booking => booking.id !== bookingId));
                alert('Booking deleted successfully.');
            } catch (error) {
                console.error('Error deleting booking:', error);
                setError(error.message || 'An error occurred while deleting the booking.');
            }
        }
    };

    const viewDetails = (serviceId) => {
        navigate(`/service/${serviceId}`);
    };

    const isPastBooking = (date) => {
        const today = new Date();
        const bookingDate = new Date(date);
        return bookingDate < today;
    };

    return (
        <>
            <Header onNavigate={navigate} />
            <div className="bookings-container">
                <h1>My Bookings</h1>
                {isLoading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <div className="error-message">{error}</div>
                ) : bookings.length > 0 ? (
                    <div className="bookings-list">
                        {bookings.map((booking) => (
                            <div key={booking.id} className={`booking-card ${isPastBooking(booking.booking_date) ? 'past-booking' : ''}`}>
                                <h2>{booking.serviceTitle}</h2>
                                <p className="description">{booking.serviceDescription}</p>
                                <p className="location">Location: {booking.serviceLocation}</p>
                                <p className="date">Date: {booking.booking_date}</p>
                                <p className="time">Time Slot: {booking.slotStartTime} - {booking.slotEndTime}</p>
                                <div className="booking-actions">
                                    <button onClick={() => viewDetails(booking.serviceId)} className="details-button">View Details</button>
                                    <button onClick={() => deleteBooking(booking.id)} className="delete-button">Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="no-bookings">No bookings available.</p>
                )}
            </div>
            <Footer onNavigate={navigate} />
        </>
    );
};

export default UserBookings;
