import React from 'react';

class MainPhoto extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      x: 0,
      y: 0,
    }
  }

  setCoords (event) {
    const x = event.clientX;
    const y = event.clientY;
    this.setState({
      x: -x,
      y: -y,
    })
    console.log(this.state.x, this.state.y)
  }

  render() {
    if (!this.props.showZoomBox) {
      return (
        <div id="mk-main-photo-wrapper">
          <div>
            <img id='mk-main-img' src={this.props.mainPhoto.url} alt="mainPhoto" 
              onMouseEnter={ () => {this.props.displayZoomBox()} }
              onMouseMove={ (e) => { this.setCoords(e) }}
            />
          </div>
          <div>
            <span id='mk-main-photo-caption'>
            Roll over image to zoom in
            </span>
          </div>
        </div>
      )
    } else {
      return (
        <div id="mk-main-photo-wrapper">
        <div>
          <img id='mk-main-img' src={this.props.mainPhoto.url} alt="mainPhoto" 
            onMouseLeave={ () => {this.props.displayZoomBox()} }
            onMouseMove={ (e) => { this.setCoords(e) }}
          />
        </div>
        <div id='mk-zoom-box'>
          <img id='mk-zoom-img' src={this.props.mainPhoto.url}
          style={{left: this.state.x, top: this.state.y}}/>
        </div>
        <div>
          <span id='mk-main-photo-caption'>
          Roll over image to zoom in
          </span>
        </div>
      </div>
      )
    }
  }
}

export default MainPhoto;


/*
Plan for implementing the zoom feature on a single product: 
  /I need to make a new column in my photo table which will have a boolean value. Row name: 'zoom_photo'
  /When I seed the photo table for a given product, I'll add all of the photos I have to the table 
  ####COME BACK TO THIS PLAN AFTER I SEE IT WORK ONCE
*/