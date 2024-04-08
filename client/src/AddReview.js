import React, { useState } from 'react';


const AddReview = ({ serviceId }) => {
  const [rating, setRating] = useState('1'); 
  const [comment, setComment] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (!comment.trim()) {
      setErrorMessage('Please fill out the comment field.');
      return;
    }

    if (!token) {
      alert('You must be logged in to add a review.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/createReview', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
        body: JSON.stringify({ serviceId, rating, comment }),
      });

      if (response.ok) {
        alert('Review added successfully');
        setRating('1'); 
        setComment('');
        setErrorMessage('');
      } else {
        alert('Failed to add review');
      }
    } catch (error) {
      console.error('Error adding review:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-review-form">
      <h3>Add Review</h3>
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
      {errorMessage && <div className="form-error">{errorMessage}</div>}
      <button type="submit">Submit Review</button>
    </form>
  );
};

export default AddReview;
