const { body, validationResult } = require('express-validator/check')
const { sanitizeBody } = require('express-validator/filter')

const docked_shipListService = require('../services/docked_ship.all')
const docked_shipCreateService = require('../services/docked_ship.create')
const docked_shipByIdService = require("../services/docked_ship.byId");
const docked_shipDeleteService = require("../services/docked_ship.delete");
const docked_shipUpdateService = require("../services/docked_ship.update");
const dockListService = require('../services/dock.all')
const shipListService = require('../services/ship.all')

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
    createDocked_shipForm (req, res) {

        const docks = dockListService()
        const ships = shipListService()

        res.render('pages/docked_ship/add', {
            docks: docks,
            ships: ships,
        })
    },
    postCreateDocked_ship: [
        body('dock')
            .isLength({ min: 1 }).trim().withMessage('Dock field must be specified.'),
        body('ship')
            .isLength({ min: 1 }).trim().withMessage('Ship field must be specified.'),
        sanitizeBody('ship').escape(),
        sanitizeBody('dock').escape(),

        async (req, res) => {

            const docked_shipData = req.body
            const docks = dockListService()
            const ships = shipListService()
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
    updateDocked_shipForm (req, res, next) {
        docked_shipByIdService(req.params.id)
            .then(docked_ship => {
                if (docked_ship) {

                    const docks = dockListService()
                    const ships = shipListService()

                    res.render('pages/docked_ship/update', {
                        docked_ship: docked_ship,
                        docks: docks,
                        ships: ships,
                    })
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
    putUpdateDocked_ship: [
        body('dock')
            .isLength({ min: 1 }).trim().withMessage('Dock field must be specified.'),
        body('ship')
            .isLength({ min: 1 }).trim().withMessage('Ship field must be specified.'),
        sanitizeBody('ship').escape(),
        sanitizeBody('dock').escape(),
        (req, res, next) => {
            const docked_shipData = req.body
            const docks = dockListService()
            const ships = shipListService()

            const errors = validationResult(req)
            if (errors.isEmpty()) {
                docked_shipUpdateService(docked_shipData)
                    .then(docked_ship => {
                        req.flash('info', `Ship "${docked_ship.ship.toString()}" in dock "${docked_ship.dock.toString()}" is Updated`)
                        res.redirect('/docked_ship/list')
                    })
                    .catch(error => {
                        res.render('pages/docked_ship/update', {
                            docked_ship: {},
                            newDocked_ship: docked_shipData,
                            docks: docks,
                            ships: ships,
                            errors: [{ msg: error.message }]
                        })
                    })
            } else {
                res.render('pages/docked_ship/update', {
                    docked_ship: {},
                    newDocked_ship: docked_shipData,
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
