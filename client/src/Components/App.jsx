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
    const productId = window.location.pathname.split('/')[1]
    this.getPhotos(productId);
    this.getProduct(productId);
  }
  
  getPhotos(id) {
    axios.get(`http://localhost:3004/photos/${id}`) 
    .then((photos) => {
      this.setState({
        photoSideBar: photos.data
      });
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
    });
  }

  getProduct(id) {
    axios.get(`http://localhost:3004/products/${id}`)
    .then(results => {
     // const parsedDescription = JSON.parse(results.data.description);
     // console.log(parsedDescription)
     console.log(results.data)
      this.setState({
        currentProduct: results.data,
        currentDescription: [results.data.description]
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

//Note: 
  //The reason there is a this.state.currentDescription is b/c I was having trouble parsing the description in child components.
  