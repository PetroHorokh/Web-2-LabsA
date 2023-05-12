const mongoose = require('mongoose')

const Schema = mongoose.Schema

const portSchema = new Schema({
    name: {type: String, required: true, min: 5, max: 30},
    number: { type: Number, required: true, max: 999999, unique: true},
    country: {type: String, required: true, min: 1, max: 30},
    address: {type: String, required: true, min: 10, max: 50},
})

module.exports = mongoose.model('Port', portSchema,'port')
