require('newrelic');
const express = require('express');
const path = require('path');
const db = require('./../db/db-postgres.js');
const cas = require('./../db/db-cassandra.js')
const cors = require('cors');

//  ///////////////////////////////////
// const app = express();

var bodyParser = require('body-parser')




var cluster = require('cluster');

if(cluster.isMaster) {
    var numWorkers = require('os').cpus().length;

    console.log('Master cluster setting up ' + numWorkers + ' workers...');

    for(var i = 0; i < numWorkers; i++) {
        cluster.fork();
    }

    cluster.on('online', function(worker) {
        console.log('Worker ' + worker.process.pid + ' is online');
    });

    cluster.on('exit', function(worker, code, signal) {
        console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
        console.log('Starting a new worker');
        cluster.fork();
    });
} else {
    var app = require('express')();
	app.use(bodyParser.urlencoded({
	    extended: true
	}));
	app.use(bodyParser.json());


	app.use('/:productId', express.static(path.join(__dirname, './../client/dist/')));
	app.use(express.static(path.join(__dirname, './../client/dist/')));
	app.use(cors());
	app.get('/products/:productId', function (req, res) {
		cas.getProductCAS(req, res);
		//res.sendStatus(200);
	});

    var server = app.listen(3005, function() {
        console.log('Process ' + process.pid + ' is listening to all incoming requests');
    });
}



// const PORT = 3005;
// app.listen(PORT);


// app.post('/products/:productId', function (req, res) {
// 	cas.saveProductRecordCAS(req, res);
// })

// app.get('/products/:productId', function (req, res) {
// 	cas.getProductCAS(req, res);
// });

// app.put('/products/:productId', function (req, res) {
// 	cas.updateProductRecordCAS(req, res);
// });

// app.delete('/products/:productId', function(req, res) {
// 	cas.deleteProductRecordCAS(req, res);
// });

// app.post('/photos/:productId', db.saveProductRecordPG)
// app.get('/photos/:productId', db.getProductPG)
// app.put('/photos/:productId', db.updateProductRecordPG)
// app.delete('/photos/:productId', db.deleteProductRecordPG)



