import React from 'react';
import PhotoColumn from './PhotoColumn.jsx';
import ProductColumn from './ProductColumn.jsx';

const ProductOverview = (props) => {
  return (
    <div id='mk-product-overview'>
      <PhotoColumn photoSideBar={props.photoSideBar} mainPhoto={props.mainPhoto} 
        highlightedThumbnail={props.highlightedThumbnail} changeMainPhoto={props.changeMainPhoto}
        showZoomBox={props.showZoomBox} displayZoomBox={props.displayZoomBox}/>
      <ProductColumn product={props.product} description={props.description} />
    </div>
  )
}

export default ProductOverview;
