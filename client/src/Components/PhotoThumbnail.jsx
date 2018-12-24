import React from 'react';

const PhotoThumbnail = (props) => {
  return (
  <li className='mk-photo-thumbnail'>
      <img src={props.thumbnail.url} alt="thumbnail" height="50px" width="50px"/>
  </li>
  )
}

export default PhotoThumbnail;