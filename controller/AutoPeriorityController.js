const { findByIdAndUpdate } = require('../model/driverRegisteration');
const Driver = require('../model/driverRegisteration');
const AutoPriorityModel = require('./../model/autoPriorityModel')
// const preBooking = require('./../model/autoPriorityModel')
exports.gettingAllPeriorityAuto = async (req, res, next)=>{
    let allAutoSeries = AutoPriorityModel.find();
    if(req.params.sort){
        allAutoSeries.sort(req.params.sort)
    }

    const allList = await allAutoSeries
    res.status(200).json({
        status : 'ok',
        data : {
            data : allList
        }
    })
}

exports.createPeriority = async (req, res, next)=>{
    const autoPeriority = await AutoPriorityModel.create(req.body);
    console.log(autoPeriority)
    // autoPeriority.driverId = 
    const finding_current_driver = await Driver.find({autoNumber : autoPeriority.autoNumber})
    console.log(finding_current_driver)
    autoPeriority.autoDriver = finding_current_driver
    await autoPeriority.save()
    // autoPeriority.driverId = finding_current_driver._id
    res.status(200).json({
        status : 'ok',
        data : {
            data : autoPeriority,
            autoDriver : finding_current_driver
        }
    })
}



