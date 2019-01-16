const { Pool, Client } = require('pg');
var performance = require('performance-now');

var now = require("performance-now")

//POSTGRES

//SELECT
var getProductPG = function() {
  var pool = new Pool();
  var cumlative_time = 0;
  pool.connect(function(err, client, done) {
    if (err) {
      console.log('Error connecting', err)
    }
    var recursivelyTestSelect = function(n) {
      let num = Math.floor(Math.random() * 10000000);
      var query = {
        name: 'fetch-product',
        text: 'SELECT * FROM products WHERE id = $1',
        values: [num]
      }
      if (n < 10000) {
        let start = now();
        client.query(query, (err, data) => {
          if (err) {
            console.log("Error running query:", err.stack)
          } else {
            let stop = now();
            let elapsed = stop - start;
            // console.log(`On ${n} loop searched for ${num} and got ${data} and took ${elapsed} seconds`)
            cumlative_time += elapsed;
            if (n % 100 === 0) {
              console.log(`Loop ${n} took ${elapsed}`)
            }
            recursivelyTestSelect(n + 1)
          }
        })
      }
      if (n === 10000) {
        console.log(`POSTGRES: Tested 10000 SELECT queries, average time: ${(cumlative_time / 10000).toFixed(3)}`);
      }
    }
  recursivelyTestSelect(0);
  })
  pool.end();
}

//UPDATE
var updateProductPG = function() {
  var pool = new Pool();
  var cumlative_time = 0;
  pool.connect(function(err, client, done) {
    if (err) {
      console.log('Error connecting', err)
    }
    var recursivelyTestUpdate = function(n) {
      let num = Math.floor(Math.random() * 10000000);
      var newProductRecord = ['Sample product', 'Acme Co.',3,123,9,'$13.95',0,'$13.95',1,'A fun game for the whole family'];
      newProductRecord.push(num);
      var query = {
        name: 'update-product',
        text: `UPDATE products SET product_title = $1, vendor_name = $2 ,review_average = $3, 
        review_count = $4, answered_questions = $5, list_price = $6, discount = $7, 
        price = $8, prime = $9, description = $10 WHERE id = $11`,
        values: newProductRecord
      }
      if (n < 10000) {
        let start = now();
        client.query(query, (err, data) => {
          if (err) {
            console.log("Error running query:", err.stack)
          } else {
            let stop = now();
            let elapsed = stop - start;
            // console.log(`On ${n} loop updated product ID ${num} and it took ${elapsed} seconds`)
            cumlative_time += elapsed;
            if (n % 100 === 0) {
              console.log(`Loop ${n} took ${elapsed}`)
            }
            recursivelyTestUpdate(n + 1)
          }
        })
      }
      if (n === 10000) {
        console.log(`POSTGRES: Tested 10000 UPDATE queries, average time: ${(cumlative_time / 10000).toFixed(3)}`);
      }
    }
  recursivelyTestUpdate(0);
  })
  pool.end();
}

//INSERT

var insertProductPG = function() {
  var pool = new Pool();
  var cumlative_time = 0;
  pool.connect(function(err, client, done) {
    if (err) {
      console.log('Error connecting', err)
    }
    var recursivelyTestInsert = function(n) {
      let num = Math.floor(Math.random() * 10000000);
      var newProductRecord = ['Sample product', 'Acme Co.',3,123,9,'$13.95',1,'$13.95',1,'A terrible game for the whole family'];
      var query = {
        name: 'update-product',
        text: `INSERT INTO products (product_title, vendor_name, 
      review_average, review_count, answered_questions,
      list_price, discount, price, prime, description) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id`,
        values: newProductRecord
      }
      if (n < 10000) {
        let start = now();
        client.query(query, (err, data) => {
          if (err) {
            console.log("Error running query:", err.stack)
          } else {
            let stop = now();
            let elapsed = stop - start;
            // console.log(`On ${n} loop updated product ID ${num} and it took ${elapsed} seconds`)
            cumlative_time += elapsed;
            if (n % 100 === 0) {
              console.log(`Loop ${n} took ${elapsed}`)
            }
            recursivelyTestInsert(n + 1);
          }
        })
      }
      if (n === 10000) {
        console.log(`POSTGRES: Tested 10000 INSERT queries, average time: ${(cumlative_time / 10000).toFixed(3)}`);
      }
    }
  recursivelyTestInsert(0);
  })
  pool.end();
}

