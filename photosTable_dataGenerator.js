var faker = require('faker');
var db = require('./db/db.js')

var photoGenerator = () => {
	var photoCategories = ['animals', 'cats', 'city', 'food', 'fashion', 
	'nature', 'sports', 'transport'];

	var randomIndex = Math.floor(Math.random() * 7) + 1;
	var randomCategory = photoCategories[randomIndex];
	var fakerData = faker.image[randomCategory]


	var numberOfPhotos = Math.floor(Math.random() * 6) + 3;

	for (var i =0; i < numberOfPhotos; i++) {
		var randomURL = fakerData();
		if (i === 0) {
			db.savePhotoRecord(randomURL, i, 1)
		} else {
			db.savePhotoRecord(randomURL, i, 0)
		}
	}
}


for (var i = 0; i < 100; i++) {








}

