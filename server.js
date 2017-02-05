var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var morgan = require('morgan');
var port = process.env.PORT || 3000;
var router = express.Router();
var userRoutes = require('./routes/user.route')(router);
var coursesRoutes = require('./routes/course.route')(router);
var config = require('./config/dev.config')

var index = require('./routes/index');



mongoose.connect(config.database, function (err) {
	if (err) {
		console.log(err);
	} else {
		console.log('successfully connected to db');
	}
});


app.use(morgan('dev'));

//view engine
app.set('views', path.join(__dirname, 'client'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(express.static(path.join(__dirname + '/client')));

//body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//routes
app.use('/', index);
app.use('/api', userRoutes);
app.use('/api', coursesRoutes);


app.listen(port, function () {
	console.log('server started on port ' + port);
})

