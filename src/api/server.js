'use strict';

const app = require('express')(),
  morgan = require('morgan'),
  { createLogger, transports, format } = require('winston'),
  bodyParser = require('body-parser'),
  dailyRotateFile = require('winston-daily-rotate-file'),
  helmet = require('helmet'),
  cors = require('cors'),
  { MongoClient } = require('mongodb')

global.nconf = require('nconf')

nconf
  .argv()
  .env()
  .file({ file: `config/environment/${nconf.get('NODE_ENV')}.json` })

global.moment = require('moment')
global.util = require('util')
global.fs = require('fs')

const database = nconf.get('database')
const replicateUrl = database.containers.reduce((previous, current) => {
  const loginCred = current.user ? `${current.user}:${current.password}@` : ''
  if (!previous)
    return `${loginCred}${current.host}:${current.port}`

  return `${previous},${loginCred}${current.host}:${current.port}`
}, '')

const connection = new MongoClient(
  `mongodb://${replicateUrl}?replicateSet=${database.replicateSet}`,
  {
    useUnifiedTopology: true
  }
)

connection.connect((err, client) => {
  global.mongo = client.db(database.database)
})

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

/**
 * Dynamic middleware configuration files
 */
const config_files = fs.readdirSync('./config/middleware')

config_files.map(file => {
  if (file.includes('.js'))
    app.use(require(`./config/middleware/${file}`))
})

const initializer_files = fs.readdirSync('./config/initializers')

initializer_files.map(file => {
  if (file.includes('.js'))
    require(`./config/initializers/${file}`)(app)
})

app.use((req, res) => {
  res.status(404).send({
    title: 'Not Found',
    detail: 'Resource Not Found',
    status: 404
  })
})

app.use((error, req, res, next) => {
  if (!error.status) {
    logger.error(util.inspect(
      {
        status: 500,
        stack_trace: error,
        request: { ...req.body, ...req.params },
        method: req.method,
        uri: req.originalUrl,
        domain: req.hostname
      }
    ), { depth: null, showHidden: true })
    error = { status: 500, title: 'Server Error', detail: 'Server Error' }
  }

  res.status(error.status).send({
    error: {
      title: error.title,
      detail: error.detail,
      status: error.status
    }
  })
})

module.exports = app
