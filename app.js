const express = require('express')
const path = require('path')
const pug = require('pug')
const { promisify } = require('util')
const jwt = require('jsonwebtoken')
const Driver = require('./model/driverRegisteration')
const savari = require('./model/acceptedSavariModel')
const cookieParser = require('cookie-parser')
const driverRoute = require('./routes/driverRoute')
const specialRoute = require('./routes/specialRoute')
const userRoute = require('./routes/userRoute')
const preBookingRoute = require('./routes/preBookingRoute')
const AutoPeriorityRoute = require('./routes/autoPeriorityRoute')
const dualBookingRoute = require('./routes/dualBookingRoute')
const autoPeriorityModel = require('./model/autoPriorityModel')
const preBooking = require('./model/userBookingreqModel')
const special = require('./model/specialBookingModel')
const specialSavari = require('./model/specialSavariBookedModel')
const savariInCity = require('./model/preBookingFromCityModel')
const User = require('./model/userRegisteration')
const preBookCity = require('./model/preBookingFromCityModel')
const DualBooking = require('./model/dualBookingModel')
const Lost = require('./model/loseItemModel')
const app = express()
app.use(express.json());
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'view'));
app.use(cookieParser())
app.use('/api/v1/driver', driverRoute)
app.use('/api/v1/user', userRoute)
app.use('/api/v1/preBookingReq', preBookingRoute)
app.use('/api/vi/driver/auto-periority', AutoPeriorityRoute)
app.use('/api/v1', specialRoute)
app.use('/api/v1/dual', dualBookingRoute)



app.use('/item-lose-client', async (req, res)=>{
    const lostItems = await Lost.find().populate('driver')

    res.status(200).render('loseItemClient', {
        title : 'item lose client side',
        lost : lostItems

    })
})

app.use('/item-lose-auto', async (req, res)=>{
    const lostItems = await Lost.find().populate('driver')
    console.log(lostItems)
    res.status(200).render('loseItemPage', {
        title : 'item lose auto side',
        lost : lostItems
    })
})

app.use('/thank-you', (req, res)=>{
    res.status(200).render('thankou', {
        title : 'thanks page'
    })
})

app.use('/leave-review', async (req, res)=>{
    let tokens = req.cookies.jwt
    const decode = await promisify(jwt.verify)(tokens, process.env.JWTSTRING)
    const current_user = await User.findById(decode.id)
    res.status(200).render('review', {
        title : 'review page',
        user : current_user
    })
})

app.use('/terms-and-conditions', async (req,res)=>{
    res.status(200).render('tc',{
        title : 'this is terms and condition page'
    })
})


app.use('/admin-panel-one', async (req, res)=>{

    const allOrderFromSavariDB = await savari.find().populate('savari')
    const allSpecialSavaris = await specialSavari.find()
    res.status(200).render('adminPanelOne', {
        title : 'auto panel one',
        allsavari : allOrderFromSavariDB,
        specialsavari : allSpecialSavaris
    })
})

app.use('/dual-booking-track', async (req, res)=>{

    let token = req.cookies.jwt
    const decode = await promisify(jwt.verify)(token, process.env.JWTSTRING)
    const DualBookingOrder = await DualBooking.find({user : decode.id}).populate('user')
    console.log(DualBookingOrder)
    /*******************************order accepted */
    const acceptedOrder = await savari.find({})
    /************************displaying the naccredentials */
    let tokens = req.cookies.jwt
    const decodes = await promisify(jwt.verify)(tokens, process.env.JWTSTRING)
    const current_user = await User.findById(decodes.id)

    res.status(200).render('dualBookingTrack',{
        title : 'this is dual booking track page',
        dualOrder : DualBookingOrder,
        user : current_user
    })
})

