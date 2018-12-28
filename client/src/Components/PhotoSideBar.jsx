import React from 'react';
import PhotoThumbnail from './PhotoThumbnail.jsx';

const PhotoSideBar = (props) => {
  return (
    <ul id='mk-photo-sidebar-container'>
      {
        props.photoSideBar.map(photo =>
          <PhotoThumbnail thumbnail={photo} changeMainPhoto={props.changeMainPhoto}/>
        )
      }
    </ul>
  )
}

export default PhotoSideBar;


/*
the PhotoSideBar should be an unordered list and for each photo, a PhotoEntry mod
should be invoked.
*/