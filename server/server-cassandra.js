const express = require('express');
const path = require('path');
const db = require('./../db/db-postgres.js');
const cas = require('./../db/db-cassandra.js')
const cors = require('cors');

//  ///////////////////////////////////
const app = express();

var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


app.use('/:productId', express.static(path.join(__dirname, './../client/dist/')));
app.use(express.static(path.join(__dirname, './../client/dist/')));
app.use(cors());


const PORT = 3005;
app.listen(PORT);


app.post('/products/:productId', function (req, res) {
	cas.saveProductRecordCAS(req, res);
})

app.get('/products/:productId', function (req, res) {
	cas.getProductCAS(req, res);
});

app.put('/products/:productId', function (req, res) {
	cas.updateProductRecordCAS(req, res);
});

app.delete('/products/:productId', function(req, res) {
	cas.deleteProductRecordCAS(req, res);
});

// app.post('/photos/:productId', db.saveProductRecordPG)
// app.get('/photos/:productId', db.getProductPG)
// app.put('/photos/:productId', db.updateProductRecordPG)
// app.delete('/photos/:productId', db.deleteProductRecordPG)



