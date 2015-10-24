/**
 * Module dependencies.
 */
var express = require('express')
  , http = require('http')
  , mongoose = require('mongoose')
  , bodyParser = require('body-parser');

// MongoDB Connection 
mongoose.connect('mongodb://localhost/library');
var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.use(express.logger('dev'));
  app.use(bodyParser.json());
  app.use(express.methodOverride());
  app.use(app.router);
  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: false }))
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

var Book = require('./models/book').Book; 
var bookController = require('./controller/bookController')(Book); 

app.get('/books', bookController.all);
app.get('/books/:id', bookController.select);
app.post('/books', bookController.create);
app.put('/books', bookController.update);
app.del('/books', bookController.delete);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port %s in %s mode.",  app.get('port'), app.settings.env);
});