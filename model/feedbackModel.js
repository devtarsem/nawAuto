const mongoose = require('mongoose')
const feedbackSchema = new mongoose.Schema({
    qOne : {
        type : String
    }
    ,
    qTwo : {
        type : String
    }
    ,
    qThree : {
        type : String
    }
    ,
    qFour : {
        type : String
    }
    ,
    qFive : {
        type : String
    }
})

const feedback = mongoose.model('feedback', feedbackSchema)
module.exports = feedback