const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
    reviewFill : {
        type : String
    },
    rating : {
        type : Number,
        default : 4
    },
    user : {
        type : mongoose.Schema.ObjectId,
        rel : 'User'
    }
})

const review = mongoose.model('review', reviewSchema)
module.exports = review
