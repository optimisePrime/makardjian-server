import React from 'react';
import PhotoThumbnail from './PhotoThumbnail.jsx'

const PhotoSideBar = (props) => {
  console.log(props.photoSideBar, 'from the photosidebar component');
  return (
      <ul id='mk-photo-sidebar'>
        {
         props.photoSideBar.map(photo =>
            <PhotoThumbnail thumbnail={photo} />
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