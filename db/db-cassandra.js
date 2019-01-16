
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


///////////CASSANDRA

const async = require('async');
const assert = require('assert');
const cassandra = require('cassandra-driver');


var client = new cassandra.Client({contactPoints : ['127.0.0.1'], localDataCenter: 'datacenter1', keyspace: 'students_details' });

//CREATE KEYSPACE AND TABLE

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

//READ TABLE

//EXAMPLE: getProductCAS(3);

var getProductCAS = function(req, res) {
  var id = req.params.productId;
  client.connect(function(err,result){
    var query = 'SELECT * FROM amazon.products WHERE product_id = ?';
    client.execute(query,[id], {prepare: true}, function(err, data){
      if(err){
        console.log("error, ", err)
        res.sendStatus(500);
      } else {
        console.log(data.rows[0])
        res.send(data.rows[0])
      }
    });
  });
}


//CREATE NEW RECORD


//var record = [10000001, 'beeUnbranded Plastic Chicken','Abernathy LLC',10,2484,12,'$4300.00','50%','$2150.00',0,'Voluptatem saepe officia sunt. Est non dolores quia consequuntur accusantium reiciendis eos placeat minima. Minus assumenda et natus minus. Ut numquam unde. Ipsum ut deleniti aut assumenda quam minima alias asperiores ea. Optio sint atque dolore in fugit non asperiores incidunt.', [['http://www.google.com', 'http://www.microsoft.com'], ['http://www.amazon.com', 'http://facebook.com']]]
var saveProductRecordCAS = function(req, res) {
  const payload = req.body;
  client.connect(function(err,result){
    var query = 'INSERT INTO amazon.products (product_id, product_title, vendor_name, review_average, review_count, answered_questions, list_price, discount, price, prime, description, photos) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)';
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

//DELETE RECORD FROM TABLE

//SAMPLE QUERY: DELETE from amazon.products where product_id = 9123456;
var deleteProductRecordCAS = function(req, res) {
  var id = req.params.productId;
  client.connect(function(err,result){
    var query = 'DELETE from amazon.products where product_id = ?';
    client.execute(query,[id], {prepare: true}, function(err, result){
      if(err){
        console.log("error, ", err);
        res.sendStatus(500);
      } else {
        console.log(result);
        res.sendStatus(200);
      }
    });
  }); 
}

//UPDATE RECORD IN TABLE
//SAMPLE QUERY: UPDATE amazon.products SET product_title = 'Plastic chicken game', vendor_name = 'Acme Co.', review_average = 3,
  //  review_count = 123, answered_questions = 12, list_price = '$12.00', discount = '0',  price = '$12.00', prime = 0,
  //  description = 'A really bad game', photos = [['http://www.google.com', 'http://www.microsoft.com'], ['http://www.amazon.com', 'http://facebook.com']] WHERE product_id = 9900000;
var updateProductRecordCAS = function(req, res) {
  const payload = req.body;
  const productId = req.params.productId;
  const updatedProductRecord = [payload.product_title, payload.vendor_name, payload.review_average, payload.review_count, payload.answered_questions, payload.list_price, payload.discount, payload.price, payload.prime, payload.description, payload.photos, productId]
  //var newArrayRecord = ['beeUnbranded Plastic Chicken','Abernathy LLC',10,2484,12,'$4300.00','50%','$2150.00',0,'Voluptatem saepe officia sunt. Est non dolores quia consequuntur accusantium reiciendis eos placeat minima. Minus assumenda et natus minus. Ut numquam unde. Ipsum ut deleniti aut assumenda quam minima alias asperiores ea. Optio sint atque dolore in fugit non asperiores incidunt.', [['http://www.google.com', 'http://www.microsoft.com'], ['http://www.amazon.com', 'http://facebook.com']]]
  client.connect(function(err,result){
    var query = `UPDATE amazon.products SET product_title = ?, vendor_name = ?, review_average = ?,
    review_count = ?, answered_questions = ?, list_price = ?, discount = ?,  price = ?, prime = ?,
    description = ?, photos = ? WHERE product_id = ?`
    client.execute(query,updatedProductRecord, {prepare: true}, function(err, result){
      if(err){
        console.log("error, ", err);
        res.sendStatus(500);
      } else {
        console.log(result);
        res.sendStatus(200);
      }
    });
  });   
}

//EXAMPLE:
  //updateProductRecordCAS(3, ['beepoooop498r7234987r6239487r5632948r5672ad;lfkj340r7134rUnbranded Plastic Chicken, Facilis totam porro ipsum eveniet explicabo rerum','Abernathy LLC','10','2484','12','$4300.00','50%','$2150.00','0','Voluptatem saepe officia sunt. Est non dolores quia consequuntur accusantium reiciendis eos placeat minima. Minus assumenda et natus minus. Ut numquam unde. Ipsum ut deleniti aut assumenda quam minima alias asperiores ea. Optio sint atque dolore in fugit non asperiores incidunt.', [['http', 'yo'], ['bro', 'yes']]]);






//createDbCAS();
//saveProductRecordCAS(record);

// deleteProductRecordCAS(3);


module.exports = {
  createDbCAS,
  deleteProductRecordCAS,
  updateProductRecordCAS,
  getProductCAS,
  saveProductRecordCAS
}




