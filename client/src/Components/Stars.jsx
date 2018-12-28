import React from 'react';

const Stars = (props) => {
  console.log(props.product)
  const reviewAverage = props.product.review_average;

  if(reviewAverage === 1) {
    return (
      <span className='mk-stars-icon mk-stars-1'></span>
    )
  }

  if (reviewAverage === 2) {
    return (
      <span className='mk-stars-icon mk-stars-2'></span>
    )
  }

  if (reviewAverage === 3) {
    return (
      <span className='mk-stars-icon mk-stars-3'></span>
    )
  }

  if (reviewAverage === 4) {
    return (
      <span className='mk-stars-icon mk-stars-4'></span>
    )
  }

  if (reviewAverage === 5) {
    return (
      <span className='mk-stars-icon mk-stars-5'></span>
    )
  }
  return (
      <span></span>
  )
};

export default Stars;