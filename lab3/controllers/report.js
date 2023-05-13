const dockAllService = require('./../services/dock.all');
const shipAllService = require('./../services/ship.all');
const portAllService = require('./../services/port.all');
const docked_shipAllService = require('./../services/docked_ship.all');
const portByIdService = require("../services/port.byId");
const {body, validationResult} = require("express-validator/check");

module.exports = {
    index (req, res) {
        res.render('pages/report/index')
    },
    async createReport1Form (req, res) {

        const dockData = req.query
        const docks = (await dockAllService()).map(e => ({
            id: e.id.toString(),
            number: e.number,
        }))

        const docked_ship_ids = (await docked_shipAllService())
            .map(e => ({
            ship: e.ship.toString(),
            dock: e.dock.toString(),
        }))
            .filter(e => e.dock === dockData.dock_id)
            .map(e => e.ship)

        const ships = (await shipAllService()).map(e => ({
            id: e.id.toString(),
            name: e.name.toString(),
            number: e.number.toString(),
        }))
            .filter(e => docked_ship_ids.includes(e.id))

        try {
            res.render('pages/report/report1', {
                docks: docks,
                ships: ships,
            })
        } catch (error) {
            res.render('pages/report/report1', {
                docks: docks,
                ships: [],
                errors: [{ msg: error.message }]
            })
        }
    },
    async createReport2Form (req, res) {

        const portData = await portByIdService(req.query.port_id)

        const ports = await portAllService()

        const docks = ( await dockAllService()).map(e => ({
            id: e.id.toString(),
            port: e.port.toString(),
        }))
            .filter(e => e.port === req.query.port_id)
            .map(e => e.id)

        const ships_in_docks = (await docked_shipAllService())
            .map(e => ({
                ship: e.ship.toString(),
                dock: e.dock.toString(),
            }))
            .filter(e => docks.includes(e.dock))

        try {
            res.render('pages/report/report2', {
                ports: ports,
                ships_in_docks: ships_in_docks,
            })
        } catch (error) {
            res.render('pages/report/report2', {
                ports: ports,
                ships_in_docks: [],
                errors: [{ msg: error.message }]
            })
        }
    },
}
