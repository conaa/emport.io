var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');


var index = require('./routes/index');
var result = require('./routes/result');

//Port variable
var port = 3000;

//Main app variable
var app = express();

//View engine
//Let system know what folder we want to use for our views
app.set('views', path.join(__dirname, 'views'));

//Specify the engine
app.set('view engine', 'ejs');
//We want to render files with an HTML extension
app.engine('html', require('ejs').renderFile);

//Set static folder where we put angular stuff
//All the angular 2 stuff will go in the client cfolder
app.use(express.static(path.join(__dirname, 'client')));

//Body parser, middle ware.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Link route files
app.use('/', index);
app.use('/api', result);

//Run the server
app.listen(port, function() {
  console.log("Server started on port " + port);
});
