import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import './css/UserBookings.css';
import { useLanguage } from './LanguageContext';

const UserBookings = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
    const [bookings, setBookings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const { translations } = useLanguage();

    useEffect(() => {
        fetchUserBookings();
    }, [userId]);

    const fetchUserBookings = async () => {
        try {
            const response = await fetch(`http://localhost:8080/getUserBookings/${userId}`);
            if (!response.ok) {
                throw new Error(translations.userBookings.failFetchBookingsError);
            }
            const data = await response.json();
            const sortedBookings = data.bookings.sort((a, b) => new Date(a.booking_date) - new Date(b.booking_date));
            setBookings(sortedBookings);
            setIsLoading(false);
        } catch (err) {
            console.error(translations.userBookings.failFetchBookingsError, err);
            setError(err.message);
            setIsLoading(false);
        }
    }; 

    const deleteBooking = async (bookingId) => {
        const token = localStorage.getItem('token');
        if (!token) {
            setError(translations.userBookings.logInError);
            return;
        }

        if (window.confirm(translations.userBookings.deleteConfirmation)) {
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
                    throw new Error(errorData.message || translations.userBookings.deleteFailing);
                }

                setBookings(bookings.filter(booking => booking.id !== bookingId));
                alert(translations.userBookings.successfulAlert);
            } catch (error) {
                console.error(translations.userBookings.anyDeletingError, error);
                setError(error.message || translations.userBookings.anyDeletingError);
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
                <h1>{translations.userBookings.title}</h1>
                {isLoading ? (
                    <p>{translations.userBookings.loading}</p>
                ) : error ? (
                    <div className="error-message">{error}</div>
                ) : bookings.length > 0 ? (
                    <div className="bookings-list">
                        {bookings.map((booking) => (
                            <div key={booking.id} className={`booking-card ${isPastBooking(booking.booking_date) ? 'past-booking' : ''}`}>
                                <h2>{booking.serviceTitle}</h2>
                                <p className="description">{booking.serviceDescription}</p>
                                <p className="location">{translations.serviceDatails.locationLabel} {booking.serviceLocation}</p>
                                <p className="date">{translations.serviceBookings.dateLabel} {booking.booking_date}</p>
                                <p className="time">{translations.serviceBookings.timeSlotLabel} {booking.slotStartTime} - {booking.slotEndTime}</p>
                                <div className="booking-actions">
                                    <button onClick={() => viewDetails(booking.serviceId)} className="details-button">{translations.userBookings.viewDetailsButton}</button>
                                    <button onClick={() => deleteBooking(booking.id)} className="delete-button">{translations.userBookings.deleteButton}</button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="no-bookings">{translations.userBookings.noBookingsLabel}</p>
                )}
            </div>
            <Footer onNavigate={navigate} />
        </>
    );
};

export default UserBookings;
