import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './css/EditReview.css'; 
import Header from './Header';
import Footer from './Footer';
import { useLanguage } from './LanguageContext';

const EditReview = () => {
  const { reviewId, serviceId } = useParams();
  const navigate = useNavigate();
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');
  const { translations } = useLanguage();

  useEffect(() => {
    if (!token) {
      setError(translations.editReview.logInError);
      return;
    }

    const fetchReviewData = async () => {
        try {
          const response = await fetch(`http://localhost:8080/getReview/${reviewId}`, {
            headers: {
              'Authorization': token,
            },
          });
          if (!response.ok) {
            if (response.status === 403) {
              throw new Error(translations.editReview.permissionError);
            }
            const errorData = await response.json();
            throw new Error(errorData.message || translations.editReview.fetchError);
          }
          const data = await response.json();
          setRating(data.rating);
          setComment(data.comment);
        } catch (err) {
            console.error(translations.editReview.fetchError, err);
            setError(err.message);
          
            setTimeout(() => {
               navigate(`/service/${serviceId}`);
            }, 2000); 
          }
      };
      
      fetchReviewData();
  }, [reviewId, navigate, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      setError(translations.editReview.updateError);
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/updateReview`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'authorization': token,
        },
        body: JSON.stringify({ _id: reviewId, rating, comment }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || translations.editReview.failUpdate);
      }
      alert(translations.editReview.successfulAlert);
      navigate(-1);
    } catch (err) {
      console.error(translations.editReview.failUpdate, err);
      setError(err.message || translations.editReview.failUpdate);
    }
  };

  return (
    <>
    <Header onNavigate={navigate} />
    <div className="edit-review-form">
      <h2>{translations.editReview.editReview}</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          {translations.editReview.rating}
          <input
            type="number"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            min="1"
            max="5"
          />
        </label>
        <label>
          {translations.editReview.comment}
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </label>
        <button type="submit" disabled={!token}>{translations.editReview.updateButton}</button>
      </form>
    </div>
    <Footer onNavigate={navigate} />
    </>
  );
};

export default EditReview;
