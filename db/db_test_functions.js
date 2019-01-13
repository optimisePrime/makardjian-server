var cassandraFunctions = require('./db-cassandra.js');
var postgresFunctions = require('./db_postgres.js');



//CASSANDRA
// deleteProductRecordCAS,
// updateProductRecordCAS,
// getProductCAS,
// saveProductRecordCAS,

//POSTGRES

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

var getProductAndPhotoPG = function(req, res) {
  var id = req.params.productId;
  var pool = new Pool();
  pool.connect(function(err, client, done) {
    const query = {
      name: 'fetch-product-photo',
      text: 'SELECT * FROM products left join photos on products.id = photos.product_id WHERE id = $1',
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
// deleteProductRecordPG,
// updateProductRecordPG,
// getProductPG(9900000);
// saveProductRecordPG

'SELECT * FROM products left join photos on products.id = photos.product_id WHERE id = 1'



