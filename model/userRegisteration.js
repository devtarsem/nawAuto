const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const validator = require('validator')

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, 'A user must have their name'],
        trim : true

    }
    ,
    email : {
        type : String,
        required : [true, 'A user must have their email id'],
        trim : true,
        validate : validator.isEmail
    },
    password : {
        type : String,
        required : [true, 'A user must have their password'],
        minlength:8
    },
    passwordconfirm : {
        type : String,
        // required : [true, 'A user must have their password'],
        trim : true,
        
    }
    ,
    photo : {
        type : String,
        default : 'avatar6.png'
    },
    gender : {
        type : String,
        enum : ['male', 'female', 'other'],
        trim : true
    }
    ,
    rollNumber : {
        type : Number,
        required : [true, 'A user must have their roll number']
    },
    branch : {
        type : String,
        required : [true, 'A user must fill their branch']
    },
    phoneNumber : {
        type : Number,
        required : [true, 'A user must put their phone number']
    }
    ,
    AltphoneNumber : {
        type : Number,
        required : [true, 'A user must put their phone number']
    },
    role : {
        type : String,
        default : 'user',
        enum : ['user', 'admin', 'auto-driver']
    }
})

// crypting the pasword before it get save in databse below is our pre hook save middleware
userSchema.pre('save', async function(next){
    this.password =  await bcrypt.hash(this.password, 12)
    next()
})
// comparing the password provided by user and password comes from the database for login functionality
userSchema.methods.correctPassword = async function(candidatepassword, userPassword){
    return await bcrypt.compare(candidatepassword, userPassword)
    // const can = await bcrypt.hash(candidatepassword, 12)
    // console.log(can)
    // return can === userPassword
}

const User = mongoose.model('User', userSchema)
module.exports = User