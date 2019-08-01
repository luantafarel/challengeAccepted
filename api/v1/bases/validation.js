const JS = require('../../../models').JS
const Joi = require('joi')
module.exports = {
  on: {
    params: JS.Lights.pick('id')
  },
  off: {
    params: JS.Lights.pick('id')
  },
  create: {
    payload: Joi
      .object(
        JS.Lights.pick(
          'status'
        )
      )
  }
}
