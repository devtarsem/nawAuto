const User = require('../model/userRegisteration');
const Driver = require('./../model/driverRegisteration');
const preBooking = require('./../model/userBookingreqModel');
const savari = require('./../model/acceptedSavariModel')
const savariInCity = require('./../model/preBookingFromCityModel')
const periorityModel = require('./../model/autoPriorityModel')
const { promisify } = require('util')
const jwt = require('jsonwebtoken');
const { findOneAndDelete } = require('../model/userRegisteration');
exports.preBookingReqSend = async (req, res, next)=>{
    const requestData = await preBooking.create(req.body);
    // const allBookingReq = await preBooking.find();
    // const extractedData = allBookingReq.map(el=> [el.arrivalPlace, el.destinationPlace, el.NumOfPersons])
    // const updated_element = [extractedData[extractedData.length-1]]
    // const driver = await Driver.find()
    // const driverPriorid = driver.map(el=> el._id);
    // const firstdriver = await Driver.findByIdAndUpdate({_id : driverPriorid[0]}, {requestAccepted : [extractedData[extractedData.length-1]]});
    req.params.id = req.user._id
    requestData.user = req.params.id;
    await requestData.save();

    res.status(200).json({
        status : 'ok',
        data : {
            data : requestData
        }
    })
}

exports.getAllReqForBookings = async (req, res, next)=>{
    const allBookingReq = await preBooking.find().populate('user');
    /*const extractedData = allBookingReq.map(el=> [el.arrivalPlace, el.destinationPlace, el.NumOfPersons])
    // console.log(extractedData)
    const driver = await Driver.find()
    const driverPriorid = driver.map(el=> el._id);
    console.log(driverPriorid)
    const firstdriver = await Driver.findByIdAndUpdate({_id : driverPriorid[0]}, {requestAccepted : extractedData});*/

    // const first = driver[0]
    // first.requestAccepted.push(extractedData)
    // console.log(first);
    res.status(200).json({
        status : 'ok',
        data : {
            data :allBookingReq
        }
    })
}

exports.AcceptingOrders = async (req, res, next)=>{
    const {userid, reqId} = req.params;
    const accepetedReq = await preBooking.findById({_id : reqId}).populate('user');
    accepetedReq.active = false
    console.log(accepetedReq)
    const orders = []
    orders.push(accepetedReq)
    accepetedReq.save()
    console.log(orders)
    
    const activedriver = await Driver.findById({_id : userid});
    activedriver.requestAccepted.push(orders)
    activedriver.save()
    res.status(200).json({
        driver : activedriver,
        activeOrder : orders
    })
}

exports.perorityCheckingAndPayments = async (req, res, next)=>{
    // req.params.id = req.user.id this comes from pur protect route handler in authcontroller in future
    const findCurrentUserRe = await preBooking.find({user : req.params.id})
    console.log(findCurrentUserRe[0].active)
    if(findCurrentUserRe[0].active){
        console.log('happy one side app is made and error show here')
    }
    
    // console.log(findCurrentUserRe[0].active)
    // if(!findCurrentUserRe.active){
    //     console.log("this order is accepted not accepted yet please wait");
    // }
    // from here we do payments
    // so now we shift to server side then we come and mpliment this route

    res.status(200).json({
        status : 'ok',
        data : findCurrentUserRe
    })
}

exports.acceptingOrders = async (req, res, next)=>{
    let token;
    token = req.cookies.jwt
    const {name} = req.body
    // console.log(typeof name)
    // console.log(`token is ${token}`)
    const decode = await promisify(jwt.verify)(token, process.env.JWTSTRING)
    // console.log(`id is ${decode.id}`)
    const CurrentDriver = await Driver.findById(decode.id)
    const CurrentUser = await User.find({name : name})
    const creatingOrder = await savari.create({CurrentDriver,CurrentUser,name})
    const userCurrentRe = await preBooking.find({user : CurrentUser[0]._id})
    creatingOrder.general = true
    creatingOrder.driver = CurrentDriver
    creatingOrder.savari = CurrentUser
    creatingOrder.driverName = CurrentDriver.name
    creatingOrder.userCurrentOrder = userCurrentRe
    await creatingOrder.save()
    

    // console.log(CurrentUser)
    // next()
    // console.log(creatingOrder)
    // console.log(creatingOrder)
    // console.log(CurrentDriver)
    next()
}

exports.acceptingSavariFromCity = async (req, res, next)=>{
    let {name, arrival, destination} = req.body
    let token = req.cookies.jwt
    const decode = await promisify(jwt.verify)(token, process.env.JWTSTRING)
    const driverCurrent = await Driver.findById(decode.id)
    const savariCurrent = await User.find({name : name})
    
    // console.log('here i am'+ CurrentDriver)
    // console.log('here is user' + CurrentUser)
    const userCurrentOrder = await savariInCity.find({user : savariCurrent[0]._id,arrival : arrival, destination : destination})
    console.log(userCurrentOrder)
    const savariAccepted = await savari.create({driverCurrent,savariCurrent,name,userCurrentOrder})
    savariAccepted.driver = driverCurrent
    savariAccepted.savari = savariCurrent
    savariAccepted.name = name
    savariAccepted.driverName = driverCurrent.name
    savariAccepted.userCurrentOrder = userCurrentOrder
    savariAccepted.preBookCity = true
    await savariAccepted.save()



    // console.log(userOrder)


}
exports.GoToRide = async (req, res, next)=>{
    let token;
    token = req.cookies.jwt
    const decode = await promisify(jwt.verify)(token, process.env.JWTSTRING)
    const CurrentDriver = await Driver.findById(decode.id)
    console.log(CurrentDriver.autoNumber)
    const periorityPrev = await periorityModel.findOneAndDelete({autoNumber : CurrentDriver.autoNumber})
    console.log(periorityPrev)
    
}
// exports.displaySavari = async (req, res, next)=>{
    
//     // console.log(findingDriver)
// }

// payment taking
