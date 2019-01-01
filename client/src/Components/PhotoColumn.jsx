import React from 'react';
import MainPhoto from './MainPhoto.jsx';
import PhotoSideBar from './PhotoSideBar.jsx';

const PhotoColumn = (props) => {
  return (
    <div id='mk-photo-column'>      
      <PhotoSideBar photoSideBar={props.photoSideBar} changeMainPhoto={props.changeMainPhoto}
        highlightedThumbnail={props.highlightedThumbnail}/>
      <MainPhoto mainPhoto={props.mainPhoto} showZoomBox={props.showZoomBox}
        displayZoomBox={props.displayZoomBox}/>
    </div>
  )
}

export default PhotoColumn;