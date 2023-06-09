'use strict'

if (process.env.NODE_ENV !== 'production') {
  const dotenv = require('dotenv')
  dotenv.config()
}

const env = process.env

module.exports = {
  host: env.HOST || 'localhost',
  port: env.PORT || 8080,
  db_connection: "mongodb+srv://Anastasiia:samsung20031712@cluster0.y2tu2h9.mongodb.net/?retryWrites=true&w=majority"
}