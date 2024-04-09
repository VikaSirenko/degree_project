import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './css/EditReview.css'; 

const EditReview = () => {
  const { reviewId, serviceId } = useParams();
  const navigate = useNavigate();
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      setError('You must be logged in to edit a review.');
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
              throw new Error('You do not have permission to perform this action.');
            }
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to fetch review data');
          }
          const data = await response.json();
          setRating(data.rating);
          setComment(data.comment);
        } catch (err) {
            console.error('Error fetching review data:', err);
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
      setError('You must be logged in to update a review.');
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
        throw new Error(errorData.message || 'Failed to update review');
      }
      alert('Review updated successfully');
      navigate(-1);
    } catch (err) {
      console.error('Error updating review:', err);
      setError(err.message || 'An error occurred');
    }
  };

  return (
    <div className="edit-review-form">
      <h2>Edit Review</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Rating:
          <input
            type="number"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            min="1"
            max="5"
          />
        </label>
        <label>
          Comment:
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </label>
        <button type="submit" disabled={!token}>Update Review</button>
      </form>
    </div>
  );
};

export default EditReview;
