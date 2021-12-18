const config = require('./utils/config')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')
const Sequelize = require('sequelize')
const morgan = require('morgan')

let sequelize

if (process.env.NODE_ENV === 'production') {
  console.log('Creating a Sequelize instance...')
  sequelize = new Sequelize(`${process.env.DATABASE_URL}`, {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
    protocol: 'postgres',
  })
} else {
  sequelize = new Sequelize({
    url: config.DATABASE_URL,
    dialect: 'postgres',
  })
}

console.log('Syncing Sequelize...')
sequelize.sync()

morgan.token('postdata', (req) => {
  return JSON.stringify(req.body)
})

console.log('Connecting to ', config.DATABASE_URL)

sequelize
  .authenticate()
  .then(() => {
    console.log('Connected to database')
  })
  .catch((err) => {
    console.log('Error connecting to database: ', err)
  })

app.use(cors())
app.use(bodyParser.json())
app.use(
  morgan(
    ':method :url :status :res[content-length] - :response-time ms :postdata'
  )
)

app.use('/customer-api/users', usersRouter)
app.use('/customer-api/login', loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
