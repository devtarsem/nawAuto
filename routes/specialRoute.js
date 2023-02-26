const express = require('express')
const specialCOntroller = require('./../controller/specialController')
const authController = require('./../controller/authController')
const router = express.Router()
router.route('/').post(authController.protectRoute ,specialCOntroller.createSpecialOrder)

module.exports = router