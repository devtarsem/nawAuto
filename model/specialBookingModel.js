const mongoose = require('mongoose')

const specialAuto = new mongoose.Schema({
    arrivalPlace : {
        type : String
    }
    ,
    destinationPlace : {
        type : String
    }
    ,
    time : {
        type : String
    }
    ,
    date : {
        type : Date,
        default : Date.now()
    }
    ,
    numberOfPerson : {
        type : String
    }
    ,
    user : {
        type : mongoose.Schema.ObjectId,
        ref : 'User',
    }
})

const special = mongoose.model('special', specialAuto)

module.exports = special
