const periorityModel = require('./../model/autoPriorityModel');
const Driver = require('./../model/driverRegisteration');


exports.DisplayAllAutoPeriorityWise = async (req, res, next)=>{
    const periorityAuto = await periorityModel.find();
    // const autoNum = []
    const periorityAutoNumbers = periorityAuto.map(el=> el.driverId);
    console.log(periorityAutoNumbers)
    const periorityAutoCompletedetail = await Driver.find({_id : periorityAutoNumbers}/*, {periority : periorityAuto.periority}*/)
    console.log(periorityAutoCompletedetail)
    res.status(200).json({
        status : 'ok',
        data : {
            data : periorityAutoCompletedetail
        }
    })
}
