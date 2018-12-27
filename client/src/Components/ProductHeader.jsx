import React from 'react';

const ProductHeader = (props) => {
  return (
      <div id='mk-product-header'>
          <div>
              <h1>
                <span id='mk-product-title'>{props.product.product_title}</span>
              </h1>
          </div>
          <div className='mk-product-vendor'>
            <p>{props.product.vendor_name}</p>
          </div>
          <div className='mk-review-average'>
          </div>
          <div className='mk-review-count'>
            {props.product.review_count} customer reviews |
          </div>
          <div className='mk-answered-questions'>
            {props.product.answered_questions} answered questions
          </div>
      </div>
  )
};

export default ProductHeader;

