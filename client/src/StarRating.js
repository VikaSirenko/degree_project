import React from 'react';

const StarRating = ({ rating }) => {
    const fullStar = '★';
    const emptyStar = '☆';
    const maxRating = 5;
    
    let stars = '';
    for (let i = 0; i < maxRating; i++) {
      stars += i < rating ? fullStar : emptyStar;
    }
  
    return <span className="star-rating">{stars}</span>;
  };

  export default StarRating;
  