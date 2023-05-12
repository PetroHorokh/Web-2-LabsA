const Dock = require('./../models/dock')

/**
 * @param {Object} data
 */
module.exports = function (data) {
    const dockData = {
        port: data.port_id,
        number: data.number,
        capacity: data.capacity,
        minimal_submersion: data.minimal_submersion,
    }

    return new Promise((resolve, reject) => {
        Dock.findByIdAndUpdate(
            data.id,
            { $set: dockData },
            { new: true },
            function (err, updatedDock) {
                if (err) {
                    reject(err)
                } else {
                    resolve(updatedDock)
                }
            })
    })
}
