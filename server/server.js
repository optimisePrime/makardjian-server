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
app.post('/:productId', db.saveProductRecordPG)
app.get('/:productId', db.getProductPG)
app.put('/:productId', db.updateProductRecordPG)
app.delete('/:productId', db.deleteProductRecordPG)


//CASSANDRA
app.post('/:productId', db.saveProductRecordCAS)
app.get('/:productId', db.getProductCAS)
app.put('/:productId', db.updateProductRecordCAS)
app.delete('/:productId', db.deleteProductRecordCAS)

