var faker = require('faker');
var db = require('./db/db.js')

//generate a random number of photos of the same category 
var photoGenerator = (product_id) => {
	var photoCategories = ['animals', 'cats', 'city', 'food', 'fashion', 
	'nature', 'sports', 'transport'];

	var randomIndex = Math.floor(Math.random() * 7) + 1;
	var randomCategory = photoCategories[randomIndex];
	var fakerData = faker.image[randomCategory]


	var numberOfPhotos = Math.floor(Math.random() * 6) + 3;
	var randomURL;

	for (var i =0; i < numberOfPhotos; i++) {
		randomURL = fakerData();
		if (i === 0) {
			db.savePhotoRecord(randomURL, product_id, 1)
		} else {
			db.savePhotoRecord(randomURL, product_id, 0)
		}
	}
}

//populate the photos table with a random number of photos for each product
for (var j = 1; j < 101; j++) {
	photoGenerator(j);
}