app.use('/dual-booking', async (req, res)=>{
    let tokens = req.cookies.jwt
    if(!tokens){
        // res.status(400).json({
        //     message : 'You are not logged in please login or signup first',
        //     status : 404
        // })
        res.status(400).render('error',{
            message : 'You are not logged in please login or signup first',
            status : 404,
            route : '/login',
            Btn : 'Login'
        })
        return
    }
    const decode = await promisify(jwt.verify)(tokens, process.env.JWTSTRING)
    const current_user = await User.findById(decode.id)
    const currentDriver = await Driver.findById(decode.id)
    if(currentDriver){
        res.status(400).render('error',{
            message : 'You are not not allowed to do this task',
            status : 404,
            route : '/#register-auto',
            Btn : 'Go to auto panels'
        })
        return
    }

    if(!current_user){
        res.status(400).render('error',{
            message : 'You are not having a valid user account please sign-up first',
            status : 404,
            route : '/signup',
            Btn : 'Signup'
        })
        return
    }
    res.status(200).render('dualBooking',{
        title : 'this is dual booking form page',
        user : current_user
    })
})

app.use('/pre-book-status', async (req, res)=>{


    let token = req.cookies.jwt
    const decode = await promisify(jwt.verify)(token, process.env.JWTSTRING)
    const user = await User.findById(decode.id)
    const initialOrder = await preBookCity.find({user : decode.id}).populate('user')
    const Acceptedsavari = await savari.find({name : user.name})
    console.log('here is sol' + Acceptedsavari)
    // console.log(currentUser)
    // console.log(Acceptedsavari)
    res.status(200).render('preBookCityTrack', {
        title : 'pre booking tracking',
        savariAccept : Acceptedsavari,
        initialOrder : initialOrder,
        user : user
    })
})

app.use('/pre-booking', async (req, res)=>{
    let tokens = req.cookies.jwt
    if(!tokens){
        res.status(400).render('error',{
            message : 'You are not logged in please login or signup first',
            status : 404,
            route : '/login',
            Btn : 'Login'
        })
        return
    }
    const decode = await promisify(jwt.verify)(tokens, process.env.JWTSTRING)
    const current_user = await User.findById(decode.id)
    const currentDriver = await Driver.findById(decode.id)
    if(currentDriver){
        res.status(400).render('error',{
            message : 'You are not not allowed to do this task',
            status : 404,
            route : '/#register-auto',
            Btn : 'Go to auto panels'
        })
        return
    }
    if(!current_user){
        res.status(400).render('error',{
            message : 'You are not having a valid user account please sign-up first',
            status : 404,
            route : '/signup',
            Btn : 'Signup'
        })
        return
    }
    
    res.status(200).render('preBookingFromCity', {
        title : 'pre booking ordering',
        user : current_user
    })
})

app.use('/auto-special', async (req, res)=>{

    const allSpecialsOrder = await special.find().populate('user')

    // console.log(allSpecialsOrder)

    res.status(200).render('specialBookingAutoPanel', {
        title : 'special auto panel for drivers',
        orders : allSpecialsOrder
    })
})


app.use('/special', async (req, res)=>{

    const token = req.cookies.jwt
    const decodeId = await promisify(jwt.verify)(token, process.env.JWTSTRING)
    // console.log(decodeId)
    // const decode = await User.find({_id : decodeId.id})
    const userWithOrderSpecial = await special.find({user : decodeId.id}).populate('user')
    const user = await User.find({_id : decodeId.id})
    console.log('here'+ user)
    if(!user) return
    const acceptStatus = await specialSavari.find({username : user[0].name})

    /*********************displaying the nav credentials */
    let tokens = req.cookies.jwt
    const decode = await promisify(jwt.verify)(tokens, process.env.JWTSTRING)
    const current_user = await User.findById(decode.id)


    // console.log(userWithOrderSpecial)
    res.status(200).render('specialAutoTrack', {
        title : 'special bookings',
        specials : userWithOrderSpecial,
        driverDetail : acceptStatus,
        user : current_user
    })
})

app.use('/list', async (req, res)=>{

    let token = req.cookies.jwt
    const decode = await promisify(jwt.verify)(token, process.env.JWTSTRING)
    const findingDriver = await Driver.find({_id : decode.id})
    const name = findingDriver[0].name
    const driver = await savari.find({driverName : name})

    res.status(200).render('listOfStudentsInAuto', {
        title : 'list of booked savari',
        savari : driver

    })
})

app.use('/auto-periority', (req, res)=>{
    res.status(200).render('periority', {
        title : 'periority giving panel'
    })
})

