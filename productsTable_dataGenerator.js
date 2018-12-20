var faker = require('faker');
var db = require('./db/db.js')


//helper functions
var discountGenerator = (stringPrice) => {
	var price = Number(stringPrice.slice(1))
	var randomNum = Math.floor(Math.random() * 10) + 1; //generates a random number between 1 and 10
	var potentialDiscounts = [0.1, 0.2, 0.25, 0.3, 0.4, 0.5, 0.6, 0.7]
	var randomIndex = Math.floor(Math.random() * 8); // generates a random number to correspond to a potential discount

	if (randomNum <= 7) {
		discount = potentialDiscounts[randomIndex];
		price = price * discount;
		discount = ((discount*100).toString() +'%');
		return ('$' + price.toFixed(2).toString())
	}
	return stringPrice;
}


//generate a stringified object of a random number of loremIpsum paragraphs
var descriptionGenerator = () => {
	var randomNum = Math.floor(Math.random() * 8) + 1;
	var descriptionObj ={};

	for (var i = 0; i < randomNum; i++) {
		descriptionObj[i] = faker.lorem.paragraph();
	}
	return JSON.stringify(descriptionObj);
}


//populate the products table with dynamic faker data
for (var i =0; i < 100; i++) {

	var productTitle = faker.commerce.productName();
	var vendorName = faker.company.companyName();
	var reviewAverage = Number((Math.random() * (5 - 1) + 1).toFixed(1));
	var reviewCount = Math.round((Math.random() * 3000));
	var answeredQuestions = Math.round((Math.random() * 49) + 1)
	var listPrice = faker.commerce.price(15.00,5000,2,"$");
	var discount = null;
	var price = discountGenerator(listPrice);
	var prime = Math.round(Math.random());
	var description = descriptionGenerator();



	//build an array record to pass into the db.saveProductRecord function
	var record = [productTitle, vendorName, reviewAverage, reviewCount, 
	answeredQuestions, listPrice, discount, price, prime, description]

	db.saveProductRecord(record)

}



