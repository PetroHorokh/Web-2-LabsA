const mongoose = require('mongoose')

const Schema = mongoose.Schema

const dockSchema = new Schema({
    port: { type: Schema.Types.ObjectId, ref: 'Port' },
    number: { type: Number, required: true, max: 999999, unique: true},
    capacity: { type: Number, required: true, max: 500 },
    minimal_submersion: { type: Number, required: true, min: 10, max: 60 },
})

module.exports = mongoose.model('Dock', dockSchema,'dock')

