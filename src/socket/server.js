'use strict';

const app = require('express')(),
  morgan = require('morgan'),
  { createLogger, transports, format } = require('winston'),
  bodyParser = require('body-parser'),
  dailyRotateFile = require('winston-daily-rotate-file'),
  helmet = require('helmet'),
  cors = require('cors')

global.nconf = require('nconf')

nconf
  .argv()
  .env()
  .file({ file: `config/environment/${nconf.get('NODE_ENV')}.json` })

global.moment = require('moment')
global.util = require('util')
global.fs = require('fs')
global.Promise = require('bluebird')

// create the log format
global.logger = createLogger({
  transports: [
    new transports.Console(),
    new dailyRotateFile({ filename: 'error-%DATE%.log', level: 'error', datePattern: 'YYYY-MM-DD', zippedArchive: true, maxFiles: '30d', dirname: '/var/log/api' }),
    new dailyRotateFile({ filename: 'combined-%DATE%.log', datePattern: 'YYYY-MM-DD', zippedArchive: true, maxFiles: '30d', dirname: '/var/log/api' })
  ],
  exceptionHandlers: [
    new transports.Console(),
    new dailyRotateFile({ filename: 'exception-%DATE%.log', level: 'error', datePattern: 'YYYY-MM-DD', zippedArchive: true, maxFiles: '30d', dirname: '/var/log/api' }),
  ],
  format: format.combine(
    format.colorize(),
    format.timestamp({ format: () => moment().toISOString() }),
    format.align(),
    format.printf(({ timestamp, level, message }) => `[${timestamp}] ${level}: ${message}`)
  )
})

// include the morgan logs to winston logs
logger.stream = {
  write: (message) => logger.info(message)
}

app.use(helmet())

// request body parser middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

morgan.token('body', (req, res) => JSON.stringify(req.body))

// http logs middleware
app.use(morgan(':method :url :status :body :response-time ms', { stream: logger.stream }));

module.exports = app