//DELETE

var deleteProductPG = function() {
  var pool = new Pool();
  var cumlative_time = 0;
  pool.connect(function(err, client, done) {
    if (err) {
      console.log('Error connecting', err)
    }
    var recursivelyTestDelete = function(n) {
      let id = 10000000 - n

      var deletePhotoQuery = {
        name: 'delete-photos',
        text: `DELETE FROM photos WHERE product_id = $1`,
        values: [id]}

      if (n < 1000) {
        let start = now();
        client.query(deletePhotoQuery, (err, data) => {
          if (err) {
            console.log("Error running query:", err.stack)
          } else {

            const deleteProductsQuery = {
            name: 'delete-product',
            text: `DELETE FROM products WHERE id = $1`,
            values: [id]}

            client.query(deleteProductsQuery, (err, res) => {
              if (err) {
                console.log("err", err.stack)
              } else {
                let stop = now();
                let elapsed = stop - start;
                cumlative_time += elapsed;
                if (n % 100 === 0) {
                  console.log(`Loop ${n} took ${elapsed}`)
                }
                recursivelyTestDelete(n + 1);
              }
            })
          }
        })
      }
      if (n === 1000) {
        console.log(`POSTGRES: Tested 10000 DELETE queries, average time: ${(cumlative_time / 10000).toFixed(3)}`);
      }
    }
  recursivelyTestDelete(0);
  })
  pool.end();
}


//CASSANDRA
const cassandra = require('cassandra-driver');
const client = new cassandra.Client({contactPoints : ['127.0.0.1'], localDataCenter: 'datacenter1', keyspace: 'students_details' });

//SELECT
var getProductCAS = function() {
  var pool = new Pool();
  var cumlative_time = 0;
  client.connect(function(err, result) {
    if (err) {
      console.log('Error connecting', err)
    }
    var recursivelyTestSelect = function(n) {
      let num = Math.floor(Math.random() * 10000000);
      var query =  'SELECT * FROM amazon.products WHERE product_id = ?';
      if (n < 10000) {
        let start = now();
        client.execute(query,[num], {prepare: true}, function(err, result){
          if(err){
            console.log("error, ", err)
          } else {
            let stop = now();
            let elapsed = stop - start;
            // console.log(`On ${n} loop searched for ${num} and got ${data} and took ${elapsed} seconds`)
            cumlative_time += elapsed;
            recursivelyTestSelect(n + 1)
          }
        })
      }
      if (n === 10000) {
        console.log(`CASSANDRA: Tested 10000 SELECT queries, average time: $${(cumlative_time / 10000).toFixed(3)}`);
      }
    }
  recursivelyTestSelect(0);
  })
  pool.end();
}

//UPDATE
var updateProductCAS = function() {
  var pool = new Pool();
  var cumlative_time = 0;
  client.connect(function(err, result) {
    if (err) {
      console.log('Error connecting', err)
    }
    var recursivelyTestUpdate = function(n) {
      let num = Math.floor(Math.random() * 10000000);
      var newArrayRecord = ['beeUnbranded Plastic Chicken','Abernathy LLC',10,2484,12,'$4300.00','50%','$2150.00',0,'Voluptatem saepe officia sunt. Est non dolores quia consequuntur accusantium reiciendis eos placeat minima. Minus assumenda et natus minus. Ut numquam unde. Ipsum ut deleniti aut assumenda quam minima alias asperiores ea. Optio sint atque dolore in fugit non asperiores incidunt.', [['http://www.google.com', 'http://www.microsoft.com'], ['http://www.amazon.com', 'http://facebook.com']]]
      newArrayRecord.push(num);
      var query =  `UPDATE amazon.products SET product_title = ?, vendor_name = ?, review_average = ?,
    review_count = ?, answered_questions = ?, list_price = ?, discount = ?,  price = ?, prime = ?,
    description = ?, photos = ? WHERE product_id = ?`;
      if (n < 10000) {
        let start = now();
        client.execute(query,newArrayRecord, {prepare: true}, function(err, result){
          if(err){
            console.log("error, ", err)
          } else {
            let stop = now();
            let elapsed = stop - start;
            // console.log(`On ${n} loop searched for ${num} and got ${data} and took ${elapsed} seconds`)
            cumlative_time += elapsed;
            if (n % 100 === 0) {
              console.log(`Loop ${n} took ${elapsed}`)
            }
            recursivelyTestUpdate(n + 1)
          }
        })
      }
      if (n === 10000) {
        console.log(`CASSANDRA: Tested 10000 UPDATE queries, average time: ${(cumlative_time / 10000).toFixed(3)}`);
      }
    }
  recursivelyTestUpdate(0);
  })
  pool.end();
}

