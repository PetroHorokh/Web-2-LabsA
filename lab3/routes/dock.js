'use strict'

const express = require('express')
const router = express.Router()

const dockController = require('./../controllers/dock')

router.get('/', dockController.index)
router.get('/list', dockController.dockList)
router.get('/add', dockController.createDockForm)
router.post('/add', dockController.postCreateDock)
router.get('/remove/:id', dockController.deleteDockFrom)
router.post('/remove/:id', dockController.deleteDock)

module.exports = router
