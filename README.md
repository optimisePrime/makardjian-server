### CRUD API's
Create: 
> app.post(/photos/:productId)

> app.post(/products/:productId)

> --> Sample Create Helper Function (Postgres)

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

Read: 
 > app.get(/photos/:productId)

 > app.get(/products/:productId)

> --> Sample Read Function (Postgres)

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

Update: 
 > app.put(/photos/:productId)

 > app.put(/products/:productId)

> --> Sample Update Helper Function (Postgres)

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

Delete:
 > app.delete(/photos/:productId)

 > app.delete(/products/:productId)

> --> Sample Delete Helper Function

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