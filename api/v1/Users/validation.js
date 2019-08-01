const JS = require('../../../models').JS
module.exports = {
  id: {
    params: JS.Users.pick('id')
  }
}
