import React from 'react';

class PhotoThumbnail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mainPhoto: {},
    };
  }

  handleMouseHover(photo) {
    this.setState({
      mainPhoto: photo
    });
    this.props.changeMainPhoto(this.state.mainPhoto)
  }

  render() {
    return (
      <li className='mk-photo-sidebar-list'>
          <img id={JSON.stringify(this.props.thumbnail)} className='mk-photo-thumbnail' src={this.props.thumbnail.url}
          onMouseEnter={(e) => {
            const photoObj = JSON.parse(e.target.id);
            this.handleMouseHover(photoObj);
          }} 
          alt="thumbnail" height="50px" width="50px"/>
      </li>
    )
  }
}

export default PhotoThumbnail;
