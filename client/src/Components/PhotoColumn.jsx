import React from 'react';
import MainPhoto from './MainPhoto.jsx';
import PhotoSideBar from './PhotoSideBar.jsx';

const PhotoColumn = (props) => {
  return (
    <div id='mk-photo-column'>      
      <PhotoSideBar photoSideBar={props.photoSideBar}/>
      <MainPhoto mainPhoto={props.mainPhoto}/>
    </div>
  )
}

export default PhotoColumn;