app.use('/redirect', async(req, res)=>{
    let token = req.cookies.jwt
    const decode = await promisify(jwt.verify)(token, process.env.JWTSTRING)
    const currentUser = await User.findById(decode.id)
    const accepted = await savari.find({name : currentUser.name})
    console.log('starrt')
    console.log(accepted)

    console.log('close')

    res.status(200).render('paymeentRedirectPage', {
        title : 'payment redirect',
        bookDetail : accepted
    })
})

app.use('/about-us', (req, res)=>{
    res.status(200).render('about', {
        title : 'about us'
    })
})

app.use('/new-service', (req, res)=>{
    res.status(200).render('pageNotFound', {
        title : "route not availabel yet"
    })
})

app.use('/my-account', async (req, res)=>{

    let token = req.cookies.jwt
    const decode = await promisify(jwt.verify)(token, process.env.JWTSTRING)
    const current_user = await User.findById(decode.id)
    res.status(200).render('userAccount', {
        title : 'my account (user account)',
        user : current_user
    })
})

app.use('/auto-panel', async (req, res)=>{
    const allList = await autoPeriorityModel.find();
    const allOrders = await preBooking.find().populate('user');

    const allsavariFromCity = await savariInCity.find().populate('user')

    let token = req.cookies.jwt
    const decode = await promisify(jwt.verify)(token, process.env.JWTSTRING)

    const driverCurrent = await Driver.findById(decode.id)

    const savariAcceptedByCurrentDriver = await savari.find({driverName : driverCurrent.name})
    console.log(savariAcceptedByCurrentDriver)
    const dualBookings = await DualBooking.find().populate('user')

    res.status(200).render('autoOrderAcceptingPanel', {
        title : 'auto order accepting panel',
        list : allList,
        orders : allOrders,
        citySavaris : allsavariFromCity ,
        dualOrder : dualBookings,
        AllSavariaccepted : savariAcceptedByCurrentDriver
        // savariAccept : savaris
    })
})

app.use('/auto-booking', async (req, res)=>{
    let token = req.cookies.jwt
    if(!token){
        // res.status(400).json({
        //     message : 'You are not logged in please login or signup first',
        //     status : 404
        // })
        res.status(400).render('error',{
            message : 'You are not logged in please login or signup first',
            status : 404,
            route : '/login',
            Btn : 'Login'
        })
        return
    }

    const decode = await promisify(jwt.verify)(token, process.env.JWTSTRING)


    const currentUser = await User.findById(decode.id)
    const currentDriver = await Driver.findById(decode.id)
    if(currentDriver){
        res.status(400).render('error',{
            message : 'You are not not allowed to do this task',
            status : 404,
            route : '/#register-auto',
            Btn : 'Go to auto panels'
        })
        return
    }

    if(!currentUser){
        res.status(400).render('error',{
            message : 'You are not having a valid user account please sign-up first',
            status : 404,
            route : '/signup',
            Btn : 'Signup'
        })
        return
    }


    res.status(200).render('studentBooking', {
        title : 'student booking panel',
        user : currentUser
    })
})

app.use('/feedback', (req, res)=>{
    res.status(200).render('feedback', {
        title : 'feedback'
    })
})

app.use('/register-auto', (req, res)=>{
    res.status(200).render('autoRegister', {
        title : 'auto register'
    })
})

app.use('/signup', (req, res)=>{
    res.status(200).render('signup', {
        title : 'signup form'
    })
})

app.use('/login', async (req, res)=>{
    const find = async()=>{

        let token = req.cookies.jwt
        if(!token){
            return 
        }
        const decode = await promisify(jwt.verify)(token, process.env.JWTSTRING)
        const currentUser = await User.findById(decode.id)
        return currentUser
    }
    const user = await find()
    console.log(user)
    res.status(200).render('login', {
        title : 'render',
        user : user

    })
})

app.use('/', async (req, res)=>{
    const find = async(tokens)=>{

        let token = tokens
        console.log(token)
        
        if(!token){
            return 
        }
        const decode = await promisify(jwt.verify)(token, process.env.JWTSTRING)
        console.log(decode)

        if(!decode){
            return 
        }
        const currentUser = await User.findById(decode.id)
        if(!currentUser){
            return 
        }
        return currentUser
    }
    const user = await find(req.cookies.jwt)
    console.log(user)
    
    res.status(200).render('overview', {
        title : 'front page',
        user : user

    })
})


module.exports = app