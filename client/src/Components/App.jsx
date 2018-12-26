import React from 'react';
import PhotoSideBar from './PhotoSideBar.jsx';
import MainPhoto from './MainPhoto.jsx';
import ProductColumn from './ProductColumn.jsx'
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photoSideBar: [],
      mainPhoto: {},
      currentProduct: {},
    };
  }

  componentDidMount() {
    const randomId = Math.floor((Math.random() * 100) + 1)
    this.getPhotos(randomId);
    this.getProduct(randomId);
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
      console.log(data.data[0].description)
      // console.log(parsed);
      this.setState({
        currentProduct: data.data[0]
      });
    });
  }

  render() {
    return (
      <div data-test="component-app" id="product-overview">
        <div id="mk-temp-nav-bar"></div>
        <div id="mk-nav-ad">ADVERTISEMENT BANNER</div>
        <PhotoSideBar photoSideBar={this.state.photoSideBar}/>
        <MainPhoto mainPhoto={this.state.mainPhoto}/>
        <ProductColumn product={this.state.currentProduct} />
      </div>
    );
  }
}

export default App;
