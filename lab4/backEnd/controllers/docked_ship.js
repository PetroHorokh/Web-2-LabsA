const { body, validationResult } = require('express-validator/check')
const { sanitizeBody } = require('express-validator/filter')

const docked_shipListService = require('../services/docked_ship.all')
const docked_shipCreateService = require('../services/docked_ship.create')
const docked_shipDeleteService = require("../services/docked_ship.delete");

module.exports = {
    async docked_shipList (req, res) {
        try {
            const docked_shipList = await docked_shipListService()
            res.send(docked_shipList);
        } catch (error) {
            res.status(500).send({ error: error });
        }
    },
    postCreateDocked_ship: [
        body('dock')
            .isLength({ min: 1 }).trim().withMessage('Dock field must be specified.'),
        body('ship')
            .isLength({ min: 1 }).trim().withMessage('Ship field must be specified.'),
        sanitizeBody('dock').escape(),
        sanitizeBody('ship').escape(),

        async (req, res) => {
            const docked_shipData = req.body
            const errors = validationResult(req)

            if (errors.isEmpty()) {
                try {
                    const docked_ship = await docked_shipCreateService(docked_shipData)
                    res.send(docked_ship);
                } catch (error) {
                    res.status(404).send(error);
                }
            } else {
                res.status(404).send(errors);
            }
        }
    ],
    async deleteDocked_ship (req, res) {
        const docked_shipData = req.body;

        try {
            const docked_ship = await docked_shipDeleteService(docked_shipData);
            res.send(docked_ship);
        } catch (error) {
            res.status(404).send(error);
        }
    },
}