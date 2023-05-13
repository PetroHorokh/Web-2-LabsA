const mongoose = require('mongoose')

const Schema = mongoose.Schema

const docked_shipSchema = new Schema({
    dock: { type: Schema.Types.ObjectId, ref: 'Dock' },
    ship: { type: Schema.Types.ObjectId, ref: 'Ship', unique: true },
})

module.exports = mongoose.model('Docked_ship', docked_shipSchema,'docked_ship')
