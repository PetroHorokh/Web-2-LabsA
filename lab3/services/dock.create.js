const Dock = require('./../models/dock')

/**
 * @param {Object} data
 */
module.exports = function (data) {
    const dock = new Dock({
        port: data.port_id,
        number: data.number,
        capacity: data.capacity,
        minimal_submersion: data.minimal_submersion,
    })

    return new Promise((resolve, reject) => {
        dock.save(function (err, createdDock) {
            if (err) {
                reject(err)
            } else {
                resolve(createdDock)
            }
        })
    })
}
