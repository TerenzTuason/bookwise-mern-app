const Book = require('../models/bookModel')
const mongoose = require('mongoose')

// get all books
const getAllBooks = async (req, res) => {
    // searches all the book
    const books = await Book.find({}).sort({createdAt: -1}) // newest on top
    res.status(200).json(books)
}

// get a single book
const getBook = async (req, res) => {
    // grabs the :id
    const {id} = req.params

    // checks if the id is valid or exists
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such book"})
    }

    // searches the book
    const book = await Book.findById(id)

    // if book does not exist
    if (!book) {
        return res.status(404).json({error: "No such book"})
    }

    res.status(200).json(book)
}

// create a new book
const createBook = async (req, res) => {
    const {title, author, genre} = req.body

    let emptyFields = []

    // checks if the fields are empty
    if (!title) {
        emptyFields.push('title')
    }
    if (!author) {
        emptyFields.push('author')
    }
    if (!genre) {
        emptyFields.push('genre')
    }

    // checks if the empty fields are not null
    if (emptyFields.length > 0) {
        return res.status(400).json({error: 'Please fill in all the fields', emptyFields})
    }

    // add document to database
    try{
        const book = await Book.create({title, author, genre})
        res.status(200).json(book)
    } catch(error){
        res.status(400).json({error: error.message})
    }
}

// delete a book
const deleteBook = async (req, res) => {
    // grabs the :id
    const {id} = req.params

    // checks if the id is valid or exists
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such book"})
    }

    // searches the book then delete it
    const book = await Book.findOneAndDelete({_id: id})

    // if book does not exist
    if (!book) {
        return res.status(404).json({error: "No such book"})
    }

    res.status(200).json(book)
}

// update a book
const updateBook = async (req, res) => {
    // grabs the :id
    const {id} = req.params

    const {title, author, genre} = req.body

    let emptyFields = []

    // checks if the fields are empty
    if (!title) {
        emptyFields.push('title')
    }
    if (!author) {
        emptyFields.push('author')
    }
    if (!genre) {
        emptyFields.push('genre')
    }

    // checks if the empty fields are not null
    if (emptyFields.length > 0) {
        return res.status(400).json({error: 'Please fill in all the fields', emptyFields})
    }

    // checks if the id is valid or exists
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such book"})
    }

    // searches the book then updates its fields
    const book = await Book.findOneAndUpdate(
        {_id: id}, 
        {...req.body},
        {new: true}
    )

    // if book does not exist
    if (!book) {
        return res.status(404).json({error: "No such book"})
    }

    res.status(200).json(book)
}

module.exports = {
    getAllBooks,
    getBook,
    createBook,
    deleteBook,
    updateBook
}