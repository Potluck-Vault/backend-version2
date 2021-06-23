const express = require('express')
const helmet = require('helmet')
const cors = require('cors')

const potlucksRouter = require('./potlucks/router')

const server = express()
server.use(express.json())
server.use(helmet())
server.use(cors())

server.use((err, req, res, next) => {//eslint-disable-line
    res.status(500).json({ error: err, message: err.message })
  })

server.use('/api/potlucks', potlucksRouter)

module.exports = server
