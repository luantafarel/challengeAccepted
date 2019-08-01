require('dotenv').config()

const Boom = require('boom')
const Redis = require('ioredis')
const moment = require('moment')
const Bluebird = require('bluebird')
const apiUtils = require('../../apiUtils')

const database = require('config/database.js')
const redis = new Redis(database.redis)
module.exports = {
  create: async (req) => {
    let id = await redis.get('usersId').then(function (result) { return result })
    if (!id) id = 0
    else {
      id = Number(id)
      id++
    }
    await redis.set('usersId', id).then(function (result, error) { return result })

    let payload = {}
    req.payload.password = apiUtils.hashPassword(req.payload.password)
    payload[id] = Object.assign({ created_at: moment.utc().format(), updated_at: moment.utc().format(), deleted_at: null }, req.payload)

    const usersInRedis = await redis.get('users').then(function (result) { return result })

    if (usersInRedis) payload = Object.assign({}, JSON.parse(usersInRedis), payload)

    if (!await redis.set('users', JSON.stringify(payload)).then(function (result) { return result })) return Boom.notFound('user_not_created')
    return { id: id, body: payload[id] }
  },
  delete: async (req) => {
    try {
      const decoded = await apiUtils.verifyToken(req.headers.authorization)
      if (!decoded.admin) return Boom.forbidden('user_is_not_admin')
      let users = await redis.get('users').then(function (result) { return result })
      let userFound
      if (users) {
        users = JSON.parse(users)
        await Bluebird.map(Object.keys(users), id => {
          if ((req.payload.username === users[id].username)) userFound = Object.assign({}, users[id], { id: Number(id) })
        })
        if (!userFound) return Boom.notFound('user_not_found')
      }
      userFound = Object.assign({}, userFound, { deleted_at: moment.utc().format() })
      userFound[userFound.id] = userFound
      delete userFound[userFound.id].id
      if (!await redis.set('users', JSON.stringify(Object.assign(users, userFound))).then(function (result) { return result })) return Boom.notFound('user_not_created')
      return `${userFound.username}_deleted`
    } catch (err) {
      return err
    }
  },
  show: async (req) => {
    try {
      const decoded = await apiUtils.verifyToken(req.headers.authorization)
      const user = await redis.get('users').then(function (result) { return result })
      if (!user[decoded.id]) throw Boom.notFound('user_not_found')
      return user[decoded.id]
    } catch (err) {
      return err
    }
  },
  list: async (req) => {
    try {
      await apiUtils.verifyToken(req.headers.authorization)
    } catch (err) {
      return err
    }
    const users = await redis.get('users').then(function (result) { return result })
    return users ? JSON.parse(users) : Boom.notFound('no_users_found')
  },
  update: async (req) => {
    const username = req.payload.username
    const password = req.payload.password
    let users = await redis.get('users').then(function (result) { return result })
    let userFound
    if (users) {
      users = JSON.parse(users)
      await Bluebird.map(Object.keys(users), id => {
        if ((username === users[id].username)) userFound = Object.assign({}, users[id], { id: Number(id) })
      })
      if (!userFound) return Boom.notFound('user_not_found')
    }
    if (!apiUtils.verifyPassword(userFound.password, password)) return Boom.forbidden('invalid_password')
    userFound = Object.assign({}, userFound, req.payload)
    userFound[userFound.id] = userFound
    delete userFound[userFound.id].id
    if (!await redis.set('users', JSON.stringify(req.payload)).then(function (result) { return result })) return Boom.notFound('user_not_created')
    return { id: userFound.id, body: req.payload[userFound.id] }
  },
  login: async (req) => {
    const username = req.payload.username
    const password = req.payload.password
    let users = await redis.get('users').then(function (result) { return result })
    let userFound
    if (users) {
      users = JSON.parse(users)
      await Bluebird.map(Object.keys(users), id => {
        if ((username === users[id].username)) userFound = Object.assign({}, users[id], { id: Number(id) })
      })
      if (!userFound) return Boom.notFound('user_not_found')
    }
    if (!apiUtils.verifyPassword(userFound.password, password)) return Boom.forbidden('invalid_password')
    const token = apiUtils.generateToken(userFound)
    return {
      admin: userFound.admin,
      user: userFound.username,
      token: token
    }
  }
}
