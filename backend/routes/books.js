const express = require('express')
const {
    getAllBooks,
    getBook,
    createBook,
    deleteBook,
    updateBook
} = require("../controllers/bookController")
const Book = require('../models/bookModel')

const router = express.Router()

// get all books
router.get('/', getAllBooks)

// get a book
router.get('/:id', getBook)

// post a new book
router.post('/', createBook)

// delete a book
router.delete('/:id', deleteBook)

// update a book
router.patch('/:id', updateBook)

module.exports = router