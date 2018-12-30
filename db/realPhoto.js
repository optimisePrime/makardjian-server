const db = require('./db.js');

//  generate a random number of photos of the same category
const photoGenerator = (productId) => {
  const urls = ['https://images-na.ssl-images-amazon.com/images/I/61bMV3oE-8L._SX679_.jpg', 
    'https://images-na.ssl-images-amazon.com/images/I/81s-7zDprgL._SY879_.jpg',
    'https://images-na.ssl-images-amazon.com/images/I/61IVFlGBFKL._SY879_.jpg',
    'https://images-na.ssl-images-amazon.com/images/I/710iVeIJ8VL._SY879_.jpg',
    'https://images-na.ssl-images-amazon.com/images/I/6108wq2-%2ByL._SY879_.jpg',
  ];

  const numberOfPhotos = Math.floor(Math.random() * 3) + 2;
  for (let i = 0; i < numberOfPhotos; i++) {
    const randomIndex = Math.floor(Math.random() * 4) + 1;
    const randomURL = urls[randomIndex];
    if (i === 0) {
      db.savePhotoRecord(randomURL, productId, 1);
    } else {
      db.savePhotoRecord(randomURL, productId, 0);
    }
  }
};


photoGenerator(1);
