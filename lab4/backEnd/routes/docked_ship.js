const express = require('express')
const router = express.Router()

const docked_shipController = require('./../controllers/docked_ship')

router.get('/list', docked_shipController.docked_shipList)
router.post('/add', docked_shipController.postCreateDocked_ship)
router.post('/remove', docked_shipController.deleteDocked_ship)

module.exports = router