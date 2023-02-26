const preBookCity = require('./../model/preBookingFromCityModel')
const jwt = require('jsonwebtoken')
const {promisify} = require('util')
const User = require('./../model/userRegisteration')
exports.createPreBookingOrder = async(req, res, next)=>{

    let token = req.cookies.jwt
    const preOrder = await preBookCity.create(req.body)
    const decode = await promisify(jwt.verify)(token, process.env.JWTSTRING)
    const userCurrent = await User.find({_id : decode.id})
    preOrder.user = userCurrent[0]
    await preOrder.save()
    res.status(200).json({
        status : 'ok',
        data : {
            data : preOrder
        }
    })
}
