const express = require('express')
const router = express.Router()

const portController = require('./../controllers/port')

router.get('/list', portController.portList)
router.post('/add', portController.postCreatePort)
router.put('/edit', portController.putUpdatePort)
router.post('/remove', portController.deletePort)

module.exports = router