const express = require('express');
const autoPeriorityController = require('./../controller/AutoPeriorityController')
const autoBookingPanel = require('./../controller/autoBookingPanel')
const router = express.Router()
router.route('/').get(autoPeriorityController.gettingAllPeriorityAuto);
router.route('/').post(autoPeriorityController.createPeriority);
router.route('/auto-periority-all').get(autoBookingPanel.DisplayAllAutoPeriorityWise)
module.exports = router;