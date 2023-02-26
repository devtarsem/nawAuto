const mongoose = require('mongoose')


const dualBookingSchema = new mongoose.Schema({
    arrival : {
        type : String
    }
    ,
    destination : {
        type : String
    }
    ,
    arrivalTime : {
        type : String
    }
    ,
    BackTime : {
        type : String
    }
    ,
    NumberOfPerson : {
        type : String
    }
    ,
    arrivalDate : {
        type : Date
    }
    ,
    user : {
        type : mongoose.Schema.ObjectId,
        ref : 'User'
    }

})

const DualBooking = mongoose.model('DualBooking', dualBookingSchema)

module.exports = DualBooking
