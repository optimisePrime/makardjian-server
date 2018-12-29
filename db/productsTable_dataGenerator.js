const faker = require('faker');
const db = require('./db.js');


//  helper functions
let discount;
const discountGenerator = (stringPrice) => {
  let price = Number(stringPrice.slice(1));
  const randomNum = Math.floor(Math.random() * 10) + 1;
  const potentialDiscounts = [0.1, 0.2, 0.25, 0.3, 0.4, 0.5, 0.6, 0.7];
  const randomIndex = Math.floor(Math.random() * 8);

  if (randomNum <= 7) {
    discount = potentialDiscounts[randomIndex];
    const dollarsOff = price * discount;
    price -= dollarsOff;
    discount = ((discount * 100).toString() + '%');
    return ('$' + price.toFixed(2).toString());
  }
  return stringPrice;
};


//  generate a stringified object of a random number of loremIpsum paragraphs
const descriptionGenerator = () => {
  const randomNum = Math.floor(Math.random() * 8) + 1;
  const descriptionArray = [];

  for (let i = 0; i < randomNum; i++) {
    descriptionArray.push(faker.lorem.paragraph());
  }
  return JSON.stringify(descriptionArray);
};

//  generate a random average review score between 1 star and five stars
const reviewAverageGenerator = () => {
  const possibleScores = [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];
  const randomScore = Math.floor(Math.random() * 9);
  const result = possibleScores[randomScore];
  console.log(result);
  return result;
};


//  populate the products table with dynamic faker data
for (let i = 0; i < 100; i++) {
  discount = null;
  const productTitle = `${faker.commerce.productName()}, ${faker.lorem.sentence()}`.slice(0, -1);
  const vendorName = faker.company.companyName();
  const reviewAverage = reviewAverageGenerator();
  const reviewCount = Math.round((Math.random() * 3000));
  const answeredQuestions = Math.round((Math.random() * 49) + 1);
  const listPrice = faker.commerce.price(15.00, 5000, 2, '$');
  const price = discountGenerator(listPrice);
  const prime = Math.round(Math.random());
  const description = descriptionGenerator();

  //  build an array record to pass into the db.saveProductRecord function
  const record = [productTitle, vendorName, reviewAverage, reviewCount,
    answeredQuestions, listPrice, discount, price, prime, description];

  db.saveProductRecord(record);
}
