const Dock = require('./../models/dock')

/**
 * @param {Object} data
 */
module.exports = function () {
    return new Promise((resolve, reject) => {
        Dock.find({})
            .exec(function (err, dock) {
                if (err) {
                    reject(err)
                } else {
                    resolve(dock)
                }
            })
    })
}
