const mongoose = require('mongoose')
const prebookingReqSchema = new mongoose.Schema({
    arrivalPlace : {
        type : String,
        required : [true, "the arrival place must be filled"],
        trim : true
    }
    ,
    destinationPlace : {
        type : String,
        // required : [true, "the destination place must be filled"],
        trim : true
    }
    // ,
    // time : {
    //     type : String,
    //     required : [true, "the time  must be filled"],

    // }
    // ,
    // date : {
    //     type : Date,
    //     default : Date.now()
    // }
    ,
    NumOfPersons : {
        type : Number,
        default : 1,
        required : [true, "the number of persons must be filled"],

    }
    ,
    active : {
        type : Boolean,
        default : true
    }
    ,
    user : {
        type : mongoose.Schema.ObjectId,
        ref : 'User'
    }
})

// password bcrypting before saving


const preBooking = mongoose.model('preBooking', prebookingReqSchema)

module.exports = preBooking