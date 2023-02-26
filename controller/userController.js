const User = require('./../model/userRegisteration')
const feedback = require('./../model/feedbackModel')
const Razorpay = require('razorpay');
const {promisify} = require('util')
const jwt = require('jsonwebtoken');
const preBooking = require('../model/userBookingreqModel');
const reviewModel = require('./../model/reviewModel')
exports.createuser = async (req, res, next)=>{
    const createdUser = await User.create(req.body)

    res.status(200).json({
        status : 'ok',
        data : {
            data : createdUser
        }
    })
}

exports.getAllUsers = async (req, res, next)=>{
    const users = await User.find()

    res.status(200).json({
        status : 'ok',
        data : {
            data : users
        }
    })
    
}

exports.getSingleUser = async (req, res, next)=>{
    const user = await User.find({_id : req.params.id})
    
    res.status(200).json({
        status : 'ok',
        data : {
            data : user
        }
    })
}

exports.updateUser = async (req, res, next)=>{
    const updatedUser = await User.findByIdAndUpdate({_id : req.params.id}, req.body);

    res.status(200).json({
        status : 'ok',
        data : {
            data : updatedUser
        }
    })
}

exports.deleteUser = async (req, res, next)=>{
    const deleteUser = await User.findByIdAndDelete({_id : req.params.id})

    res.status(200).json({
        status : 'ok',
        data : {
            data : null
        }
    })
}

exports.paymentAccepting = (req, res, next)=>{
    
    const instance = new Razorpay({ key_id: 'rzp_live_HjaQcoRYa7eH30', key_secret: 'b8KMJjiTuhAL1Zb9sjB8Eqa7' })

    const options = {
        amount: req.body.amount,  // amount in the smallest currency unit
        currency: "INR",
        receipt: "rcp1"
    };

    instance.orders.create(options, function(err, order) {
        console.log(order);
        res.send({orderId : order.id})
        console.log(order.id);
    });

    

}


exports.feedback = async(req,res,next)=>{
    const feedbackForm = await feedback.create(req.body)
    res.status(200).json({
        status : 'ok',
        data : {
            data : feedbackForm
        }
    })
}

exports.name_changing = async (req, res, next)=>{
    let token = req.cookies.jwt
    const decode = await promisify(jwt.verify)(token, process.env.JWTSTRING)
    const current_user = await User.findById(decode.id)
    
    const {name} = req.body

    current_user.name = name
    await current_user.save()
    res.status(200).json({
        status : 'ok',
        data : {
            data : current_user
        }
    })
}
exports.rollNumber_changing = async (req, res, next)=>{
    let token = req.cookies.jwt
    const decode = await promisify(jwt.verify)(token, process.env.JWTSTRING)
    const current_user = await User.findById(decode.id)
    
    const {rollNumber} = req.body

    current_user.rollNumber = rollNumber
    await current_user.save()
    res.status(200).json({
        status : 'ok',
        data : {
            data : current_user
        }
    })
}

exports.branch_changing = async (req, res, next)=>{
    let token = req.cookies.jwt
    const decode = await promisify(jwt.verify)(token, process.env.JWTSTRING)
    const current_user = await User.findById(decode.id)
    
    const {branch} = req.body

    current_user.branch = branch
    await current_user.save()
    res.status(200).json({
        status : 'ok',
        data : {
            data : current_user
        }
    })
}

exports.mobile_changing = async (req, res, next)=>{
    let token = req.cookies.jwt
    const decode = await promisify(jwt.verify)(token, process.env.JWTSTRING)
    const current_user = await User.findById(decode.id)
    
    const {phoneNumber} = req.body

    current_user.phoneNumber = phoneNumber
    await current_user.save()
    res.status(200).json({
        status : 'ok',
        data : {
            data : current_user
        }
    })
}

exports.mobile_changing_two = async (req, res, next)=>{
    let token = req.cookies.jwt
    const decode = await promisify(jwt.verify)(token, process.env.JWTSTRING)
    const current_user = await User.findById(decode.id)
    
    const {AltphoneNumber} = req.body

    current_user.AltphoneNumber = AltphoneNumber
    await current_user.save()
    res.status(200).json({
        status : 'ok',
        data : {
            data : current_user
        }
    })
}

exports.gender_changing = async (req, res, next)=>{
    let token = req.cookies.jwt
    const decode = await promisify(jwt.verify)(token, process.env.JWTSTRING)
    const current_user = await User.findById(decode.id)
    
    const {gender} = req.body

    current_user.gender = gender
    await current_user.save()
    res.status(200).json({
        status : 'ok',
        data : {
            data : current_user
        }
    })
}

exports.cancellingOrderAfterTimeout = async (req, res, next)=>{

    let token = req.cookies.jwt
    const decode = await promisify(jwt.verify)(token, process.env.JWTSTRING)
    const current_user = await User.findById(decode.id)
    const orderByuser = await preBooking.findOneAndDelete({user : current_user._id})

    console.log(orderByuser)
}
exports.reviewWriting = async (req, res, next)=>{
    const {reviewFill} = req.body 
    let token = req.cookies.jwt
    const decode = await promisify(jwt.verify)(token, process.env.JWTSTRING)
    const user = await User.findById(decode.id)
    const reviewWrite = await reviewModel.create({reviewFill, user})
    // reviewWrite.reviewFill = reviewFill
    // reviewWrite.user = user
    // await reviewWrite.save()
    res.status(200).json({
        status : 'ok',
        data : {
            data : reviewWrite
        }
    })
}

exports.dpChanging = async (req, res, next)=>{
    const {photo} = req.body
    let token = req.cookies.jwt
    const decode = await promisify(jwt.verify)(token, process.env.JWTSTRING)
    const user = await User.findById(decode.id)
    user.photo = photo
    await user.save()
    res.status(200).json({
        status : 'ok',
        data : {
            data : user
        }
    })
}