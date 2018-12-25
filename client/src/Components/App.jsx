import React from 'react';
import PhotoSideBar from './PhotoSideBar.jsx';
import MainPhoto from './MainPhoto.jsx';
import ProductHeader from './ProductHeader.jsx';
import Price from './Price.jsx';
import Description from './Description.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photoSideBar: [],
      mainPhoto: {}
    };
    this.getPhotos = this.getPhotos.bind(this);
  }

  componentDidMount() {
    this.getPhotos();
  }
  
  getPhotos() {
      axios.get('/photos/4')
      .then((photos) => {
        this.setState({
          photoSideBar: photos.data
        })
      })
      .then(() => {
        // console.log(this.state.photoSideBar)
        this.state.photoSideBar.forEach(photo => {
          if (photo.main_photo === 1) {
            this.setState({
              mainPhoto: photo
            });
          }
        });
      })
  }

  render() {
    return (
      <div data-test="component-app" id="product-overview">
        <div id="mk-temp-nav-bar"></div>
        <div id="mk-nav-ad">ADVERTISEMENT BANNER</div>
        <PhotoSideBar photoSideBar={this.state.photoSideBar}/>
        <MainPhoto mainPhoto={this.state.mainPhoto}/>
        {/* <ProductHeader />
        <Price />
        <Description /> */}
      </div>
    );
  }
}

export default App;