const Docked_ship = require('./../models/docked_ship')

/**
 * @param {Object} data
 */
module.exports = function (data) {
    return new Promise((resolve, reject) => {
        Docked_ship.findByIdAndDelete(data.id, function (err, deletedDocked_ship) {
            if (err) {
                reject(err)
            } else {
                resolve(deletedDocked_ship)
            }
        })
    })
}
