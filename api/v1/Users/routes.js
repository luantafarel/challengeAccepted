const validation = require('./validation')
const controllers = require('./controllers')
const endpoint = 'user'
module.exports = [{
  method: 'GET',
  path: `${endpoint}/{id}`,
  handler: controllers.show,
  config: {
    description: 'Shows a user',
    notes: 'Shows a user',
    validate: validation.id
  }
}, {
  method: 'GET',
  path: `${endpoint}`,
  handler: controllers.list,
  config: {
    description: 'List all users',
    notes: 'List all users'
  }
}, {
  method: 'POST',
  path: `${endpoint}/create`,
  handler: controllers.create,
  config: {
    description: 'Create new user',
    notes: 'Create new user'
  }
}, {
  method: 'POST',
  path: `${endpoint}/delete`,
  handler: controllers.delete,
  config: {
    description: 'Create new user',
    notes: 'Create new user'
  }
}, {
  method: 'POST',
  path: `${endpoint}/login`,
  handler: controllers.login,
  config: {
    description: 'Login a user',
    notes: 'Login a user'
  }
}, {
  method: 'POST',
  path: `${endpoint}/{id}`,
  handler: controllers.update,
  config: {
    description: 'Update a user',
    notes: 'Update a user',
    validate: validation.id
  }
}]
