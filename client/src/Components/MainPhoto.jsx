import React from 'react';

const MainPhoto = (props) => (
  <div id="mk-main-photo-wrapper">
    <img id='mk-main-img' src={props.mainPhoto.url} alt="mainPhoto"/>
    <div>
      <span id='mk-main-photo-caption'>
        Roll over image to zoom in
      </span>
    </div>
  </div>
)

export default MainPhoto;
