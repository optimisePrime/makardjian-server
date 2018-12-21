var express = require('express');
var path = require('path')
/////////////////////////////////////
var app = express();



app.use(express.static(path.join(__dirname, './../client/dist/')))



var PORT = 3004;
app.listen(PORT)

console.log('server is up and running')