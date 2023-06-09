const Ship = require('./../models/ship')

/**
 * @param {Object} data
 */
module.exports = function (data) {
  return new Promise((resolve, reject) => {
    Ship.findByIdAndDelete(data._id, function (err, deletedShip) {
      if (err) {
        reject(err)
      } else {
        resolve(deletedShip)
      }
    })
  })
}