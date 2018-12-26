import React from 'react';
import ProductHeader from './ProductHeader.jsx'
import Price from './Price.jsx';
import Description from './Description.jsx';

const ProductColumn = (props) => (
    <div id='mk-product-column'>
        <ProductHeader product={props.product} />
        {/* <Price product={props.product} />
        <Description product={props.product}/> */}
    </div>
);

export default ProductColumn;
