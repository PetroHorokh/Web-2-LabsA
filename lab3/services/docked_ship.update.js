const Docked_ship = require('./../models/docked_ship')

/**
 * @param {Object} data
 */
module.exports = function (data) {
    const docked_shipData = {
        dock: data.dock_id,
        ship: data.ship_id,
    }

    return new Promise((resolve, reject) => {
        Docked_ship.findByIdAndUpdate(
            data.id,
            { $set: docked_shipData },
            { new: true },
            function (err, updatedDocked_ship) {
                if (err) {
                    reject(err)
                } else {
                    resolve(updatedDocked_ship)
                }
            })
    })
}
