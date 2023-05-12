const Docked_ship = require('./../models/docked_ship')

/**
 * @param {Object} data
 */
module.exports = function (id) {
    return new Promise((resolve, reject) => {
        Docked_ship.findById(id, function (err, docked_ship) {
            if (err) {
                reject(err)
            } else {
                resolve(docked_ship)
            }
        })
    })
}
