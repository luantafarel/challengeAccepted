const Boom = require('boom')
const Redis = require('ioredis')
const moment = require('moment')
const apiUtils = require('../../apiUtils')
const database = require('config/database.js')
const redis = new Redis(database.redis)
module.exports = {
  on: async (request) => {
    try {
      await apiUtils.verifyToken(request.headers.authorization)
    } catch (err) {
      return err
    }
    let lights = await redis.get('lights').then(function (result) { return result })
    if (lights) lights = JSON.parse(lights)
    else return Boom.notFound('no_lights_found')
    if (!lights[request.params.id]) return Boom.notFound('light_not_found')
    lights[request.params.id].status = 'ON'
    if (!await redis.set('lights', JSON.stringify(lights)).then(function (result) { return result })) return Boom.notFound('light_not_created')
    return lights[request.params.id].status
  },
  off: async (request) => {
    try {
      await apiUtils.verifyToken(request.headers.authorization)
    } catch (err) {
      return err
    }
    let lights = await redis.get('lights').then(function (result) { return result })
    if (lights) lights = JSON.parse(lights)
    else return Boom.notFound('no_lights_found')
    if (!lights[request.params.id]) return Boom.notFound('light_not_found')
    lights[request.params.id].status = 'OFF'
    if (!await redis.set('lights', JSON.stringify(lights)).then(function (result) { return result })) return Boom.notFound('light_not_created')
    return lights[request.params.id].status
  },
  listALL: async (request) => {
    try {
      await apiUtils.verifyToken(request.headers.authorization)
    } catch (err) {
      return err
    }
    const lights = await redis.get('lights').then(function (result) { return result })
    return lights ? JSON.parse(lights) : Boom.notFound('no_lights_found')
  },
  create: async (request) => {
    try {
      const decoded = await apiUtils.verifyToken(request.headers.authorization)
      if (!decoded.admin) return Boom.forbidden('user_is_not_admin')
    } catch (err) {
      return err
    }
    let id = await redis.get('lightsId').then(function (result) { return result })
    if (!id) id = 0
    else {
      id = Number(id)
      id++
    }
    await redis.set('lightsId', id).then(function (result, error) { return result })

    let payload = {}
    payload[id] = Object.assign({ created_at: moment.utc().format(), updated_at: moment.utc().format(), deleted_at: null }, request.payload)

    const lightsInRedis = await redis.get('lights').then(function (result) { return result })

    if (lightsInRedis) payload = Object.assign({}, JSON.parse(lightsInRedis), payload)

    if (!await redis.set('lights', JSON.stringify(payload)).then(function (result) { return result })) return Boom.notFound('light_not_created')
    return { id: id, body: payload[id] }
  }
}
