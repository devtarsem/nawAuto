const DualBooking = require('./../model/dualBookingModel')
const User = require('./../model/userRegisteration')
const savari = require('./../model/acceptedSavariModel')
const {promisify} = require('util')
const jwt = require('jsonwebtoken')
const Driver = require('../model/driverRegisteration')
exports.dualBookingOrderCreate = async (req, res, next)=>{
    const dualOrder = await DualBooking.create(req.body)
    let token = req.cookies.jwt
    const decode = await promisify(jwt.verify)(token, process.env.JWTSTRING)
    const userCurrent = await User.findById(decode.id)
    dualOrder.user = userCurrent
    await dualOrder.save()
    res.status(200).json({
        status : 'ok',
        data : {
            data : dualOrder
        }
    })
}
exports.dualBookingOrderAcceptByAuto = async (req, res, next)=>{
    const {name} = req.body
    let token = req.cookies.jwt
    const decode = await promisify(jwt.verify)(token, process.env.JWTSTRING)
    const driver = await Driver.findById(decode.id)
    const user = await User.find({name : name})
    
    const dualAccept = await savari.create({driver})
    dualAccept.savari = user
    const currentDualBookingThatAccepted = await DualBooking.find({user : user[0]._id})
    console.log(currentDualBookingThatAccepted)
    dualAccept.userCurrentOrder = currentDualBookingThatAccepted

    await dualAccept.save()
    res.status(200).json({
        status : 'ok',
        data : {
            data : dualAccept
        }
    })
}
