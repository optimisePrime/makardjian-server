import React from 'react';

const PhotoSideBar = (props) => {

    const photosArray = props.productPhotos.map(photo => (
        <PhotoThumbnail thumbnail={photo} />
    ));

    return (
        <div id="photo-side-bar-mk">{photosArray}</div>
    )
}

export default PhotoSideBar;


/*
the PhotoSideBar should be an unordered list and for each photo, a PhotoEntry mod
should be invoked.
*/