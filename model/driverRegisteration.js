const mongoose = require('mongoose')

const driverSchema = new mongoose.Schema({
    name : {
        type: String,
        required : [true, 'A driver must have name'],
        trim : true

    }
    ,
    email : {
        type : String,
        required : [true, 'A driver must have email'],
        trim : true
    }
    ,
    autoNumber : {
        type : String,
        required : [true, 'A driver must have their auto number'],
        trim : true
    }
    ,
    password : {
        type : String,
        required : [true, 'A driver must have their password'],
        trim : true
    }
    ,
    passwordConfirm : {
        type : String,
        trim : true
    }
    ,
    photo : {
        type : String
    }
    ,
    aadharCard : {
        type : String,

    }
    ,
    age : {
        type : Number
    }
    ,
    address : {
        type : String,
        trim : true
    }
    ,
    requestAccepted : {
        // type : mongoose.Schema.ObjectId,
        // ref : 'preBooking',
        type : [Array]
    },
    periority : {
        type : Number
    },
    phoneNumber : {
        type : Number
    },
    AltphoneNumber : {
        type : Number
    }

})

const Driver = mongoose.model('Driver', driverSchema);
module.exports = Driver