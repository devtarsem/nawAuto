const express = require('express')
const dualBookingController = require('./../controller/dualBookingController')
const router = express.Router()

router.route('/dual-booking-by-user').post(dualBookingController.dualBookingOrderCreate)
router.route('/dual-booking-accept').post(dualBookingController.dualBookingOrderAcceptByAuto)


module.exports = router
