const express = require('express')
const router = express.Router()
const driverController = require('./../controller/driverController')
const preBookingController = require('./../controller/preBookingController')
const speicalController = require('./../controller/specialController')
router.route('/currentId', driverController.decodingTheCurrentDriver)
router.route('/order-accepting').post(preBookingController.acceptingOrders);
router.route('/special-order-booking').post(speicalController.autoDriverAcceptingSpecialOrder)
router.route('/acceting-savari-from-city').post(preBookingController.acceptingSavariFromCity)
router.route('/lose-item-auto-fill').post(driverController.LoseItemFilling)
router
.route('/')
.post(driverController.createDriver)
.get(driverController.getAllDrivers)


router.route('/:id')
.get(driverController.getOneDriver)
.patch(driverController.updateDriver)
module.exports = router