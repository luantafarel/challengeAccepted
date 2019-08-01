const JS = require('../../../models').JS
module.exports = {
  baseA: {
    query: JS.Users.pick('cpf')
  }
}
