const User = require('./../model/userRegisteration')
const Driver = require('./../model/driverRegisteration')
const preBooking = require('./../model/userBookingreqModel')
const { promisify } = require('util')
const jwt = require('jsonwebtoken')
const { sign } = require('crypto')
const { find } = require('./../model/userRegisteration')
const bcrypt = require('bcryptjs')
const signJWTTOKEN = (id)=>{
    const token = jwt.sign({id : id}, process.env.JWTSTRING, {
        expiresIn : process.env.EXPIRETIME
    })
    return token
}

exports.signup = async (req, res, next)=>{

    // do not set header before like a error there but it does not effect the process remove this error  in free time 

    // taking credentails from the user
    const user = await User.create({
        name : req.body.name,
        email : req.body.email,
        password : req.body.password,
        passwordconfirm : req.body.passwordconfirm,
        photo : req.body.photo,
        gender : req.body.gender,
        rollNumber : req.body.rollNumber,
        branch : req.body.branch,
        phoneNumber : req.body.phoneNumber,
        AltphoneNumber : req.body.AltphoneNumber
    })
   
    // providing the token
    const token = signJWTTOKEN(user._id)
    // sendint token via cookies
    const cookieOptions = {
        expires : new Date(Date.now() + 90 * 24*60*60*1000),
        httpOnly : true
    }
    // if(process.env.NODE_ENV==='production') cookieOptions.secure = true
    res.cookie('jwt', token, cookieOptions)
    // sending the token back to the user

    res.status(200).json({
        status : 'ok',
        data : {
            data : user,
            token : token,
        }
    })
    next()

}

exports.login = async (req, res, next)=>{
    // taking email password from user
    const {email, password} = req.body
    // checking if the user provide password or not
    
    // finding the user from our collection by provided email
    const user = await User.find({email : email})
    console.log(user)
    if(!user[0]){
        return res.status(200).send({
            message : 'You are not having a valid user account please sign-up first',
            status : 404,
            route : '/signup',
            Btn : 'Signup'
        })
    }
    // console.log(user)

    
    // matching the user provided password with our bcrypted password by bcrypt
    // // const matchPasswordResult = await user.matchPasswordsForLogin(password, user.password);
    // if(!matchPasswordResult){
    //     console.log('do error handing')
    // }
    // matching the password
    // const matchPassword = await user.correctPassword(password, user.password)
    const passwordcheck = await bcrypt.compare(password, user[0].password)

    console.log(passwordcheck)
    if(!passwordcheck){
        return res.status(200).send({
            message : 'You are not having a valid user account please sign-up first',
            status : 404,
            route : '/signup',
            Btn : 'Signup'
        }) 
    }
    // signing the token
    // console.log(user[0]._id)
    const token = signJWTTOKEN(user[0]._id)
    
    // assigning token in cookiie
    const cookieOptions = {
        expires : new Date(Date.now() + 90 * 24*60*60*1000),
        httpOnly : true,
        role : user.role
    }
    // if(process.env.NODE_ENV==='production') cookieOptions.secure = true
    const cookie = res.cookie('jwt', token, cookieOptions)
    // console.log(cookie)
    // console.log(req.cookies.jwt)

    // putting the user data in req.user as well
    req.user = user;
    // console.log(req.user)
    res.status(200).json({
        status : 'ok',
        data : {
            data : token
        }        
    })
    next()
}

exports.protectRoute = async (req, res, next)=>{
    // taking token from the web
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1]
    }else if(req.cookies.jwt){
        token = req.cookies.jwt
    }
    if(!token) return 
    // console.log(token)
    // error handling of token goes here


    // decoding the token
    const decoded = await promisify(jwt.verify)(token, process.env.JWTSTRING)
    // console.log(decoded)
    // finding the user from decoded id
    const userActive = await User.findById(decoded.id)
    // console.log(userActive)

    req.user = userActive
    console.log(req.user)
    next()
}