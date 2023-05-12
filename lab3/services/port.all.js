const Port = require('./../models/port')

/**
 * @param {Object} data
 */
module.exports = function () {
    return new Promise((resolve, reject) => {
        Port.find({})
            .exec(function (err, port) {
                if (err) {
                    reject(err)
                } else {
                    resolve(port)
                }
            })
    })
}
