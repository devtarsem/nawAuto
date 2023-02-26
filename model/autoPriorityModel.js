const mongoose = require('mongoose')

const AutoPrioritySchema = new mongoose.Schema({
    // driverId : {
    //     type : String,
    //     default : '6666'
    // },
    autoNumber : {
        type : String
    },
    autoDriver : {
        type : Array
    }
    // autoNumber : {
    //     type : String,
    //     required : [true, 'A auto must necessary for booking']
    // }
    ,
    priority : {
        type : Number,
        required : [true, 'A periority must given to an auto']
    }
    
    // acceptedSavari :
})

const periorityModel = new mongoose.model('periorityModel', AutoPrioritySchema)
module.exports = periorityModel

