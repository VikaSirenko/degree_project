import React, { useState } from 'react';
import { useLanguage } from './LanguageContext';


const AddReview = ({ serviceId }) => {
  const [rating, setRating] = useState('1'); 
  const [comment, setComment] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { translations } = useLanguage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (!comment.trim()) {
      setErrorMessage(translations.addReview.fillInError);
      return;
    }

    if (!token) {
      alert(translations.addReview.logInError);
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
        alert(translations.addReview.successfulAlert);
        setRating('1'); 
        setComment('');
        setErrorMessage('');
        window.location.reload();
      } else {
        alert(translations.addReview.failedAlert);
      }
    } catch (error) {
      console.error(translations.addReview.anyAddingError, error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-review-form">
      <h3>{translations.addReview.title}</h3>
      <label>
      {translations.addReview.rating}
        <input 
          type="number" 
          value={rating} 
          onChange={(e) => setRating(e.target.value)} 
          min="1" 
          max="5" 
        />
      </label>
      <label>
        {translations.addReview.comment}
        <textarea 
          value={comment} 
          onChange={(e) => setComment(e.target.value)} 
        />
      </label>
      {errorMessage && <div className="form-error">{errorMessage}</div>}
      <button type="submit">{translations.addReview.submitButton}</button>
    </form>
  );
};

export default AddReview;
