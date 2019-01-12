const express = require('express');
const path = require('path');
const db = require('./../db/db.js');
const cors = require('cors');

//  ///////////////////////////////////
const app = express();

app.use('/:productId', express.static(path.join(__dirname, './../client/dist/')));
app.use(express.static(path.join(__dirname, './../client/dist/')));
app.use(cors());


const PORT = 3004;
app.listen(PORT);

app.get('/photos/:productId', db.getPhotos);

app.get('/products/:productId', db.getProduct);

//SDC DATABASE COMPARISON FUNCTIONS BELOW
//MAY DELETE THESE

//POSTGRES
app.post('/products/:productId', db.saveProductRecordPG)
app.get('/products/:productId', db.getProductPG)
app.put('/products/:productId', db.updateProductRecordPG)
app.delete('/products/:productId', db.deleteProductRecordPG)

app.post('/photos/:productId', db.saveProductRecordPG)
app.get('/photos/:productId', db.getProductPG)
app.put('/photos/:productId', db.updateProductRecordPG)
app.delete('/photos/:productId', db.deleteProductRecordPG)


//CASSANDRA
app.post('/products/:productId', db.saveProductRecordCAS)
app.get('/products/:productId', db.getProductCAS)
app.put('/products/:productId', db.updateProductRecordCAS)
app.delete('/products/:productId', db.deleteProductRecordCAS)

app.post('/photos/:productId', db.saveProductRecordCAS)
app.get('/photos/:productId', db.getProductCAS)
app.put('/photos/:productId', db.updateProductRecordCAS)
app.delete('/photos/:productId', db.deleteProductRecordCAS)

