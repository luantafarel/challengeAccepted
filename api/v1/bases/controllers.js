const Boom = require('boom')
const Sequelize = require('sequelize')
const Bluebird = require('bluebird')
const arraySum = require('array-sum')
const db = require('models')
const Op = Sequelize.Op
module.exports = {
  baseA: async request => {
    try {
      let user = await db.Users.scope('main').findOne({where: { cpf: request.query.cpf }})
      if (!user) return Boom.notFound('user_not_found')
      user.debts_amout = user.debts.length
      const otherUsers = db.Users.scope('main').findAll({
        where: { [Op.not]: { id: user.id } }
      })
      let sameSt = []
      let sameCt = []
      let sameState = []
      let sameCnt = []
      let stMax = 0
      let stMin = Infinity
      let cntMax = 0
      let cntMin = Infinity
      let stateMax = 0
      let stateMin = Infinity
      let ctMax = 0
      let ctMin = Infinity
      await Bluebird.map(otherUsers, otherUser => {
        if (otherUser.address.street === user.address.street) {
          sameSt.push(otherUser.debts.length)
          if (otherUser.debts.length > stMax) stMax = otherUser.debts.length
          if (otherUser.debts.length < stMin) stMin = otherUser.debts.length
        }
        if (otherUser.address.county === user.address.county) {
          sameCnt.push(otherUser.debts.length)
          if (otherUser.debts.length > cntMax) cntMax = otherUser.debts.length
          if (otherUser.debts.length < cntMin) cntMin = otherUser.debts.length
        }
        if (otherUser.address.state === user.address.state) {
          sameState.push(otherUser.debts.length)
          if (otherUser.debts.length > stateMax) stateMax = otherUser.debts.length
          if (otherUser.debts.length < stateMin) stateMin = otherUser.debts.length
        }
        if (otherUser.address.city === user.address.city) {
          sameCt.push(otherUser.debts.length)
          if (otherUser.debts.length > ctMax) ctMax = otherUser.debts.length
          if (otherUser.debts.length < ctMin) ctMin = otherUser.debts.length
        }
      })
      if (user.debts_amout >= stMax) user.maisEndividadoStreet = true
      else user.maisEndividadoStreet = false
      if (user.debts_amout >= ctMax) user.maisEndividadoCity = true
      else user.maisEndividadoCity = false
      if (user.debts_amout >= stateMax) user.maisEndividadoState = true
      else user.maisEndividadoState = false
      if (user.debts_amout >= cntMax) user.maisEndividadoCountry = true
      else user.maisEndividadoCountry = false

      if (user.debts_amout <= stMin) user.menosEndividadoStreet = true
      else user.menosEndividadoStreet = false
      if (user.debts_amout <= ctMin) user.menosEndividadoCity = true
      else user.menosEndividadoCity = false
      if (user.debts_amout <= stateMin) user.menosEndividadoState = true
      else user.menosEndividadoState = false
      if (user.debts_amout <= cntMin) user.menosEndividadoCountry = true
      else user.menosEndividadoCountry = false

      if (user.debts_amout >= arraySum(sameSt) / sameSt.length) user.abvAvgStreet = true
      else user.abvAvgStreet = false
      if (user.debts_amout >= arraySum(sameCnt) / sameCnt.length) user.abvAvgCity = true
      else user.abvAvgCity = false
      if (user.debts_amout >= arraySum(sameState) / sameState.length) user.abvAvgState = true
      else user.abvAvgState = false
      if (user.debts_amout >= arraySum(sameCt) / sameCt.length) user.abvAvgCountry = true
      else user.abvAvgCountry = false
      const response = Object.assign(
        {}, user)
      console.log(response)
      return response
    } catch (err) {
      console.log(err)
    }
  }
}
