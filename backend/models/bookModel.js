// Database Model

const mongoose = require('mongoose')

const Schema = mongoose.Schema

// book document
const bookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    }
}, { timestamps: true })

// creates book database 
// name will automatically be lowercase and have 's' in the end
module.exports = mongoose.model('book', bookSchema)