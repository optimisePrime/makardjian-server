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
    price *= discount;
    discount = ((discount * 100).toString() + '%');
    return ('$' + price.toFixed(2).toString());
  }
  return stringPrice;
};


//  generate a stringified object of a random number of loremIpsum paragraphs
const descriptionGenerator = () => {
  const randomNum = Math.floor(Math.random() * 8) + 1;
  const descriptionObj = {};

  for (let i = 0; i < randomNum; i++) {
    descriptionObj[i] = faker.lorem.paragraph();
  }
  return JSON.stringify(descriptionObj);
};


//  populate the products table with dynamic faker data
for (let i = 0; i < 100; i++) {
  const productTitle = faker.commerce.productName();
  const vendorName = faker.company.companyName();
  const reviewAverage = Number((Math.random() * (5 - 1) + 1).toFixed(1));
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
