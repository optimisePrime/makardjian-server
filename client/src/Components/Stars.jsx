import React from 'react';

const Stars = (props) => {
  const reviewAverage = props.product.review_average;

  if (reviewAverage === 0.5) {
    return (
      <span className='mk-stars-icon mk-stars-0-5'></span>
    )
  }

  if (reviewAverage === 1) {
    return (
      <span className='mk-stars-icon mk-stars-1'></span>
    )
  }

  if (reviewAverage === 1.5) {
    return (
      <span className='mk-stars-icon mk-stars-1-5'></span>
    )
  }

  if (reviewAverage === 2) {
    return (
      <span className='mk-stars-icon mk-stars-2'></span>
    )
  }

  if (reviewAverage === 2.5) {
    return (
      <span className='mk-stars-icon mk-stars-2-5'></span>
    )
  }

  if (reviewAverage === 3) {
    return (
      <span className='mk-stars-icon mk-stars-3'></span>
    )
  }

  if (reviewAverage === 3.5) {
    return (
      <span className='mk-stars-icon mk-stars-3-5'></span>
    )
  }

  if (reviewAverage === 4) {
    return (
      <span className='mk-stars-icon mk-stars-4'></span>
    )
  }

  if (reviewAverage === 4.5) {
    return (
      <span className='mk-stars-icon mk-stars-4-5'></span>
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
