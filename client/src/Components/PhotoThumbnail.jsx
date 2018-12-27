import React from 'react';

const PhotoThumbnail = (props) => {
  return (
    <li className='mk-photo-sidebar-list'>
        <img className='mk-photo-thumbnail' src={props.thumbnail.url} alt="thumbnail" height="50px" width="50px"/>
    </li>
  )
}

export default PhotoThumbnail;
