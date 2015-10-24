var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

var bookSchema = new Schema({
  name: String,
  isbn : { type: String, index: true },
  author : String,
  pages : Number,
  description : { type: String },
  added_date : { type: Date, default: Date.now }
});

var book = mongoose.model('book', bookSchema);

module.exports = {
  Book: book
};