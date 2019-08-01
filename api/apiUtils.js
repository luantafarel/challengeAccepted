require('dotenv').config()
const _ = require('lodash')
const Boom = require('boom')
const Redis = require('ioredis')
const moment = require('moment')
const Cryptr = require('cryptr')
const jwt = require('jsonwebtoken')
const config = require('config')('config.json')
const cryptr = new Cryptr(config.cryptr_safeWord)
const database = require('config/database.js')
const redis = new Redis(database.redis)

module.exports = {
  verifyToken: async (token) => {
    if (!token) throw Boom.forbidden('no_token')
    const decoded = jwt.verify(token, config.JWT_SECRET_KEY)
    if (typeof decoded !== 'object') throw Boom.forbidden('invalid_token')
    if (_.has(decoded, ['username', 'id', 'exp'])) throw Boom.forbidden('invalid_token')
    if (moment.unix() - decoded.exp > 0) throw Boom.unauthorized('token_expired')
    let user = await redis.get('users').then(function (result) { return result })
    if (!user) throw Boom.notFound('no_user_found')
    else user = JSON.parse(user)
    if (user[decoded.id].deleted_at) throw Boom.notFound('user_deleted')
    return decoded
  },

  generateToken: (user, id) => {
    return jwt.sign({
      id: user.id,
      username: user.username,
      admin: user.admin,
      exp: moment().add(config.tokenTTL, 'day').unix()
    }, config.JWT_SECRET_KEY)
  },
  // Instance methods
  hashPassword: (password) => {
    if (password) {
      return cryptr.encrypt(password)
    }
  },

  verifyPassword: (foundPassword, password) => {
    if (!password) {
      throw new Error('instance password not setted')
    } else if (!password) {
      return false
    }
    return cryptr.decrypt(foundPassword) === password
  }
}
