const mongoose = require('mongoose')
const specialOrderSchema = new mongoose.Schema({
    driver : {
        type : Object
    }
    ,
    user : {
        type : Object
    }
    ,
    username : {
        type : String
    }
    ,
    order : {
        type : Object
    }
})

const specialSavari = mongoose.model('specialSavari', specialOrderSchema)
module.exports = specialSavari