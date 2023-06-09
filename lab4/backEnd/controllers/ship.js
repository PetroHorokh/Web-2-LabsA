const { body, validationResult } = require('express-validator/check')
const { sanitizeBody } = require('express-validator/filter')

const shipListService = require('../services/ship.all')
const shipCreateService = require('../services/ship.create')
const shipDeleteService = require("../services/ship.delete");
const shipUpdateService = require("../services/ship.update");

module.exports = {
  async shipList (req, res) {
    try {
      const shipList = await shipListService()
      res.send(shipList);
    } catch (error) {
      res.status(500).send({ error: error });
    }
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
          res.send(ship);
        } catch (error) {
          res.status(404).send(error);
        }
      } else {
        res.status(404).send(errors);
      }
    }
  ],
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
    async (req, res) => {
      const shipData = req.body
      console.log(shipData)
      const errors = validationResult(req)

      if (errors.isEmpty()) {
        try {
          const ship = await shipUpdateService(shipData)
          res.send(ship);
        } catch (error) {
          res.status(404).send(error);
        }
      } else {
        res.status(404).send(errors);
      }
    }
  ],
  async deleteShip (req, res) {
    const shipData = req.body;

    try {
      const ship = await shipDeleteService(shipData);
      res.send(ship);
    } catch (error) {
      res.status(404).send(error);
    }
  },
}