//INSERT
var insertProductCAS = function() {
  var pool = new Pool();
  var cumlative_time = 0;
  client.connect(function(err, result) {
    if (err) {
      console.log('Error connecting', err)
    }
    var recursivelyTestInsert = function(n) {
      let num = Math.floor(Math.random() * 10000000);
      var newArrayRecord = ['beeUnbranded Plastic Chicken','Abernathy LLC',10,2484,12,'$4300.00','50%','$2150.00',0,'Voluptatem saepe officia sunt. Est non dolores quia consequuntur accusantium reiciendis eos placeat minima. Minus assumenda et natus minus. Ut numquam unde. Ipsum ut deleniti aut assumenda quam minima alias asperiores ea. Optio sint atque dolore in fugit non asperiores incidunt.', [['http://www.google.com', 'http://www.microsoft.com'], ['http://www.amazon.com', 'http://facebook.com']]]
      var query =  `INSERT INTO amazon.products (product_id, product_title, vendor_name, review_average, review_count, answered_questions, list_price, discount, price, prime, description, photos) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`;
      if (n < 10000) {
        newArrayRecord.unshift(10000000 + n);
        let start = now();
        client.execute(query,newArrayRecord, {prepare: true}, function(err, result){
          if(err){
            console.log("error, ", err)
          } else {
            let stop = now();
            let elapsed = stop - start;
            // console.log(`On ${n} loop searched for ${num} and got ${data} and took ${elapsed} seconds`)
            cumlative_time += elapsed;
            if (n % 100 === 0) {
              console.log(`Loop ${n} took ${elapsed}`)
            }
            recursivelyTestInsert(n + 1)
          }
        })
      }
      if (n === 10000) {
        console.log(`CASSANDRA: Tested 10000 INSERT queries, average time: ${(cumlative_time / 10000).toFixed(3)}`);
      }
    }
  recursivelyTestInsert(0);
  })
  pool.end();
}

//DELETE
var deleteProductCAS = function() {
  var pool = new Pool();
  var cumlative_time = 0;
  client.connect(function(err, result) {
    if (err) {
      console.log('Error connecting', err)
    }
    var recursivelyTestDelete = function(n) {
      var query =  'DELETE from amazon.products where product_id = ?';
      if (n < 10000) {
        let id = 10000000 - n;
        let start = now();
        client.execute(query,[id], {prepare: true}, function(err, result){
          if(err){
            console.log("error, ", err)
          } else {
            let stop = now();
            let elapsed = stop - start;
            cumlative_time += elapsed;

            if (n % 100 === 0) {
              console.log(`Loop ${n} took ${elapsed}`)
            }
          recursivelyTestDelete(n + 1)
          }
        })
      }
      if (n === 10000) {
        console.log(`CASSANDRA: Tested 10000 DELETE queries, average time: ${(cumlative_time / 10000).toFixed(3)}`);
      }
    }
  recursivelyTestDelete(0);
  })
  pool.end();
}




//RUN
//getProductPG();
//updateProductPG();
//insertProductPG();
getProductCAS();
//updateProductCAS();
//insertProductCAS();
//deleteProductPG();
//deleteProductCAS();



