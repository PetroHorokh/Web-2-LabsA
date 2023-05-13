const { body, validationResult } = require('express-validator/check')
const { sanitizeBody } = require('express-validator/filter')

const docked_shipListService = require('../services/docked_ship.all')
const docked_shipCreateService = require('../services/docked_ship.create')
const docked_shipByIdService = require("../services/docked_ship.byId");
const docked_shipDeleteService = require("../services/docked_ship.delete");
const dockListService = require('../services/dock.all')
const dockByIdService = require("../services/dock.byId");
const shipListService = require('../services/ship.all')
const shipByIdService = require("../services/ship.byId");

module.exports = {
    index (req, res) {
        res.render('pages/docked_ship/index')
    },
    async docked_shipList (req, res) {
        try {
            const docked_shipList = await docked_shipListService()

            res.render('pages/docked_ship/list', {
                docked_ships: docked_shipList
            })
        } catch (error) {
            res.render('pages/docked_ship/list', {
                docked_ships: [],
                errors: [{ msg: error.message }]
            })
        }
    },
    async createDocked_shipForm (req, res) {

        const docks = await dockListService()
        const ships = await shipListService()

        res.render('pages/docked_ship/add', {
            docks: docks,
            ships: ships,
        })
    },
    postCreateDocked_ship: [
        body('dock_id')
            .isLength({ min: 1 }).trim().withMessage('Dock field must be specified.'),
        body('ship_id')
            .isLength({ min: 1 })
            .custom(async (value, { req }) => {

                const dock = await dockByIdService(req.body.dock_id)

                const docked_ship_ids = (await docked_shipListService())
                    .map(e =>  ({
                        dock: e.dock.toString(),
                        ship: e.ship.toString(),
                    }))
                    .map(e => e.ship)

                const docked_ship_tonnage = (await shipListService())
                    .filter(e => docked_ship_ids.includes(e.id.toString())).map(e => e.tonnage)
                    .reduce((a, b) => a + b, 0)

                const added_ship = await shipByIdService(value)

                return (docked_ship_tonnage + added_ship.tonnage) < dock.capacity && added_ship.submersion <= dock.minimal_submersion
            }).trim().withMessage('Port field must have soficient tonnage for dock capacity and submersion.'),
        sanitizeBody('ship').escape(),
        sanitizeBody('dock').escape(),

        async (req, res) => {

            const docked_shipData = req.body
            const docks = await dockListService()
            const ships = await shipListService()

            const errors = validationResult(req)

            if (errors.isEmpty()) {
                try {
                    const docked_ship = await docked_shipCreateService(docked_shipData)
                    req.flash('info', `Ship "${docked_ship.ship.toString()}" in dock "${docked_ship.dock.toString()}" is Added`)
                    res.redirect('/docked_ship/list')
                } catch (error) {
                    res.render('pages/docked_ship/add', {
                        docks: docks,
                        ships: ships,
                        errors: [{ msg: error.message }]
                    })
                }
            } else {
                res.render('pages/docked_ship/add', {
                    docks: docks,
                    ships: ships,
                    errors: errors.array()
                })
            }
        }
    ],
    deleteDocked_shipFrom (req, res, next) {
        docked_shipByIdService(req.params.id)
            .then(docked_ship => {
                if (docked_ship) {
                    res.render('pages/docked_ship/delete', { docked_ship: docked_ship })
                } else {
                    const errorNotFound = new Error('Not found')
                    errorNotFound.status = 404
                    next(errorNotFound)
                }
            })
            .catch(error => {
                const errorServer = new Error(`Internal server error: ${error.message}`)
                errorServer.status = 500
                next(errorServer)
            })
    },
    deleteDocked_ship (req, res, next) {
        docked_shipDeleteService(req.body)
            .then(docked_ship => {
                req.flash('info', `Ship "${docked_ship.ship.toString()}" in dock "${docked_ship.dock.toString()}" is Deleted`)
                res.redirect('/docked_ship/list')
            })
            .catch(error => {
                res.render('pages/docked_ship/delete', {
                    docked_ship: req.body,
                    errors: [{ msg: error.message }]
                })
            })
    }
}
