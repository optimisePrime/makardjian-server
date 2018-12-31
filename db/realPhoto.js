const db = require('./db.js');

//  generate a random number of photos of the same category
const photoGenerator = (productId) => {
  const headphonesURL = [
    ['https://images-na.ssl-images-amazon.com/images/I/61bMV3oE-8L._SX679_.jpg', 'https://images-na.ssl-images-amazon.com/images/I/61bMV3oE-8L._SL1010_.jpg'],
    ['https://images-na.ssl-images-amazon.com/images/I/81s-7zDprgL._SY879_.jpg', 'https://images-na.ssl-images-amazon.com/images/I/81s-7zDprgL._SL1500_.jpg'],
    ['https://images-na.ssl-images-amazon.com/images/I/61IVFlGBFKL._SY879_.jpg', 'https://images-na.ssl-images-amazon.com/images/I/61IVFlGBFKL._SL1500_.jpg'],
    ['https://images-na.ssl-images-amazon.com/images/I/710iVeIJ8VL._SY879_.jpg', 'https://images-na.ssl-images-amazon.com/images/I/710iVeIJ8VL._SL1500_.jpg'],
    ['https://images-na.ssl-images-amazon.com/images/I/6108wq2-%2ByL._SY879_.jpg', 'https://images-na.ssl-images-amazon.com/images/I/6108wq2-%2ByL._SL1500_.jpg']
  ];

  const roadBike = [
    ['https://images-na.ssl-images-amazon.com/images/I/911bSgYftRL._SX679_.jpg', 'https://images-na.ssl-images-amazon.com/images/I/911bSgYftRL._SL1500_.jpg'],
    
  ]

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

/*
Store your product urls in arrays of arrays.
  [[Product1 photo 1, Product1 zoom photo 1], [product1 photo 2, Product 1 zoom photo 2]]
 */