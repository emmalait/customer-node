const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const models = require('../models')
const User = models.User

loginRouter.post('/', async (request, response) => {
  const body = request.body

  const account = await User.findOne({ where: { username: body.username } })

  const passwordCorrect =
    account === null
      ? false
      : await bcrypt.compare(body.password, account.password)

  if (!(account && passwordCorrect)) {
    return response.status(401).json({
      error: 'Invalid username or password',
    })
  }

  const accountForToken = {
    username: account.username,
    id: account.id,
  }

  const token = jwt.sign(accountForToken, process.env.SECRET)

  response.status(200).send({
    token,
    id: account.id,
    username: account.username,
    first_name: account.first_name,
    last_name: account.last_name,
  })
})

module.exports = loginRouter
