import React from 'react';
import ProductOverview from './ProductOverview.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photoSideBar: [],
      mainPhoto: {},
      highlightedThumbnail: {},
      currentProduct: {},
      currentDescription: [],
      showZoomBox: false,
    };
  }

  componentDidMount() {
    // const randomId = Math.floor((Math.random() * 100) + 1);
    this.getPhotos(2);
    this.getProduct(2);
  }
  
  getPhotos(id) {
    axios.get(`/photos/${id}`) 
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
            mainPhoto: photo,
            highlightedThumbnail: photo,
          });
        }
      });
    })
  }

  getProduct(id) {
    axios.get(`/products/${id}`)
    .then(data => {
      const parsed = JSON.parse(data.data[0].description);
      this.setState({
        currentProduct: data.data[0],
        currentDescription: parsed,
      });
    });
  };

  changeMainPhoto (photo) {
    this.setState({
      mainPhoto: photo,
      highlightedThumbnail: photo
    });
  };

  displayZoomBox () {
    this.setState({
      showZoomBox: !this.state.showZoomBox
    });
  }

  render() {
    return (
      <div data-test="component-app" id="mk-product-overview">
        <div id="mk-temp-nav-bar"></div>
        <div id="mk-nav-ad">ADVERTISEMENT BANNER</div>
        <ProductOverview product={this.state.currentProduct} description={this.state.currentDescription}
          photoSideBar={this.state.photoSideBar} mainPhoto={this.state.mainPhoto} 
          highlightedThumbnail={this.state.highlightedThumbnail} showZoomBox={this.state.showZoomBox}
          changeMainPhoto={this.changeMainPhoto.bind(this)}
          displayZoomBox={this.displayZoomBox.bind(this)}/>
      </div>
    );
  };
};

export default App;
