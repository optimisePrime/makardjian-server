import React from 'react';

const MainPhoto = (props) => (
  <div id="mk_main_photo">
    <img src={props.mainPhoto.url} alt="mainPhoto" height="500px" width="500px"/>
  </div>
)

export default MainPhoto;
