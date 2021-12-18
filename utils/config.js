if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

let PORT = process.env.PORT
let DATABASE_URL = process.env.DATABASE_URL

module.exports = {
  DATABASE_URL,
  PORT,
  development: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres'
  },
  production: {
    url: `${process.env.DATABASE_URL}`,
    dialect: 'postgres',
  }
}