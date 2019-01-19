
////////MYSQL - ORIGINAL

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
      res.sendStatus(500).send();
    } else {
      res.send(photos);
    }
  });
};


/////////////REDIS
var redis = require("redis"),
    redisClient = redis.createClient();
 
redisClient.on("error", function (err) {
    console.log("Error " + err);
});

/////////////POSTGRES

const { Pool, Client } = require('pg')


const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/amazon';

//DROP TABLES

var dropProductsTablePG = function() {
  var pool = new Pool();
  pool.connect(function(err, client, done) {
    const query = {
      name: 'drop-product-table',
      text: `DROP TABLE if exists products`,
      values: null
    }
    client.query(query, (err, res) => {
      if (err) {
        console.log("err", err.stack)
      } else {
        console.log("Dropped products table")
      }
    })
  })
};

var dropPhotosTablePG = function() {
  var pool = new Pool();
  pool.connect(function(err, client, done) {
    if (err) {
      console.log(err);
    } else {
      const query = {
        name: 'drop-photos-table',
        text: `DROP TABLE if exists photos`,
        values: null
      }
      client.query(query, (err, res) => {
        if (err) {
          console.log("err", err.stack)
        } else {
          console.log("Dropped photos table")
        }
      })
    }
  })
};

//CREATE TABLES

var createProductTablePG = function() {
  var pool = new Pool();
  pool.connect(function(err, client, done) {
    if (err) {
      console.log(err);
    } else {
      const query = {
        name: 'create-product-table',
        text: `CREATE TABLE products(id serial PRIMARY KEY, product_title varchar(255) NOT NULL, vendor_name varchar(50) NOT NULL,
        review_average DECIMAL(2,1), review_count smallint DEFAULT 0, answered_questions integer, list_price varchar(15) NOT NULL,
        discount varchar(4), price varchar(15) NOT NULL, prime smallint NOT NULL,  description text)`,
        values: null
      }
      client.query(query, (err, res) => {
        if (err) {
          console.log("err", err.stack)
        } else {
          console.log("Created products table")
        }
      })
    }
  })
};



var createPhotosTablePG = function() {
  var pool = new Pool();
  pool.connect(function(err, client, done) {
    if (err) {
      console.log(err);
    } else {
      const query = {
        name: 'create-photos-table',
        text: `CREATE TABLE photos(photo_id serial PRIMARY KEY, main_url varchar(255) NOT NULL, zoom_url varchar(255) NOT NULL,
        product_id integer, main_photo smallint NOT NULL, FOREIGN KEY(product_id) REFERENCES products (id))`,
        values: null
      }
      client.query(query, (err, res) => {
        if (err) {
          console.log("err", err.stack)
        } else {
          console.log("Created photos table")
        }
      })
    }
  })
};



//READ TABLES


var pool = new Pool({max: 1000});
// pool.on('connect', () => {
//   console.log('connected to the db');
// });

var getProductPG = function(req, res) {
  var id = req.params.productId;
  const query = {
    name: 'fetch-product',
    text: 'SELECT * FROM products WHERE id = $1',
    values: [id]
  }
  redisClient.get(id, function(err, reply) {
    if (reply === null) {
      pool.query(query, function(err, data) {
        if (err) {
          console.log('error ')
        } else {
          res.send(data.rows[0]);
          redisClient.set(id, JSON.stringify(data.rows[0]))
        }
      }); 
    } else {
      res.send(JSON.parse(reply));
    }
  });
}


var getPhotosPG = function(req, res) {
  var id = req.params.productId;
  let record = '' + id + 'p';
  const query = {
    name: 'fetch-photos',
    text: 'SELECT * FROM photos WHERE product_id = $1',
    values: [id]
  }
  redisClient.get(record, function(err, reply) {
    if (reply === null) {
      pool.query(query, function(err, data) {
        if (err) {
          console.log('error ')
        } else {
          res.send(data.rows);
          redisClient.set(record, JSON.stringify(data.rows))
        }
      }); 
    } else {
      res.send(JSON.parse(reply));
    }
  });
}

//CREATE RECORDS FOR TABLES

  //PRODUCTS
