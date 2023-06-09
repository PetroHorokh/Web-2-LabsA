'use strict'

const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const config = require('./config')
require('./db')(config)

const notFoundMiddleware = require('./middlewares/not_found')
const corsMiddleware = require('cors')

const indexRoutes = require('./routes')
const shipRoutes = require('./routes/ship')
const portRoutes = require('./routes/port')
const dockRoutes = require('./routes/dock')
const docked_shipRoutes = require('./routes/docked_ship')

const app = express()

app.use(logger('dev'))
app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static(__dirname))

app.use(corsMiddleware());
app.use('/', indexRoutes)
app.use('/ship', shipRoutes)
app.use('/port', portRoutes)
app.use('/dock', dockRoutes)
app.use('/docked_Ship', docked_shipRoutes)

app.use(notFoundMiddleware)

const { host, port } = config

app.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}/`)
})
