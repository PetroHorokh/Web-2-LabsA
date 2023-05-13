'use strict'

const express = require('express')
const router = express.Router()

const reportController = require('./../controllers/report')

router.get('/', reportController.index)
router.get('/report1', reportController.createReport1Form)
router.get('/report2', reportController.createReport2Form)

module.exports = router
