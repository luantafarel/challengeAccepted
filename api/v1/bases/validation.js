const JS = require('../../../models').JS
const Joi = require('joi')
module.exports = {
  baseA: {
    query: JS.Users.pick('cpf')
  }
}
