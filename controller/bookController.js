var bookController = function(Book){
	
	var all = function(req, res) {
	  Book.find({}, function(err, books) {
	    if(!err) {
	      res.json(200, { books: books });  
	    } else {
	      res.json(500, { message: err });
	    }
	  });
	}

	var select = function(req, res) {  
	  var id = req.params.id;  
	  console.log('Selecting Book: ' + id);

	  Book.findById(id, function(err, book) {
	    if(!err && book) {
	      res.json(200, book);
	    } else if(err) {
	      res.json(500, { message: "Error loading workout." + err });
	    } else {
	      res.json(404, { message: "Book not found." });
	    }
	  });
	}

	var create = function(req, res) {
	  var name = req.body.name; 
	  var isbn = req.body.isbn; 
	  var author = req.body.author; 
	  var pages = req.body.pages;    
	  var description = req.body.description;  
	  var added_date = req.body.added_date;  

	  var book = req.body;
	  console.log('Adding Book: ' + JSON.stringify(book));

	  Book.findOne({isbn : isbn}, function(err, exisiting_book) { 

	    if(!err && !exisiting_book) {      
	      var book = new Book(); 

	      book.name = name; 
	      book.isbn = isbn; 
	      book.author = author; 
	      book.pages = pages; 
	      book.description = description; 
	      book.added_date = added_date; 
	      
	      book.save(function(err) {
	        if(!err) {
	          res.json(201, { message: "Book created with name: " + book.name });    
	        } else {
	          res.json(500, { message: "Could not create a Book. Error: " + err });
	        }
	      });

	    } else if(!err) {     
	      console.log("Existing Book: " +exisiting_book);
	      res.json(403, { message: "Book already exists! please update instead of creating one."}); 
	    } else {
	      res.json(500, { message: err });
	    } 
	  });
	}

	var update = function(req, res) {  
	  var name = req.body.name; 
	  var isbn = req.body.isbn; 
	  var author = req.body.author; 
	  var pages = req.body.pages;    
	  var description = req.body.description;  

 	  var book = req.body;
	  console.log('Updating Book: ' + JSON.stringify(book));

	  Book.findOne({isbn : isbn}, function(err, book) {
	      if(!err && book) {
	        book.name = name; 
	        book.isbn = isbn; 
	        book.author = author; 
	        book.pages = pages; 
	        book.description = description; 
	        book.save(function(err) {
	          if(!err) {
	            res.json(200, { message: "Book updated: " + name });    
	          } else {
	            res.json(500, { message: "Could not update book. " + err });
	          }  
	        });
	      } else if(!err) {
	        res.json(404, { message: "Could not find book." });
	      } else {
	        res.json(500, { message: "Could not update book." + err });
	      }
	    }); 
	}

	var remove = function(req, res) {
		var id = req.body.id; 
		
		console.log('Removing Book: ' + id);
		Book.findById(id, function(err, book) {
		    if(!err && book) {
		      book.remove();
		      res.json(200, { message: "Book removed." });
		    } else if(!err) {
		      res.json(404, { message: "Could not find book." });
		    } else {
		      res.json(403, { message: "Could not delete book. " + err });
		    }
		}); 
	}

	return {
        all: all,
        select: select,
        create: create,
        update: update,
        delete: remove
    }
}

module.exports = bookController;