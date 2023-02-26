const express = require('express')
const userController = require('./../controller/userController')
const authController = require('./../controller/authController')
const specialController = require('./../controller/specialController')
const preBooking_from_city_controller = require('./../controller/preBookingFromCityController')
const chatBotServer = require('./../controller/chatbotServer')
const search_engine = require('./../controller/javaScriptSearch')
const router = express.Router()
router.route('/signup').post(authController.signup)
router.route('/login').post(authController.login)
router.route('/create/orderId').post(userController.paymentAccepting)
router.route('/').post(specialController.createSpecialOrder)
router.route('/feedback').post(userController.feedback)
router.route('/prebooking-Order-from-city').post(preBooking_from_city_controller.createPreBookingOrder)
router.route('/change-name').post(userController.name_changing)
router.route('/change-rollNumber').post(userController.rollNumber_changing)
router.route('/change-branch').post(userController.branch_changing)
router.route('/change-mobile').post(userController.mobile_changing)
router.route('/change-mobile-two').post(userController.mobile_changing_two)
router.route('/change-gender').post(userController.gender_changing)
router.route('/change-dp').post(userController.dpChanging)
router.route('/chat').post(chatBotServer.sendingChatData)
router.route('/search-engine').post(search_engine.searchEngine)

router.route('/canceliing-timeout-order').post(userController.cancellingOrderAfterTimeout)
router.route('/review-write').post(userController.reviewWriting)

router
.route('/')
.post(userController.createuser)
.get(userController.getAllUsers)

router
.route('/:id')
.get(userController.getSingleUser)
.patch(userController.updateUser)
.delete(userController.deleteUser)

module.exports = router



