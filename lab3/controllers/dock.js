const { body, validationResult } = require('express-validator/check')
const { sanitizeBody } = require('express-validator/filter')

const dockListService = require('../services/dock.all')
const dockCreateService = require('../services/dock.create')
const dockByIdService = require("../services/dock.byId");
const dockDeleteService = require("../services/dock.delete");
const dockUpdateService = require("../services/dock.update");
const portListService = require('../services/port.all')

module.exports = {
    index (req, res) {
        res.render('pages/dock/index')
    },
    async dockList (req, res) {
        try {
            const dockList = await dockListService()
            res.render('pages/dock/list', {
                docks: dockList
            })
        } catch (error) {
            res.render('pages/dock/list', {
                docks: [],
                errors: [{ msg: error.message }]
            })
        }
    },
    createDockForm (req, res) {

        const ports = portListService()

        res.render('pages/dock/add', {
            ports: ports,
        })
    },
    postCreateDock: [
        body('port')
            .isLength({ min: 1 }).trim().withMessage('Port field must be specified.'),
        body('number')
            .isLength({ min: 1 }).trim().withMessage('Number field must be specified.'),
        body('capacity')
            .isLength({ min: 1 }).trim().withMessage('Capacity field must be specified.'),
        body('minimal_submersion')
            .isLength({ min: 1 }).trim().withMessage('Minimal submersion field must be specified.'),
        sanitizeBody('port').escape(),
        sanitizeBody('number').escape(),
        sanitizeBody('capacity').escape(),
        sanitizeBody('minimal_submersion').escape(),

        async (req, res) => {

            const dockData = req.body

            const ports = portListService()

            const errors = validationResult(req)

            if (errors.isEmpty()) {
                try {
                    const dock = await dockCreateService(dockData)
                    req.flash('info', `Dock in port "${dock.port.toString()}" with number "${dock.number}" is Added`)
                    res.redirect('/dock/list')
                } catch (error) {
                    res.render('pages/dock/add', {
                        ports: ports,
                        errors: [{ msg: error.message }]
                    })
                }
            } else {
                res.render('pages/dock/add', {
                    ports: ports,
                    errors: errors.array()
                })
            }
        }
    ],
    updateDockForm (req, res, next) {
        dockByIdService(req.params.id)
            .then(dock => {
                if (dock) {

                    const ports = portListService()

                    res.render('pages/dock/update', {
                        ports: ports,
                        dock: dock
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
    putUpdateDock: [
        body('port')
            .isLength({ min: 1 }).trim().withMessage('Port field must be specified.'),
        body('number')
            .isLength({ min: 1 }).trim().withMessage('Number field must be specified.'),
        body('capacity')
            .isLength({ min: 1 }).trim().withMessage('Capacity field must be specified.'),
        body('minimal_submersion')
            .isLength({ min: 1 }).trim().withMessage('Minimal submersion field must be specified.'),
        sanitizeBody('port').escape(),
        sanitizeBody('number').escape(),
        sanitizeBody('capacity').escape(),
        sanitizeBody('minimal_submersion').escape(),
        (req, res, next) => {
            const dockData = req.body
            const ports = portListService()
            const errors = validationResult(req)
            if (errors.isEmpty()) {
                dockUpdateService(dockData)
                    .then(dock => {
                        req.flash('info', `Dock in port "${dock.port.toString()}" with number "${dock.number}" is Updated`)
                        res.redirect('/dock/list')
                    })
                    .catch(error => {
                        res.render('pages/dock/update', {
                            dock: {},
                            newDock: dockData,
                            ports: ports,
                            errors: [{ msg: error.message }]
                        })
                    })
            } else {
                res.render('pages/dock/update', {
                    dock: {},
                    newDock: dockData,
                    ports: ports,
                    errors: errors.array()
                })
            }
        }
    ],
    deleteDockFrom (req, res, next) {
        dockByIdService(req.params.id)
            .then(dock => {
                if (dock) {
                    res.render('pages/dock/delete', { dock: dock })
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
    deleteDock (req, res, next) {
        dockDeleteService(req.body)
            .then(dock => {
                req.flash('info', `Dock in port "${dock.port.toString()}" with number "${dock.number}" is Deleted`)
                res.redirect('/dock/list')
            })
            .catch(error => {
                res.render('pages/dock/delete', {
                    dock: req.body,
                    errors: [{ msg: error.message }]
                })
            })
    }
}
