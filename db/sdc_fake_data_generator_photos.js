var fs = require('fs');
var path = require('path');
var os = require('os');
var faker = require('faker');
var copyFrom = require('pg-copy-streams').from;
var util = require('util');


const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/amazon';

const { Pool, Client } = require('pg')

var filename = path.join(__dirname, 'photos1.csv');

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
  ['https://images-na.ssl-images-amazon.com/images/I/71OBoU4KN0L._SX679_.jpg', 'https://images-na.ssl-images-amazon.com/images/I/71OBoU4KN0L._SL1500_.jpg'],
  ['https://images-na.ssl-images-amazon.com/images/I/81ry941DTDL._SX679_.jpg', 'https://images-na.ssl-images-amazon.com/images/I/81ry941DTDL._SL1500_.jpg'],
  ['https://images-na.ssl-images-amazon.com/images/I/91hhCXj9dbL._SX679_.jpg', 'https://images-na.ssl-images-amazon.com/images/I/91hhCXj9dbL._SL1500_.jpg'],
  ['https://images-na.ssl-images-amazon.com/images/I/81xm%2BPZlZQL._SX679_.jpg', 'https://images-na.ssl-images-amazon.com/images/I/81xm%2BPZlZQL._SL1500_.jpg'],
]);
products.push([
  ['https://images-na.ssl-images-amazon.com/images/I/81OAEATjUAL._SX679_.jpg', 'https://images-na.ssl-images-amazon.com/images/I/81OAEATjUAL._SL1500_.jpg'],
  ['https://images-na.ssl-images-amazon.com/images/I/81%2BDlE33ZXL._SX679_.jpg', 'https://images-na.ssl-images-amazon.com/images/I/81%2BDlE33ZXL._SL1500_.jpg'],
  ['https://images-na.ssl-images-amazon.com/images/I/81PTwrJ5L9L._SX679_.jpg', 'https://images-na.ssl-images-amazon.com/images/I/81PTwrJ5L9L._SL1500_.jpg'],
  ['https://images-na.ssl-images-amazon.com/images/I/61QvN3AaetL._SX679_.jpg', 'https://images-na.ssl-images-amazon.com/images/I/61QvN3AaetL._SL1500_.jpg'],
  ['https://images-na.ssl-images-amazon.com/images/I/81PTwrJ5L9L._SX679_.jpg', 'https://images-na.ssl-images-amazon.com/images/I/81PTwrJ5L9L._SL1500_.jpg'],
]);
products.push([
  ['https://images-na.ssl-images-amazon.com/images/I/81OO%2BFAOmpL._SX679_.jpg', 'https://images-na.ssl-images-amazon.com/images/I/81OO%2BFAOmpL._SL1500_.jpg'],
  ['https://images-na.ssl-images-amazon.com/images/I/91j39xqQmYL._SX679_.jpg', 'https://images-na.ssl-images-amazon.com/images/I/91j39xqQmYL._SL1500_.jpg'],
  ['https://images-na.ssl-images-amazon.com/images/I/81Uh627QM1L._SX679_.jpg', 'https://images-na.ssl-images-amazon.com/images/I/81Uh627QM1L._SL1500_.jpg'],
]);
products.push([
  ['https://images-na.ssl-images-amazon.com/images/I/91Sv3ReNw1L._UX679_.jpg', 'https://images-na.ssl-images-amazon.com/images/I/91Sv3ReNw1L._UL1500_.jpg'],
  ['https://images-na.ssl-images-amazon.com/images/I/714Xf4mfEHL._UY879_.jpg', 'https://images-na.ssl-images-amazon.com/images/I/714Xf4mfEHL._UL1500_.jpg'],
  ['https://images-na.ssl-images-amazon.com/images/I/816GemF356L._UY879_.jpg', 'https://images-na.ssl-images-amazon.com/images/I/816GemF356L._UL1500_.jpg'],
  ['https://images-na.ssl-images-amazon.com/images/I/81sR5lnPSEL._UY879_.jpg', 'https://images-na.ssl-images-amazon.com/images/I/81sR5lnPSEL._UL1500_.jpg'],
  ['https://images-na.ssl-images-amazon.com/images/I/91unmglFkZL._UY879_.jpg', 'https://images-na.ssl-images-amazon.com/images/I/91unmglFkZL._UL1500_.jpg'],
]);
products.push([
  ['https://images-na.ssl-images-amazon.com/images/I/61xO8iHvHGL._UX679_.jpg', 'https://images-na.ssl-images-amazon.com/images/I/61xO8iHvHGL.UL1000.jpg'],
  ['https://images-na.ssl-images-amazon.com/images/I/61VqgbO1jeL._UX679_.jpg', 'https://images-na.ssl-images-amazon.com/images/I/61VqgbO1jeL._UL1000_.jpg'],
  ['https://images-na.ssl-images-amazon.com/images/I/61Q2VAxjXDL._UX679_.jpg', 'https://images-na.ssl-images-amazon.com/images/I/61Q2VAxjXDL._UL1000_.jpg'],
  ['https://images-na.ssl-images-amazon.com/images/I/71f0rd1qtWL._UX679_.jpg', 'https://images-na.ssl-images-amazon.com/images/I/71f0rd1qtWL._UL1000_.jpg'],
]);

var output = [];

var clearFile = function() {
  var data = '';
  fs.writeFileSync(filename, data);
  console.log('Done clearing file')
}

clearFile();

const photoGenerator = (productId) => {
  const randomIndex = Math.floor(Math.random() * products.length);
  const randomProduct = products[randomIndex]; 

  for (let j = 0; j < randomProduct.length; j++) {
    if (j === 0) {
      var result = [randomProduct[j][0], randomProduct[j][1], productId, 1];
    } else {
      var result = [randomProduct[j][0], randomProduct[j][1], productId, 0];
    }
    output.push(result.join());
  }
};


for (let i = 1; i < 50000; i++) {
  photoGenerator(i);
}

fs.writeFileSync(filename, output.join(os.EOL));


var writeToDbPG = function(input) {
    console.log("Currently on loop #", input)
    if (input < 250) {
      var pool = new Pool()
      pool.connect(function(err, client, done) {
        if (err) {
          console.log('err connecting', err)
        } else {
          var stream = client.query(copyFrom('COPY photos (main_url, zoom_url, product_id, main_photo) FROM STDIN CSV'));
          console.log('in stream')
          var fileStream = fs.createReadStream('photos1.csv');
          fileStream.on('error', (error) => console.log("Error reading file", error));
          stream.on('error', (error) => console.log("Error in copy command", error));
          stream.on('end', () => {
              client.release(true);
              writeToDb(input + 1);
            })
          fileStream.pipe(stream)
      }
    })
      pool.end();
    }
}



//writeToDb(0);

module.exports = {
  products
}











