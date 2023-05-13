'use strict'

const express = require('express')
const router = express.Router()

const docked_shipController = require('./../controllers/docked_ship')

router.get('/', docked_shipController.index)
router.get('/list', docked_shipController.docked_shipList)
router.get('/add', docked_shipController.createDocked_shipForm)
router.post('/add', docked_shipController.postCreateDocked_ship)
router.get('/remove/:id', docked_shipController.deleteDocked_shipFrom)
router.post('/remove/:id', docked_shipController.deleteDocked_ship)

module.exports = router
