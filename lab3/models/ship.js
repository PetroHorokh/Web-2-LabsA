const mongoose = require('mongoose')

const Schema = mongoose.Schema

const shipSchema = new Schema({
    name: {type: String, required: true, min: 5, max: 30},
    number: { type: Number, required: true, max: 999999, unique: true},
    country: {type: String, required: true, min: 1, max: 30},
    tonnage: {type: Number, required: true, min: 20, max: 100},
    submersion: {type: Number, required: true, mix: 1, max: 10},
})

module.exports = mongoose.model('Ship', shipSchema,'ship')
