import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StarRating from './StarRating'
import { useLanguage } from './LanguageContext';

const ReviewsSection = ({ serviceId }) => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token'); 
  const { translations } = useLanguage();

  useEffect(() => {
    fetchReviews();
  }, [serviceId]); 

  const fetchReviews = async () => {
    try {
      const response = await fetch(`http://localhost:8080/getServiceReviews/${serviceId}`, {
        headers: { 'authorization': token ,}
      });
      if (!response.ok) throw new Error(translations.reviewsSection.failfetchError);
      const data = await response.json();
      setReviews(data.reviews);
    } catch (err) {
      console.error(translations.reviewsSection.failfetchError, err);
      setError(err.message || translations.reviewsSection.failfetchError);
    }
  };

  const handleDelete = async (reviewId) => {
    if (!window.confirm(translations.reviewsSection.deleteConfirmation)) return;
    try {
      const response = await fetch(`http://localhost:8080/deleteReview`, {
        method: 'DELETE',
        headers: {
          'authorization': token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ _id: reviewId }),
      });
      if (!response.ok) throw new Error(translations.reviewsSection.rightsError);
      alert(translations.reviewsSection.successfulAlert);
      fetchReviews(); 
      window.location.reload();
    } catch (err) {
      console.error(translations.reviewsSection.failedAlert, err);
      setError(err.message || translations.reviewsSection.failedAlert);
    }
  };

  const handleEdit = (reviewId) => {
    navigate(`/edit-review/${reviewId}/${serviceId}`);
  };

  return (
    <div className="reviews-section">
      <h3>{translations.reviewsSection.title}</h3>
      {error && <p className="error-message">{error}</p>}
      {reviews.length ? reviews.map((review) => (
        <div key={review.id} className="review-card">
          <div className="review-header">
            <h4 className="user-name">{review.userName}</h4>
            <div className="review-rating-date">
              <StarRating rating={review.rating} />
              <span className="review-date">{new Date(review.review_date).toLocaleDateString()}</span>
            </div>
          </div>
          <p className="review-comment">{review.comment}</p>
          <div className="review-actions">
            <button className="edit-button" onClick={() => handleEdit(review.id)}>{translations.reviewsSection.edit}</button>
            <button className="delete-button" onClick={() => handleDelete(review.id)}>{translations.reviewsSection.delete}</button>
          </div>
        </div>
      )) : <p>{translations.reviewsSection.noReviewsMes}</p>}
    </div>

  );
};

export default ReviewsSection;
