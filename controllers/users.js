const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models').User

usersRouter.get('/:id', (request, response) => {
  console.log('in usersRouter')
  const id = Number(request.params.id)

  User.scope('withoutPassword')
    .findByPk(id)
    .then((user) => {
      if (user) {
        response.json(user)
      } else {
        response.status(404).end()
      }
    })
})

usersRouter.post('/register', async (request, response, next) => {
  try {
    const body = request.body

    const saltRounds = 10
    const password = await bcrypt.hash(body.password, saltRounds)

    const userParams = {
      username: body.username,
      first_name: body.first_name,
      last_name: body.last_name,
      email: body.email,
      password,
    }

    const savedUser = await User.create(userParams)

    User.scope('withoutPassword')
      .findByPk(savedUser.id)
      .then((user) => {
        response.json(user)
      })
  } catch (exception) {
    next(exception)
  }
})

module.exports = usersRouter
