const { body, validationResult } = require('express-validator/check')
const { sanitizeBody } = require('express-validator/filter')

const portListService = require('../services/port.all')
const portCreateService = require('../services/port.create')
const portDeleteService = require("../services/port.delete");
const portUpdateService = require("../services/port.update");

module.exports = {
    async portList (req, res) {
        try {
            const portList = await portListService()
            res.send(portList);
        } catch (error) {
            res.status(500).send({ error: error });
        }
    },
    postCreatePort: [
        body('number')
            .isLength({ min: 1 }).trim().withMessage('Number field must be specified.'),
        body('name')
            .isLength({ min: 1 }).trim().withMessage('Name field must be specified.'),
        body('country')
            .isLength({ min: 1 }).trim().withMessage('Country field must be specified.'),
        body('address')
            .isLength({ min: 1 }).trim().withMessage('Address field must be specified.'),
        sanitizeBody('name').escape(),
        sanitizeBody('number').escape(),
        sanitizeBody('country').escape(),
        sanitizeBody('address').escape(),

        async (req, res) => {
            const portData = req.body
            const errors = validationResult(req)

            if (errors.isEmpty()) {
                try {
                    const port = await portCreateService(portData)
                    res.send(port);
                } catch (error) {
                    res.status(404).send(error);
                }
            } else {
                res.status(404).send(errors);
            }
        }
    ],
    putUpdatePort: [
        body('number')
            .isLength({ min: 1 }).trim().withMessage('Number field must be specified.'),
        body('name')
            .isLength({ min: 1 }).trim().withMessage('Name field must be specified.'),
        body('country')
            .isLength({ min: 1 }).trim().withMessage('Country field must be specified.'),
        body('address')
            .isLength({ min: 1 }).trim().withMessage('Address field must be specified.'),
        sanitizeBody('name').escape(),
        sanitizeBody('number').escape(),
        sanitizeBody('country').escape(),
        sanitizeBody('address').escape(),
        async (req, res) => {
            const portData = req.body
            const errors = validationResult(req)

            if (errors.isEmpty()) {
                try {
                    const port = await portUpdateService(portData)
                    res.send(port);
                } catch (error) {
                    res.status(404).send(error);
                }
            } else {
                res.status(404).send(errors);
            }
        }
    ],
    async deletePort (req, res) {
        const portData = req.body;
        try {
            const port = await portDeleteService(portData);
            res.send(port);
        } catch (error) {
            res.status(404).send(error);
        }
    },
}