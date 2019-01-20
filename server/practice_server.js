var express = require('express');
var app = express();
var port = 9000;

app.get('/', (req, res) => res.send('Hi'));

app.listen(port, () => console.log('Example app listening on port 9000'))
