
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
      res.statusCode(500).send();
    } else {
      res.send(photos);
    }
  });
};



/////////////POSTGRES

const { Pool, Client } = require('pg')


const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/amazon';

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
        product_id integer, main_photo smallint NOT NULL)`,
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


var getProductPG = function(req, res) {
  var id = req.params.productId;
  var pool = new Pool();
  pool.connect(function(err, client, done) {
    const query = {
      name: 'fetch-product',
      text: 'SELECT * FROM products WHERE id = $1',
      values: [id]
    }
    client.query(query, (err, data) => {
      if (err) {
        console.log("Error running query:", err.stack)
      } else {
        res.send(data.rows[0])
      }
    })
  })
}


getPhotosPG = function(productId) {
  var pool = new Pool();
  pool.connect(function(err, client, done) {
    if (err) {
      console.log(err);
    } else {
      const query = {
        name: 'fetch-photos',
        text: 'SELECT * FROM photos WHERE product_id = $1',
        values: [product_id]
      }
      client.query(query, (err, data) => {
        if (err) {
          console.log("err", err.stack)
        } else {
          console.log(data.rows[0])
          res.send(data.rows[0])
        }
      })
    }
  })  
}


const saveProductRecordPG = (arrayRecord) => {
  var pool = new Pool();
  pool.connect(function(err, client, done) {
    const query = {
      name: 'insert-product',
      text: `INSERT INTO products (product_title, vendor_name, 
      review_average, review_count, answered_questions,
      list_price, discount, price, prime, description) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
      values: arrayRecord
    }
    client.query(query, (err, res) => {
      if (err) {
        console.log("err", err.stack)
      } else {
        console.log(res)
        res.statusCode(500).send();
      }
    })
  })
};


const updateProductRecordPG = (id, newArrayRecord) => {
  var pool = new Pool();
  pool.connect(function(err, client, done) {
    var queryInputs = newArrayRecord.concat(id);
    if (err) {
      console.log(err);
    } else {
      const query = {
        name: 'update-product',
        text: `UPDATE products SET product_title = $1, vendor_name = $2 ,review_average = $3, 
        review_count = $4, answered_questions = $5, list_price = $6, discount = $7, 
        price = $8, prime = $9, description = $10 WHERE id = $11`,
        values: queryInputs
      }
      client.query(query, (err, res) => {
        if (err) {
          console.log("err", err.stack)
        } else {
          console.log("Success updating product in Postgres")
        }
      })
    }
  })
};

const deleteProductRecordPG = (id) => {
  var pool = new Pool();
  pool.connect(function(err, client, done) {
    const query = {
      name: 'delete-product',
      text: `DELETE FROM products WHERE ID = $1`,
      values: [id]
    }
    client.query(query, (err, res) => {
      if (err) {
        console.log("err", err.stack)
      } else {
        console.log("Deleted record")
      }
    })
  })
}

 // getProduct(64642266);

//deleteProductRecord(64658011)


///////////CASSANDRA

const async = require('async');
const assert = require('assert');
const cassandra = require('cassandra-driver');
const Uuid = cassandra.types.Uuid;


var client = new cassandra.Client({contactPoints : ['127.0.0.1'], localDataCenter: 'datacenter1', keyspace: 'students_details' });

var getProductCAS = function(productId) {
  client.connect(function(err,result){
    var query = 'SELECT * FROM amazon.products WHERE product_id = ?';
    client.execute(query,[productId], {prepare: true}, function(err, result){
      if(err){
        console.log("error, ", err)
      } else {
        console.log(result.rows[0])
        // console.log(res);
        // res.send(result.rows[0])
      }
    });
  });
}

var record = [`${Uuid.random()}`,'3' ,'beeUnbranded Plastic Chicken, Facilis totam porro ipsum eveniet explicabo rerum','Abernathy LLC','10','2484','12','$4300.00','50%','$2150.00','0','Voluptatem saepe officia sunt. Est non dolores quia consequuntur accusantium reiciendis eos placeat minima. Minus assumenda et natus minus. Ut numquam unde. Ipsum ut deleniti aut assumenda quam minima alias asperiores ea. Optio sint atque dolore in fugit non asperiores incidunt.', [['http', 'yo'], ['bro', 'yes']]]


