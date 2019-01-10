const mysql = require('mysql');

// const connection = mysql.createConnection({
//   host: '172.17.0.2',
//   user: 'root',
//   password: 'Mightymang0',
//   database: 'product_overview',
// });

// connection.connect();


const saveProductRecord = (arrayRecord) => {
  const query = `INSERT INTO products 
  (product_title, vendor_name, review_average, review_count, answered_questions,
  list_price, discount, price, prime, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  connection.query(query, arrayRecord, (err) => {
    if (err) {
      throw (err);
    } else {
      console.log('success');
    }
  });
};

const savePhotoRecord = (mainUrl, zoomUrl, productId, mainPhotoBool) => {
  const query = `INSERT INTO photos (main_url, zoom_url, product_id, main_photo) 
  VALUES ('${mainUrl}', '${zoomUrl}', ${productId}, ${mainPhotoBool});`;
  connection.query(query, (err) => {
    if (err) {
      throw (err);
    } else {
      console.log('success');
    }
  });
};

const getPhotos = (req, res) => {
  const productId = req.params.productId;
  const query = `SELECT * FROM photos WHERE product_id = ${productId};`;
  connection.query(query, (err, photos) => {
    if (err) {
      console.log(err);
      res.statusCode(500).send();
    } else {
      res.send(photos);
    }
  });
};

// const getProduct = (req, res) => {
//   const id = req.params.productId;
//   const query = `SELECT * FROM products WHERE id = ${id};`;
//   connection.query(query, (err, data) => {
//     if (err) {
//       res.statusCode(500).send();
//     } else {
//       res.send(data);
//     }
//   });
// };




/////////////POSTGRES

const { Pool, Client } = require('pg')

// const client = new Client({
//   host: 'database.server.com',
//   port: 3211,
//   user: 'avademartini',
//   password: 'secretpassword',
// })



const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/amazon';




var getProduct = function() {
  var pool = new Pool();
  pool.connect(function(err, client, done) {
    if (err) {
      console.log(err);
    } else {
      const query = {
        name: 'fetch-user',
        text: 'SELECT * FROM products WHERE id = $1',
        values: [1]
      }
      client.query(query, (err, res) => {
        if (err) {
          console.log("err", err.stack)
        } else {
          console.log(res.rows[0])
        }
      })
    }
  })
}

  getProduct();

module.exports = {
  saveProductRecord,
  savePhotoRecord,
  getPhotos,
  getProduct,
};
