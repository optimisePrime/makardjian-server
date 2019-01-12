const fs = require('fs');
const faker = require('faker');
var productArray = require('./cassandra_photos_all.js')


var discountGenerator = (stringPrice) => {
  let price = Number(stringPrice.slice(1));
  var randomNum = Math.floor(Math.random() * 10) + 1;
  var potentialDiscounts = [0.1, 0.2, 0.25, 0.3, 0.4, 0.5, 0.6, 0.7];
  var randomIndex = Math.floor(Math.random() * 8);

  if (randomNum <= 7) {
    discount = potentialDiscounts[randomIndex];
    var dollarsOff = price * discount;
    price -= dollarsOff;
    discount = ((discount * 100).toString() + '%');
    return ('$' + price.toFixed(2).toString());
  }
  return stringPrice;
};

var reviewAverageGenerator = () => {
  var possibleScores = [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];
  var randomScore = Math.floor(Math.random() * 9);
  var result = possibleScores[randomScore];
  return result;
};

var descriptionGenerator = () => {
  var randomNum = Math.floor(Math.random() * 8) + 1;
  return [faker.lorem.paragraph()];
};


const printer = function () {
  const fil = fs.createWriteStream('file.csv');
  let i = 0;
  const MAX_LIM = 1000000;

  const writer = function () {
    let result = true;

    // Write to file until we get false as fil.write()'s
    // result
    while (i < MAX_LIM && result) {
      var product_title = `"${faker.commerce.productName()}, ${faker.lorem.sentence().slice(0, -1)}"`;
      var vendor_name = `"${faker.company.companyName()}"`;
      var review_average = `${reviewAverageGenerator()}`;
      var review_count = `${Math.round((Math.random() * 3000))}`;
      var answered_questions = `${Math.round((Math.random() * 49) + 1)}`;
      var list_price = `${faker.commerce.price(15.00, 5000, 2, '$')}`;
      var discount = null;
      var id = i;
      var price = `${discountGenerator(list_price)}`;
      var prime = `${Math.round(Math.random())}`;
      var description = `"${descriptionGenerator()}"`;
      var photos = '['+`${productArray.products[Math.floor(Math.random() * productArray.products.length)]}`+']';

      result = fil.write(`${id}|${answered_questions}|${description}||${list_price}|${photos}|${price}|${prime}|${product_title}|${review_average}|${review_count}|${vendor_name}\n`);

      // even if the result is false, our write has been probably
      // written to the buffer. A false value denotes that the our last
      // write has resulted in buffered data, crossing the highWaterMark.
      // So, we have to increment the count.
      i += 1;
    }

    // Add an event listener if the last write was not
    // successful
    if (i < MAX_LIM)
      fil.once('drain', writer);
  }

  return writer;
}

const printty = printer();
printty();