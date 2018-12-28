import React from 'react';
import PhotoColumn from './PhotoColumn.jsx';
import ProductColumn from './ProductColumn.jsx'
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photoSideBar: [],
      mainPhoto: {},
      currentProduct: {},
      currentDescription: [],
    };
  }

  componentDidMount() {
    // const randomId = Math.floor((Math.random() * 100) + 1)
    this.getPhotos(7);
    this.getProduct(7);
  }
  
  getPhotos(id) {
      axios.get(`/photos/${id}`) //figure out how to pass in the correct id dynamically
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

  getProduct(id) {
    axios.get(`/products/${id}`)
    .then(data => {
      const parsed = JSON.parse(data.data[0].description);
      this.setState({
        currentProduct: data.data[0],
        currentDescription: parsed,
      });
    });
  }

  render() {
    return (
      <div data-test="component-app" id="mk-product-overview">
        <div id="mk-temp-nav-bar"></div>
        <div id="mk-nav-ad">ADVERTISEMENT BANNER</div>
        <PhotoColumn photoSideBar={this.state.photoSideBar}
          mainPhoto={this.state.mainPhoto}/>
        <ProductColumn product={this.state.currentProduct} description={this.state.currentDescription} />
      </div>
    );
  }
}

export default App;
