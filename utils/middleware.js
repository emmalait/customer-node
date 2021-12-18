const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'Unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(error)
  }

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'Malformatted id' })
  } else if (error.type === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      error: 'Invalid token'
    })
  } else if (error.name === 'SequelizeUniqueConstraintError') {
    const errors = []

    error.errors.forEach(error => {
      errors.push(error.message)
    })

    return response.status(400).json({
      error: errors.join(', ')
    })
  } else if (error.name === 'SequelizeValidationError') {
    const errors = []

    error.errors.forEach(error => {
      errors.push(error.message)
    })

    return response.status(400).json({
      error: errors.join(', ')
    })
  }

  next(error)
}

module.exports = {
  unknownEndpoint,
  errorHandler
}