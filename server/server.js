const express = require('express');
const path = require('path');
const db = require('./../db/db-postgres.js');
const cas = require('./../db/db-cassandra.js')
const cors = require('cors');

//  ///////////////////////////////////
const app = express();

app.use('/:productId', express.static(path.join(__dirname, './../client/dist/')));
app.use(express.static(path.join(__dirname, './../client/dist/')));
app.use(cors());


const PORT = 3004;
app.listen(PORT);

//SDC DATABASE COMPARISON FUNCTIONS BELOW
//MAY DELETE THESE

//POSTGRES

const sampleInsertPG = [];
const sampleUpdatePG = [];
app.post('/products/:productId', db.saveProductRecordPG)
app.get('/products/:productId', db.getProductPG)
app.put('/products/:productId', db.updateProductRecordPG)
// app.delete('/products/:productId', db.deleteProductRecordPG)

// app.post('/photos/:productId', db.saveProductRecordPG)
// app.get('/photos/:productId', db.getProductPG)
// app.put('/photos/:productId', db.updateProductRecordPG)
// app.delete('/photos/:productId', db.deleteProductRecordPG)


// //CASSANDRA
// app.post('/products/:productId', cas.saveProductRecordCAS)
// app.get('/products/:productId', cas.getProductCAS)
// app.put('/products/:productId', cas.updateProductRecordCAS)
// app.delete('/products/:productId', cas.deleteProductRecordCAS)

// app.post('/photos/:productId', cas.saveProductRecordCAS)
// app.get('/photos/:productId', cas.getProductCAS)
// app.put('/photos/:productId', cas.updateProductRecordCAS)
// app.delete('/photos/:productId', cas.deleteProductRecordCAS)

