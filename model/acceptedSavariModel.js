const mongoose = require('mongoose')

const savariSchema = new mongoose.Schema({
    driver : {
        type : Object,
        default : 'hello'
    },
    savari : {
        type : Object,
        default : 'hello'

    },
    name : {
        type : String
    },
    driverName : {
        type : String
    },
    userCurrentOrder : {
        type : Object,
        default : 'hello'
    }
    ,
    special : {
        type : Boolean,
        default : false
    }
    ,
    preBookCity : {
        type : Boolean,
        default : false
    }
    ,
    general : {
        type : Boolean,
        default : false
    }
    ,
    dual : {
        type : Boolean,
        default : false
    }
})

const savari = mongoose.model('savari', savariSchema)
module.exports = savari
