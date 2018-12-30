import React from 'react';

class PhotoThumbnail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      focusThumbnail: {},
    };
  }

  componentDidMount() {
    this.setHighlightedThumbnail(this.props.highlightedThumbnail)
  }

  //sets local state of highlightedThumbnail when the component mounts
  setHighlightedThumbnail(thumbnail) {
      this.setState({
        focusThumbnail: thumbnail,
      });
  }

  handleMouseHover(photo) {
    this.props.changeMainPhoto(photo)
  }

  render() {
    if (this.state.highlightedThumbnail === this.props.thumbnail) {
      return (
        <li className='mk-photo-sidebar-list-item'>
            <img id={JSON.stringify(this.props.thumbnail)} className='mk-photo-thumbnail mk-highlighted-thumbnail' 
              src={this.props.thumbnail.url}
              onMouseEnter={(e) => {
                const photoObj = JSON.parse(e.target.id);
                this.handleMouseHover(photoObj);
            }} 
            alt="thumbnail" height="50px" width="50px"/>
        </li>
      )
    } else {
        return (
          <li className='mk-photo-sidebar-list-item'>
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
}

export default PhotoThumbnail;


/*
  When the page loads and the interpreter is mapping over the photoSideBar, we want to determine
  if the current photo that's being mapped over has a truthy mainphoto property. 
    /if yes, then set that photo equal to this.state.mainPhoto. 
  
  /then when you render the thumbnail to the DOM, a conditional render can check to see 
    if the thumbnail is the same as this.state.mainPhoto. If yes, then render with a default highlight. 
  
  /when a user hovers over a different photo, that will change the local state of mainPhoto which
  will in turn change which photo is highlighted. 

  /if you do this right, you can get rid of the hover css property.
*/