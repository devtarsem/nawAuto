const mongoose = require('mongoose')
const loseSchema = new mongoose.Schema({
    key_1 : {
        type : String
    }
    ,
    key_2 : {
        type : String
    },
    key_3 : {
        type : String
    },
    key_4 : {
        type : String
    }
    
    ,
    driver : {
        type : mongoose.Schema.ObjectId,
        ref : 'Driver'
    }
})

const Lose = mongoose.model('Lose', loseSchema)
module.exports = Lose