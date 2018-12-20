var mysql = require('mysql');

var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'Mightymang0',
	database: 'product_overview'
});

connection.connect();


var saveProductRecord = (arrayRecord) => {
	var query = `INSERT INTO products 
	(product_title, vendor_name, review_average, review_count, answered_questions,
	list_price, discount, price, prime, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
	connection.query(query, arrayRecord, (err, results) => {
		if (err) {
			throw (err)
		} else {
			console.log('success')
		}
	})
}

var savePhotoRecord = (url, product_id, mainPhotoBool) => {
	var query = `INSERT INTO photos (url, product_id, main_photo) VALUES ('${url}', ${id}, ${mainPhotoBool});`
	connection.query(query, (err, results) => {
		if (err) {
			throw (err);
		} else {
			console.log('success')
		}
	});
}



module.exports = {
	saveProductRecord: saveProductRecord,
	savePhotoRecord: savePhotoRecord
};