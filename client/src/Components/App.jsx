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
      photoSideBar: ''
    };
    this.getPhotos = this.getPhotos.bind(this);
  }

  componentDidMount() {
    this.getPhotos();
  }
  
  getPhotos() {
      axios.get('/photos/4')
      .then(photos => {
        console.log(photos.data);
      })
  }

  render() {
    return (
      <div id="product-overview">
        <PhotoSideBar productPhotos={this.getPhotos}/>
        {/* <MainPhoto />
        <ProductHeader />
        <Price />
        <Description /> */}
      </div>
    );
  }
}

export default App;