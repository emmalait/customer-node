'use strict'

// TODO: Add more fields
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: true,
        len: {
          args: 4,
          msg: 'Username must be at least 4 characters long'
        }
      }
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        len: {
          args: 2,
          msg: 'First name must be at least 2 characters long'
        }
      }
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        len: {
          args: 2,
          msg: 'Name must be at least 2 characters long'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        isEmail: true,
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        len: {
          args: 6,
          msg: 'Password must be at least 6 characters long'
        }
      }
    }
  }, {
    scopes: {
      withoutPassword: {
        attributes: { exclude: ['password'] },
      }
    }
  })
  return User
}