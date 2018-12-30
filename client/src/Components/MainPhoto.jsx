import React from 'react';

class MainPhoto extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      x: 0,
      y: 0
    }
  }

  setCoords (event) {
    const x = event.clientX;
    const y = event.clientY;
    this.setState({
      x: x,
      y: y,
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
          style={{backgroundPosition: `${this.state.x} ${this.state.y}`}}
            onMouseLeave={ () => {this.props.displayZoomBox()} }
            onMouseMove={ (e) => { this.setCoords(e) }}
          />
        </div>
        <div id='mk-zoom-box'>
          <img id='mk-zoom-img' src={this.props.mainPhoto.url}/>
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
