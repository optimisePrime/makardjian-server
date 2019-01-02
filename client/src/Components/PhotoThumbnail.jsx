import React from 'react';

class PhotoThumbnail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      focusThumbnail: {},
    };
    // console.log(props)
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
              src={this.props.thumbnail.main_url}
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
              <img id={JSON.stringify(this.props.thumbnail)} className='mk-photo-thumbnail' src={this.props.thumbnail.main_url}
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
