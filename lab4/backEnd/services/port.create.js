const Port = require('./../models/port')

/**
 * @param {Object} data
 */
module.exports = function (data) {
    const port = new Port({
        name: data.name,
        number: data.number,
        country: data.country,
        address: data.address
    })

    return new Promise((resolve, reject) => {
        port.save(function (err, createdPort) {
            if (err) {
                reject(err)
            } else {
                resolve(createdPort)
            }
        })
    })
}