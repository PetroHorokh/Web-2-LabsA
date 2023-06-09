const Port = require('./../models/port')

/**
 * @param {Object} data
 */
module.exports = function (data) {
    const portData = {
        name: data.name,
        number: data.number,
        country: data.country,
        address: data.address,
    }

    return new Promise((resolve, reject) => {
        Port.findByIdAndUpdate(
            data._id,
            { $set: portData },
            { new: true },
            function (err, updatedPort) {
                if (err) {
                    reject(err)
                } else {
                    resolve(updatedPort)
                }
            })
    })
}