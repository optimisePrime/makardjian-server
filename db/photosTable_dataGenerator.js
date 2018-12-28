const faker = require('faker');
const db = require('./db.js');

//  generate a random number of photos of the same category
const photoGenerator = (productId) => {
  const photoCategories = ['animals', 'cats', 'city', 'food', 'fashion',
    'nature', 'sports', 'transport'];

  const numberOfPhotos = Math.floor(Math.random() * 6) + 3;
  for (let i = 0; i < numberOfPhotos; i++) {
    const randomIndex = Math.floor(Math.random() * 7) + 1;
    const randomCategory = photoCategories[randomIndex];
    const fakerData = faker.image[randomCategory];
    const randomURL = fakerData();
    if (i === 0) {
      db.savePhotoRecord(randomURL, productId, 1);
    } else {
      db.savePhotoRecord(randomURL, productId, 0);
    }
  }
};

//  populate the photos table with a random number of photos for each product
for (let j = 1; j < 101; j++) {
  photoGenerator(j);
}
