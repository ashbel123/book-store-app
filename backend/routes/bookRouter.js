const express = require('express');

const router = express.Router();

const bookController = require('../controllers/book.js');
router.get("/get", bookController.getBooks);

router.post("/add", bookController.postBook);

router.get("/get/:id", bookController.getBook);

router.put("/update/:id", bookController.updateBook);

router.delete("/delete/:id", bookController.deleteBook);
module.exports= router;
  