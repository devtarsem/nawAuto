const Driver = require('./../model/driverRegisteration')
const Lose = require('./../model/loseItemModel')
const {promisify} = require('util')
const jwt = require('jsonwebtoken')
const signJWTTOKEN = (id)=>{
    const token = jwt.sign({id}, process.env.JWTSTRING, {
        expiresIn : process.env.EXPIRETIME
    })
    return token
}

exports.createDriver = async(req, res, next)=>{
    const driver = await Driver.create(req.body)

    // sending the jwt to login for the user
    const token = signJWTTOKEN(driver._id)
    // sending the cookie for driver jwt
    const cookieOptions = {
        expires : new Date(Date.now() + 90 * 24*60*60*1000),
        httpOnly : true
    }
    // if(process.env.NODE_ENV==='production') cookieOptions.secure = true
    res.cookie('jwt', token, cookieOptions)

    

    res.status(200).json({
        status : 'ok',
        data : {
            data : driver
        }
    })
}


exports.decodingTheCurrentDriver = async (req, res, next)=>{
    const jwtToken = req.cookies.jwt
    // console.log(jwtToken)
    res.status(200).json({
        status : 'ok',
        data : {
            data : jwtToken
        }
    })
}

exports.getAllDrivers = async (req, res, next)=>{
    const drivers = await Driver.find()
    res.status(200).json({
        status : 'ok',
        data : {
            data : drivers
        }
    })
}

exports.getOneDriver = async (req, res, next)=>{
    console.log(req.params)
    const driver = await Driver.findById({_id : req.params.id})
    res.status(200).json({
        status : 'ok',
        data : {
            data : driver
        }
    })

}

exports.updateDriver = async (req, res, next)=>{
    const driver = await Driver.findByIdAndUpdate({_id : req.params.id}, req.body)
    // await driver.save()
    res.status(200).json({
        status : 'ok',
        data : {
            data : driver
        }
    })

}

exports.deleteDriver = async (req, res, next)=>{
    const driver = await Driver.findByIdAndDelete({_id : req.params.id})

    res.status(200).json({
        status : 'ok',
        data : {
            data : driver
        }
    })
}

exports.LoseItemFilling = async (req, res)=>{
    const {key_1,key_2,key_3,key_4} = req.body
    const loseItem = await Lose.create({key_1,key_2,key_3,key_4})
    let token = req.cookies.jwt
    const decode = await promisify(jwt.verify)(token, process.env.JWTSTRING)
    const driverCurrent = await Driver.findById(decode.id)
    console.log(driverCurrent)
    loseItem.driver = driverCurrent._id
    await loseItem.save()
    res.status(200).json({
        status : 'ok',
        data : {
            data : loseItem
        }
    })
}