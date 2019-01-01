const db = require('./db.js');

const products = [];
products.push([
  ['https://images-na.ssl-images-amazon.com/images/I/61bMV3oE-8L._SX879_.jpg', 'https://images-na.ssl-images-amazon.com/images/I/61bMV3oE-8L._SL1010_.jpg'],
  ['https://images-na.ssl-images-amazon.com/images/I/81s-7zDprgL._SY879_.jpg', 'https://images-na.ssl-images-amazon.com/images/I/81s-7zDprgL._SL1500_.jpg'],
  ['https://images-na.ssl-images-amazon.com/images/I/61IVFlGBFKL._SY879_.jpg', 'https://images-na.ssl-images-amazon.com/images/I/61IVFlGBFKL._SL1500_.jpg'],
  ['https://images-na.ssl-images-amazon.com/images/I/710iVeIJ8VL._SY879_.jpg', 'https://images-na.ssl-images-amazon.com/images/I/710iVeIJ8VL._SL1500_.jpg'],
  ['https://images-na.ssl-images-amazon.com/images/I/6108wq2-%2ByL._SY879_.jpg', 'https://images-na.ssl-images-amazon.com/images/I/6108wq2-%2ByL._SL1500_.jpg']
]);
products.push([
  ['https://images-na.ssl-images-amazon.com/images/I/911bSgYftRL._SX679_.jpg', 'https://images-na.ssl-images-amazon.com/images/I/911bSgYftRL._SL1500_.jpg'],
  ['https://images-na.ssl-images-amazon.com/images/I/81RfwQM63QL._SX679_.jpg', 'https://images-na.ssl-images-amazon.com/images/I/81RfwQM63QL._SL1500_.jpg'],
  ['https://images-na.ssl-images-amazon.com/images/I/71OBoU4KN0L._SX679_.jpg', 'https://images-na.ssl-images-amazon.com/images/I/71OBoU4KN0L._SL1500_.jpg'],
  ['https://images-na.ssl-images-amazon.com/images/I/81ry941DTDL._SX679_.jpg', 'https://images-na.ssl-images-amazon.com/images/I/81ry941DTDL._SL1500_.jpg'],
  ['https://images-na.ssl-images-amazon.com/images/I/91hhCXj9dbL._SX679_.jpg', 'https://images-na.ssl-images-amazon.com/images/I/91hhCXj9dbL._SL1500_.jpg'],
  ['https://images-na.ssl-images-amazon.com/images/I/81xm%2BPZlZQL._SX679_.jpg', 'https://images-na.ssl-images-amazon.com/images/I/81xm%2BPZlZQL._SL1500_.jpg'],
]);

const photoGenerator = (productId) => {
  const randomIndex = Math.floor(Math.random() * 2);
  const randomProduct = products[randomIndex]; 

  for (let j = 0; j < randomProduct.length; j++) {
    if (j === 0) {
      db.savePhotoRecord(randomProduct[j][0], randomProduct[j][1], productId, 1)
    } else {
      db.savePhotoRecord(randomProduct[j][0], randomProduct[j][1], productId, 0)
    }
  }
};

for (let i = 1; i < 101; i++) {
  photoGenerator(i);
}
