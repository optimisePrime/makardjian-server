import React from 'react';

const PhotoThumbnail = (props) => {
  return (
    <li className='mk-photo-sidebar-list'>
        <img className='mk-photo-thumbnail' src={props.thumbnail.url} alt="thumbnail" height="50px" width="50px"/>
    </li>
  )
}

export default PhotoThumbnail;


/*
Chagne to a staeful class component
  /the sate will have a current photo property which is default set to wherever main photo = 1;
  /if the user hovers his mouse over an image. the mainPhoto state property can be set to be the image thumbnail
  /that should then trigger a function that is passed down as a prop bound to the App context
    /this function will take in a photo object and set the whatever photo object that is passed in as the main photo
      on the page.
*/