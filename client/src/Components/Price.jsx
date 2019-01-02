import React from 'react';
import NodiscountProduct from './NoDiscountProduct.jsx';
import DiscountProduct from './DiscountProduct.jsx';

const Price = (props) => {
  if (!props.product.discount) {
    return (
      <NodiscountProduct product={props.product}/>
    )
  } else {
    return (
      <DiscountProduct product={props.product}/>
    )
  }
};

export default Price;
