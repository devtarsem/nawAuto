const express = require('express')
const preBookingController = require('./../controller/preBookingController')
const authController = require('./../controller/authController')
const router = express.Router()

router.route('/book-auto').post(authController.protectRoute,preBookingController.preBookingReqSend)
router.route('/:id').get(preBookingController.perorityCheckingAndPayments);
router.route('/gotoRide').delete(preBookingController.GoToRide)

// router.route('/order-accepting').get(preBookingController.acceptingOrders);
router.route('/')
.get(preBookingController.getAllReqForBookings);

router.route('/:userid/travel/:reqId').get(preBookingController.AcceptingOrders);
module.exports = router