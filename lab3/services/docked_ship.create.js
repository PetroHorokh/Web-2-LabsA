const Docked_ship = require('./../models/docked_ship')

/**
 * @param {Object} data
 */
module.exports = function (data) {
    const docked_ship = new Docked_ship({
        dock: data.dock_id,
        ship: data.ship_id,
    })

    return new Promise((resolve, reject) => {
        docked_ship.save(function (err, createdDocked_ship) {
            if (err) {
                reject(err)
            } else {
                resolve(createdDocked_ship)
            }
        })
    })
}
