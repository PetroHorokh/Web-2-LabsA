const { body, validationResult } = require('express-validator/check')
const { sanitizeBody } = require('express-validator/filter')

const portListService = require('../services/port.all')
const portCreateService = require('../services/port.create')
const portByIdService = require("../services/port.byId");
const portDeleteService = require("../services/port.delete");
const portUpdateService = require("../services/port.update");
const shipListService = require("../services/ship.all");

module.exports = {
    index (req, res) {
        res.render('pages/port/index')
    },
    async portList (req, res) {
        try {
            const portList = (Object.keys(req.query).length === 0 || req.query.searchString === '' )  ? await portListService() : (await portListService()).filter(e => e.name.includes(req.query.searchString))

            res.render('pages/port/list', {
                ports: portList
            })
        } catch (error) {
            res.render('pages/port/list', {
                ports: [],
                errors: [{ msg: error.message }]
            })
        }
    },
    createPortForm (req, res) {
        res.render('pages/port/add')
    },
    postCreatePort: [
        body('name')
            .isLength({ min: 1 }).trim().withMessage('Name field must be specified.'),
        body('country')
            .isLength({ min: 1 }).trim().withMessage('Country field must be specified.'),
        body('number')
            .isLength({ min: 1 }).trim().withMessage('Number field must be specified.'),
        body('address')
            .isLength({ min: 1 }).trim().withMessage('Address submersion field must be specified.'),
        sanitizeBody('name').escape(),
        sanitizeBody('country').escape(),
        sanitizeBody('number').escape(),
        sanitizeBody('address').escape(),

        async (req, res) => {

            const portData = req.body
            const errors = validationResult(req)

            if (errors.isEmpty()) {
                try {
                    const port = await portCreateService(portData)
                    req.flash('info', `Port "${port.number}" in country "${port.country}" is Added`)
                    res.redirect('/port/list')
                } catch (error) {
                    res.render('pages/port/add', {
                        errors: [{ msg: error.message }]
                    })
                }
            } else {
                res.render('pages/port/add', {
                    errors: errors.array()
                })
            }
        }
    ],
    updatePortForm (req, res, next) {
        portByIdService(req.params.id)
            .then(port => {
                if (port) {
                    res.render('pages/port/update', { port: port })
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
    putUpdatePort: [
        body('name')
            .isLength({ min: 1 }).trim().withMessage('Name field must be specified.'),
        body('country')
            .isLength({ min: 1 }).trim().withMessage('Country field must be specified.'),
        body('number')
            .isLength({ min: 1 }).trim().withMessage('Number field must be specified.'),
        body('address')
            .isLength({ min: 1 }).trim().withMessage('Address submersion field must be specified.'),
        sanitizeBody('name').escape(),
        sanitizeBody('country').escape(),
        sanitizeBody('number').escape(),
        sanitizeBody('address').escape(),
        (req, res, next) => {
            const portData = req.body

            const errors = validationResult(req)
            if (errors.isEmpty()) {
                portUpdateService(portData)
                    .then(port => {
                        req.flash('info', `Port "${port.number}" in country "${port.country}" is Updated`)
                        res.redirect('/port/list')
                    })
                    .catch(error => {
                        res.render('pages/port/update', {
                            port: {},
                            newPort: portData,
                            errors: [{ msg: error.message }]
                        })
                    })
            } else {
                res.render('pages/port/update', {
                    port: {},
                    newPort: portData,
                    errors: errors.array()
                })
            }
        }
    ],
    deletePortFrom (req, res, next) {
        portByIdService(req.params.id)
            .then(port => {
                if (port) {
                    res.render('pages/port/delete', { port: port })
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
    deletePort (req, res, next) {
        portDeleteService(req.body)
            .then(port => {
                req.flash('info', `Port "${port.number}" in country "${port.country}" is Deleted`)
                res.redirect('/port/list')
            })
            .catch(error => {
                res.render('pages/port/delete', {
                    port: req.body,
                    errors: [{ msg: error.message }]
                })
            })
    }
}
