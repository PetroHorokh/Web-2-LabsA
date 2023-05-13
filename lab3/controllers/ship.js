const { body, validationResult } = require('express-validator/check')
const { sanitizeBody } = require('express-validator/filter')

const shipListService = require('../services/ship.all')
const shipCreateService = require('../services/ship.create')
const shipByIdService = require("../services/ship.byId");
const shipDeleteService = require("../services/ship.delete");
const shipUpdateService = require("../services/ship.update");

module.exports = {
    index (req, res) {
        res.render('pages/ship/index')
    },
    async shipList (req, res) {
        try {
            const shipList = (Object.keys(req.query).length === 0 || req.query.searchString === '' )  ? await shipListService() : (await shipListService()).filter(e => e.name.includes(req.query.searchString))

            res.render('pages/ship/list', {
                ships: shipList
            })
        } catch (error) {
            res.render('pages/ship/list', {
                ships: [],
                errors: [{ msg: error.message }]
            })
        }
    },
    createShipForm (req, res) {
        res.render('pages/ship/add')
    },
    postCreateShip: [
        body('number')
            .isLength({ min: 1 }).trim().withMessage('Number field must be specified.'),
        body('name')
            .isLength({ min: 1 }).trim().withMessage('Name field must be specified.'),
        body('country')
            .isLength({ min: 1 }).trim().withMessage('Country field must be specified.'),
        body('tonnage')
            .isLength({ min: 1 }).trim().withMessage('Tonnage field must be specified.'),
        body('submersion')
            .isLength({ min: 1 }).trim().withMessage('Submersion field must be specified.'),
        sanitizeBody('name').escape(),
        sanitizeBody('number').escape(),
        sanitizeBody('country').escape(),
        sanitizeBody('tonnage').escape(),
        sanitizeBody('submersion').escape(),

        async (req, res) => {

            const shipData = req.body
            const errors = validationResult(req)

            if (errors.isEmpty()) {
                try {
                    const ship = await shipCreateService(shipData)
                    req.flash('info', `Ship "${ship.name}" with number "${ship.number}" is Added`)
                    res.redirect('/ship/list')
                } catch (error) {
                    res.render('pages/ship/add', {
                        errors: [{ msg: error.message }]
                    })
                }
            } else {
                res.render('pages/ship/add', {
                    errors: errors.array()
                })
            }
        }
    ],
    updateShipForm (req, res, next) {
        shipByIdService(req.params.id)
            .then(ship => {
                if (ship) {
                    res.render('pages/ship/update', { ship: ship })
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
    putUpdateShip: [
        body('number')
            .isLength({ min: 1 }).trim().withMessage('Number field must be specified.'),
        body('name')
            .isLength({ min: 1 }).trim().withMessage('Name field must be specified.'),
        body('country')
            .isLength({ min: 1 }).trim().withMessage('Country field must be specified.'),
        body('tonnage')
            .isLength({ min: 1 }).trim().withMessage('Tonnage field must be specified.'),
        body('submersion')
            .isLength({ min: 1 }).trim().withMessage('Submersion field must be specified.'),
        sanitizeBody('name').escape(),
        sanitizeBody('number').escape(),
        sanitizeBody('country').escape(),
        sanitizeBody('tonnage').escape(),
        sanitizeBody('submersion').escape(),
        (req, res, next) => {
            const shipData = req.body

            const errors = validationResult(req)
            if (errors.isEmpty()) {
                shipUpdateService(shipData)
                    .then(ship => {
                        req.flash('info', `Ship "#${ship.id} ${ship.name} ${ship.number}" is Updated`)
                        res.redirect('/ship/list')
                    })
                    .catch(error => {
                        res.render('pages/ship/update', {
                            ship: {},
                            newShip: shipData,
                            errors: [{ msg: error.message }]
                        })
                    })
            } else {
                res.render('pages/ship/update', {
                    ship: {},
                    newShip: shipData,
                    errors: errors.array()
                })
            }
        }
    ],
    deleteShipFrom (req, res, next) {
        shipByIdService(req.params.id)
            .then(ship => {
                if (ship) {
                    res.render('pages/ship/delete', { ship: ship })
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
    deleteShip (req, res, next) {
        shipDeleteService(req.body)
            .then(ship => {
                req.flash('info', `Ship "#${ship.id} ${ship.name} ${ship.number}" is Deleted`)
                res.redirect('/ship/list')
            })
            .catch(error => {
                res.render('pages/ship/delete', {
                    ship: req.body,
                    errors: [{ msg: error.message }]
                })
            })
    },
    async findShipByNumber (req, res) {
        try {
            const shipList = await shipListService()

            const result = shipList.filter(e => {
                return e.number.includes(req.query.searchString)
            })

            res.render('pages/ship/list', {
                ships: result
            })
        } catch (error) {
            res.render('pages/ship/list', {
                ships: [],
                errors: [{ msg: error.message }]
            })
        }
    }
}
