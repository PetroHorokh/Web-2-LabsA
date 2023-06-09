const express = require('express')
const router = express.Router()

const shipController = require('./../controllers/ship')

router.get('/list', shipController.shipList)
router.post('/add', shipController.postCreateShip)
router.put('/edit', shipController.putUpdateShip)
router.post('/remove', shipController.deleteShip)

module.exports = router