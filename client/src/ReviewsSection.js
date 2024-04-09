import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StarRating from './StarRating'

const ReviewsSection = ({ serviceId }) => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token'); 

  useEffect(() => {
    fetchReviews();
  }, [serviceId]); 

  const fetchReviews = async () => {
    try {
      const response = await fetch(`http://localhost:8080/getServiceReviews/${serviceId}`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (!response.ok) throw new Error('Failed to fetch reviews');
      const data = await response.json();
      setReviews(data.reviews);
    } catch (err) {
      console.error('Error fetching reviews:', err);
      setError(err.message || 'Failed to fetch reviews');
    }
  };

  const handleDelete = async (reviewId) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;
    try {
      const response = await fetch(`http://localhost:8080/deleteReview`, {
        method: 'DELETE',
        headers: {
          'authorization': token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ _id: reviewId }),
      });
      if (!response.ok) throw new Error('Failed to delete review. You do not have rights to perform this action.');
      alert('Review deleted successfully');
      fetchReviews(); 
    } catch (err) {
      console.error('Error deleting review:', err);
      setError(err.message || 'Failed to delete review');
    }
  };

  const handleEdit = (reviewId) => {
    navigate(`/edit-review/${reviewId}/${serviceId}`);
  };

  return (
    <div className="reviews-section">
      <h3>Reviews</h3>
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
            <button className="edit-button" onClick={() => handleEdit(review.id)}>Edit</button>
            <button className="delete-button" onClick={() => handleDelete(review.id)}>Delete</button>
          </div>
        </div>
      )) : <p>No reviews yet.</p>}
    </div>

  );
};

export default ReviewsSection;
