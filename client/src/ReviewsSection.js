import React, { useState, useEffect } from 'react';
import StarRating from './StarRating.js'

const ReviewsSection = ({ serviceId }) => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`http://localhost:8080/getServiceReviews/${serviceId}`);
        if (!response.ok) throw new Error('Failed to fetch reviews');
        const data = await response.json();
        setReviews(data.reviews);
      } catch (err) {
        console.error('Error fetching reviews:', err);
        setError(err.message);
      }
    };
    

    fetchReviews();
  }, [serviceId]); 

  if (error) {
    return <div>Error: {error}</div>;
  }

  const formatReviewDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      year: 'numeric', month: 'long', day: 'numeric'
    });
  };

  return (
    <div className="reviews-section">
      <h3>Reviews</h3>
      {reviews.length ? reviews.map((review) => (
        <div className="review-card">
        <div className="review-header">
          <h4 className="user-name">{review.userName}</h4>
          <div className="review-rating-date">
            <div className="rating"><StarRating rating={review.rating} /></div>
            <span className="review-date">{formatReviewDate(review.review_date)}</span>
          </div>
        </div>
        <p className="review-comment">{review.comment}</p>
      </div>
      )) : <p>No reviews yet.</p>}
    </div>
  );
};

export default ReviewsSection;
