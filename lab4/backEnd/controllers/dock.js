const { body, validationResult } = require('express-validator/check')
const { sanitizeBody } = require('express-validator/filter')

const dockListService = require('../services/dock.all')
const dockCreateService = require('../services/dock.create')
const dockDeleteService = require("../services/dock.delete");
const dockUpdateService = require("../services/dock.update");

module.exports = {
    async dockList (req, res) {
        try {
            const dockList = await dockListService()
            res.send(dockList);
        } catch (error) {
            res.status(500).send({ error: error });
        }
    },
    postCreateDock: [
        body('port')
            .isLength({ min: 1 }).trim().withMessage('Port Name field must be specified.'),
        body('number')
            .isLength({ min: 1 }).trim().withMessage('Number field must be specified.'),
        body('capacity')
            .isLength({ min: 1 }).trim().withMessage('Capacity field must be specified.'),
        body('minimal_submersion')
            .isLength({ min: 1 }).trim().withMessage('Minimal Submersion field must be specified.'),
        sanitizeBody('port').escape(),
        sanitizeBody('number').escape(),
        sanitizeBody('capacity').escape(),
        sanitizeBody('minimal_submersion').escape(),

        async (req, res) => {
            const dockData = req.body
            const errors = validationResult(req)

            if (errors.isEmpty()) {
                try {
                    const dock = await dockCreateService(dockData)
                    res.send(dock);
                } catch (error) {
                    res.status(404).send(error);
                }
            } else {
                res.status(404).send(errors);
            }
        }
    ],
    putUpdateDock: [
        body('port')
            .isLength({ min: 1 }).trim().withMessage('Port Name field must be specified.'),
        body('number')
            .isLength({ min: 1 }).trim().withMessage('Number field must be specified.'),
        body('capacity')
            .isLength({ min: 1 }).trim().withMessage('Capacity field must be specified.'),
        body('minimal_submersion')
            .isLength({ min: 1 }).trim().withMessage('Minimal Submersion field must be specified.'),
        sanitizeBody('port').escape(),
        sanitizeBody('number').escape(),
        sanitizeBody('capacity').escape(),
        sanitizeBody('minimal_submersion').escape(),

        async (req, res) => {
            const dockData = req.body
            console.log(dockData)
            const errors = validationResult(req)

            if (errors.isEmpty()) {
                try {
                    const dock = await dockUpdateService(dockData)
                    res.send(dock);
                } catch (error) {
                    res.status(404).send(error);
                }
            } else {
                res.status(404).send(errors);
            }
        }
    ],
    async deleteDock (req, res) {
        const dockData = req.body;

        try {
            const dock = await dockDeleteService(dockData);
            res.send(dock);
        } catch (error) {
            res.status(404).send(error);
        }
    },
}