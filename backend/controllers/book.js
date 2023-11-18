const Book = require('../models/booksModel');

const postBook = async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: "All fields{title,author, publishYear} are required",
      });
    }

    const newBook = new Book({
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    });

    await newBook
      .save()
      .then(() => {
        console.log("Book saved successfully");
        res.status(200).send(newBook);
      })
      .catch((err) => {
        console.log(err.message);
      });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message });
  }
};

const getBooks = (req, res) => {
  Book.find()
    .then((books) => { 
      if (!books) {
        console.log("No books found");
        return res.status(500).send("No books are there");
      }
      return res.status(200).send(books);

    })
    .catch((err) => console.log(err.message));
};

const getBook = (req, res) => {
  Book.findById(req.params.id)
    .then((book) => {
      if (!book) {
        return res.status(404).send({ message: "Book not found" });
      }
      res.status(200).send(book);
    })
    .catch((err) => {
      console.error(err.message);
      res.status(500).send({ message: err.message });
    });
};


const updateBook = async(req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: "All fields{title,author, publishYear} are required",
      });
    }

   await Book.findByIdAndUpdate(req.params.id, req.body)
      .then((result) => {
      console.log(result)
      if (!result) {
        return res.status(404).send({
          message: "Book not found"
        });
      }
      return res.status(200).send({ message: "book updated successfully" });
      })
      .catch((err) => {
        console.log(err);
      
      })
    
    
    
  }
  catch (err) {
    console.log(err);
    return res.status(500).send({message: err.message});
  }
  

  
}


const deleteBook = async(req, res) => {
  const { id } = req.params;
  await Book.findByIdAndDelete(id)
    .then((result) => {
      if (!result) {
        return res.status(500).send({ message: "book you want to delete is not found" });
      }
      return res.status(200).send({ message: "book deleted successfully" });
    })
    .catch((err) => {
      return res.status(500).send({ message: err.message });
    })
}
module.exports= { getBooks, postBook,getBook,updateBook,deleteBook };
