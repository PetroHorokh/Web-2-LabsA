const express = require('express')
const router = express.Router()

const dockController = require('./../controllers/dock')

router.get('/list', dockController.dockList)
router.post('/add', dockController.postCreateDock)
router.put('/edit', dockController.putUpdateDock)
router.post('/remove', dockController.deleteDock)

module.exports = router