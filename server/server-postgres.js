//require('newrelic');
const express = require('express');
const path = require('path');
const db = require('./../db/db-postgres.js');
const cors = require('cors');

//  ///////////////////////////////////
// const app = express();

var bodyParser = require('body-parser')
var morgan = require('morgan')


//var app = express();
 //const PORT = 3004;

var cluster = require('cluster');

if (cluster.isMaster) {
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
 // app.use(morgan('dev'));

  app.use(bodyParser.urlencoded({
      extended: true
  }));
  app.use(bodyParser.json());

  app.get('/loaderio-0dbdf036e2d021702ad5610af29ac278', function (req, res) {
          res.send('loaderio-0dbdf036e2d021702ad5610af29ac278');
        })


  app.use('/:productId', express.static(path.join(__dirname, './../client/dist/')));
  app.use(express.static(path.join(__dirname, './../client/dist/')));
  app.use(cors());

	app.get('/products/:productId', function (req, res) {
		//console.log('serving a get request');
                db.getProductPG(req, res);
		//res.sendStatus(200);
	});

  app.get('/photos/:productId', function(req, res) {
    db.getPhotosPG(req, res);
  });

    var server = app.listen(9000, function() {
        console.log('Process ' + process.pid + ' is listening to all incoming requests');
    });
}



// app.post('/products/:productId', function (req, res) {
// 	db.saveProductRecordPG(req, res);
// })


// app.put('/products/:productId', function (req, res) {
// 	db.updateProductRecordPG(req, res);
// });

// app.delete('/products/:productId', function(req, res) {
// 	db.deleteProductRecordPG(req, res);
// });

// app.post('/photos/:productId', db.saveProductRecordPG)

// app.put('/photos/:productId', db.updateProductRecordPG)
// app.delete('/photos/:productId', db.deleteProductRecordPG)

