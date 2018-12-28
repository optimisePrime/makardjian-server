import React from 'react';
import Stars from './Stars.jsx';

const ProductHeader = (props) => {
  return (
      <div id='mk-product-header'>
          <div>
              <h1>
                <span id='mk-product-title'>{props.product.product_title}</span>
              </h1>
          </div>
          <div id='mk-by-div'>
            by
            <a id='mk-by-line-anchor' href=''>{props.product.vendor_name}</a>
          </div>
          <div id='mk-review-summary'>
            <Stars product={props.product} />
            <span id='mk-stars-down-arrow'>   </span>
            <span>
              <a id='mk-review-count-anchor'>{props.product.review_count} customer reviews</a>
            </span>
            <span id='mk-ask-pipe'> | </span>
            <span id='mk-ask-questions'>
              <a>{props.product.answered_questions} answered questions</a>
            </span>
          </div>
          <hr/>
      </div>
  )
};

export default ProductHeader;