var createDbCAS = function() {
  const id = cassandra.types.Uuid.random();

  async.series([
    function connect(next) {
      client.connect(next);
    },
    function createKeyspace(next) {
      const query = "CREATE KEYSPACE IF NOT EXISTS amazon WITH replication = {'class': 'SimpleStrategy', 'replication_factor': '3' }";
      client.execute(query, next);
    },
    function deleteTable(next) {
      const query = "DROP TABLE IF EXISTS amazon.products";
      client.execute(query, next);
    },
    function createTable(next) {
      const query = "CREATE TABLE IF NOT EXISTS amazon.products (product_id int, product_title text, vendor_name text, review_average decimal, review_count smallint, answered_questions int, list_price varchar, discount varchar, price varchar, prime smallint, description text, photos list<frozen <list<text>>>, PRIMARY KEY(product_id))";
      client.execute(query, next);
    }], function (err) {
    if (err) {
      console.error('There was an error', err.message, err.stack);
    }
    console.log('Shutting down');
    client.shutdown(() => {
      if (err) {
        throw err;
      }
    });
  });
}

var saveProductRecordCAS = function(arrayRecord) {
  client.connect(function(err,result){
    var query = 'INSERT INTO amazon.products (id, product_id, product_title, vendor_name, review_average, review_count, answered_questions, list_price, discount, price, prime, description, photos) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)';
    client.execute(query,arrayRecord, {prepare: true}, function(err, result){
      if(err){
        console.log("error, ", err)
      } else {
        console.log(result)
        // console.log(res);
        // res.send(result.rows[0])
      }
    });
  }); 
}

var deleteProductRecordCAS = function(productId) {
  client.connect(function(err,result){
    var query = 'DELETE from amazon.products where product_id = ?';
    client.execute(query,[productId], {prepare: true}, function(err, result){
      if(err){
        console.log("error, ", err)
      } else {
        console.log(result)
        // console.log(res);
        // res.send(result.rows[0])
      }
    });
  }); 
}

var updateProductRecordCAS = function(id, newArrayRecord) {
  newArrayRecord.push(id)
  client.connect(function(err,result){
    var query = `UPDATE amazon.products SET
          product_title = ?,
          vendor_name = ?,
          review_average = ?,
          review_count = ?,
          answered_questions = ?,
          list_price = ?,
          discount = ?,
          price = ?,
          prime = ?,
          description = ?,
          photos = ?
          WHERE product_id = ?`
    client.execute(query,newArrayRecord, {prepare: true}, function(err, result){
      if(err){
        console.log("error, ", err)
      } else {
        console.log(result)
      }
    });
  });   
}

//dropPhotosTablePG();
//createPhotosTablePG();


 //updateProductRecordCAS(3, ['beepoooop498r7234987r6239487r5632948r5672ad;lfkj340r7134rUnbranded Plastic Chicken, Facilis totam porro ipsum eveniet explicabo rerum','Abernathy LLC','10','2484','12','$4300.00','50%','$2150.00','0','Voluptatem saepe officia sunt. Est non dolores quia consequuntur accusantium reiciendis eos placeat minima. Minus assumenda et natus minus. Ut numquam unde. Ipsum ut deleniti aut assumenda quam minima alias asperiores ea. Optio sint atque dolore in fugit non asperiores incidunt.', [['http', 'yo'], ['bro', 'yes']]]);
//dropProductsTablePG();
//createTablePG();
//getProductCAS(3);


createDbCAS();
//saveProductRecordCAS(record);

// deleteProductRecordCAS(3);


module.exports = {
  deleteProductRecordPG,
  deleteProductRecordCAS,
  updateProductRecordPG,
  updateProductRecordCAS,
  getProductPG,
  getProductCAS,
  saveProductRecordPG,
  saveProductRecordCAS
}