const saveProductRecordPG = (req, res) => {
  const payload = req.body;
  //const newArrayRecord = ['Sample product', 'Acme Co.',3,123,9,'$13.95',1,'$13.95',1,'A fun game for the whole family'];
  const newArrayRecord = [payload.product_title, payload.vendor_name, payload.review_average, payload.review_count, payload.answered_questions, payload.list_price, payload.discount, payload.price, payload.prime, payload.description]
  var pool = new Pool();
  pool.connect(function(err, client, done) {
    const query = {
      name: 'insert-product',
      // id |product_title |vendor_name| review_average | review_count | answered_questions | list_price | discount |  price  | prime | description
      text: `INSERT INTO products (product_title, vendor_name, 
      review_average, review_count, answered_questions,
      list_price, discount, price, prime, description) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id`,
      values: newArrayRecord
    }
    client.query(query, (err, data) => {
      if (err) {
        console.log("err", err.stack);
        res.sendStatus(500);
      } else {
        console.log("Inserted item, the product ID is: ", data.rows[0].id);
        res.sendStatus(200);
      }
    })
  })
};

  //PHOTOS
  //SAMPLE QUERY: INSERT INTO photos (photo_id, main_url, zoom_url, product_id, main_photo ) VALUES ('http://wwww.google.com', 'http://www.google.com',9136000,1);
const savePhotoRecordPG = (req, res) => {
  const newArrayRecord = [payload.product_title, payload.vendor_name, payload.review_average, payload.review_count, payload.answered_questions, payload.list_price, payload.discount, payload.price, payload.prime, payload.description];
  var pool = new Pool();
  pool.connect(function(err, client, done) {
    const query = {
      name: 'insert-product',
      // id |product_title |vendor_name| review_average | review_count | answered_questions | list_price | discount |  price  | prime | description
      text: `INSERT INTO photos ( photo_id, main_url, zoom_url, product_id, main_photo ) VALUES ($1, $2, $3, $4)`,
      values: newArrayRecord
    }
    client.query(query, (err, data) => {
      if (err) {
        console.log("err", err.stack);
        res.sendStatus(500);
      } else {
        res.sendStatus(200);
      }
    })
  })
};


//UPDATE TABLES

//SAMPLE QUERY: `UPDATE products SET product_title = 'Sample product', vendor_name = 'Acme Co.',review_average = 3, 
 //       review_count = 123, answered_questions = 12, list_price = '$12.33', discount = 0, 
 //       price = '$12.33', prime = 0, description = 'A terrible game' WHERE id = 9900053`
const updateProductRecordPG = (req, res) => {
  const payload = req.body;
  const productId = req.params.productId;
  const updatedProductRecord = [payload.product_title, payload.vendor_name, payload.review_average, payload.review_count, payload.answered_questions, payload.list_price, payload.discount, payload.price, payload.prime, payload.description, productId]
  var pool = new Pool();
  pool.connect(function(err, client, done) {
    if (err) {
      console.log(err);
    } else {
      const query = {
        name: 'update-product',
        text: `UPDATE products SET product_title = $1, vendor_name = $2 ,review_average = $3, 
        review_count = $4, answered_questions = $5, list_price = $6, discount = $7, 
        price = $8, prime = $9, description = $10 WHERE id = $11`,
        values: updatedProductRecord
      }
      client.query(query, (err, data) => {
        if (err) {
          console.log("err", err.stack);
          res.sendStatus(500);
        } else {
          console.log("Success updating product in Postgres");
          res.sendStatus(200);
        }
      })
    }
  })
};


//DELETE TABLES
  //SAMPLE QUERY: DELETE FROM photos where product_id = 9123456;
  //DELETE from products where id = 9123456;
const deleteProductRecordPG = (req, res) => {
  const id = req.params.productId;
  var pool = new Pool();
  pool.connect(function(err, client, done) {
    const query = {
      name: 'delete-photo',
      text: `DELETE FROM photos WHERE product_id = $1`,
      values: [id]
    }
    client.query(query, (err, data) => {
      if (err) {
        console.log("err", err.stack)
      } else {
        const query = {
        name: 'delete-product',
        text: `DELETE FROM products WHERE id = $1`,
        values: [id]
      } 
        client.query(query, (err, data) => {
          if (err) {
            console.log("err", err.stack);
            res.sendStatus(500);
          } else {
            console.log("Success deleting product and photos");
            res.sendStatus(200);
          }
        })
      }
    })
  })
}

module.exports = {
  deleteProductRecordPG,
  updateProductRecordPG,
  getProductPG,
  saveProductRecordPG,
  getPhotosPG
}




