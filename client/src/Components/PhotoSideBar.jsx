import React from 'react';
import PhotoThumbnail from './PhotoThumbnail.jsx';

const PhotoSideBar = (props) => {
  return (
    <ul id='mk-photo-sidebar-container'>
      {
        props.photoSideBar.map(photo =>
          <PhotoThumbnail thumbnail={photo} changeMainPhoto={props.changeMainPhoto} highlightedThumbnail={props.highlightedThumbnail} />
        )
      }
    </ul>
  )
};

export default PhotoSideBar;

/*
12/28/18:
For some reason highlightedThumbnail is not being passed down to the next component
*/
