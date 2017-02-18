var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var morgan = require('morgan');
var port = process.env.PORT || 3000;
var router = express.Router();
var config = require('./config/dev.config')

mongoose.connect(config.database, function (err) {
	if (err) {
		console.log(err);
	} else {
		console.log('successfully connected to db');
	}
});

app.use(morgan('dev'));

app.use(express.static(path.join(__dirname + '/client')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
require('./routes/index')(app);

app.listen(port, function () {
	console.log('server started on port ' + port);
})

// mongod --dbpath D:\apps\lms\db

