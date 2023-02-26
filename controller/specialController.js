const special = require('./../model/specialBookingModel')
const User = require('./../model/userRegisteration')
const Driver = require('./../model/driverRegisteration')
const specialSavari = require('./../model/specialSavariBookedModel')
const jwt = require('jsonwebtoken')
const {promisify} = require('util')
exports.createSpecialOrder = async (req, res, next)=>{
    let specialOrder = await special.create(req.body)
    const token = req.cookies.jwt
    const decodeId = await promisify(jwt.verify)(token, process.env.JWTSTRING)
    // console.log(decodeId)
    const decode = await User.find({_id : decodeId.id})
    // console.log(decode)
    specialOrder.user = decodeId.id
    await specialOrder.save()
    // console.log(token)
    res.status(200).json({
        status : 'ok',
        data : {
            order : specialOrder
        }
    })
}

exports.autoDriverAcceptingSpecialOrder = async (req, res, next)=>{
    const username = req.body.username
    const token = req.cookies.jwt
    const decodeId = await promisify(jwt.verify)(token, process.env.JWTSTRING)
    console.log(decodeId)
    const driver = await Driver.find({_id : decodeId.id})
    const user = await User.find({name : username})
    const order = await special.find({user : user[0]._id})
    let specialBooked = await specialSavari.create({driver, user, username,order})
    // specialBooked.driver = decode
    // specialBooked.user = user
    // specialBooked.order = userOrder
    await specialBooked.save()

}