const mongoose = require('mongoose')

const cityPreBookSchema = new mongoose.Schema({
    arrival : {
        type : String
    }
    ,
    destination : {
        type : String
    }
    ,
    NumberOfPerson : {
        type : String
    }
    ,
    time : {
        type : String
    }
    ,
    user : {
        type : mongoose.Schema.ObjectId,
        ref : 'User'
    }
    
})

const preBookCity = mongoose.model('preBookCity', cityPreBookSchema)

module.exports = preBookCity