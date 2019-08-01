const validation = require('./validation')
const controllers = require('./controllers')
const endpointA = 'baseA'
module.exports = [{
  method: 'POST',
  path: `${endpointA}/baseA/`,
  handler: controllers.on,
  config: {
    description: 'Turns on the light',
    notes: 'Turns the light on',
    validate: validation.on
  }
}, {
  method: 'POST',
  path: `${endpointA}/off/{id}`,
  handler: controllers.off,
  config: {
    description: 'Turns off the light',
    notes: 'Turns the light off',
    validate: validation.off
  }
}, {
  method: 'POST',
  path: `${endpointA}/create`,
  handler: controllers.create,
  config: {
    description: 'Create new lights',
    notes: 'Create new lights',
    validate: validation.create
  }
}, {
  method: 'GET',
  path: `${endpointA}`,
  handler: controllers.listALL,
  config: {
    description: 'List all lights',
    notes: 'List all lights on or off'
  }
}, {
  method: 'GET',
  path: `${endpointA}/{id}`,
  handler: controllers.show,
  config: {
    description: 'Shows a user',
    notes: 'Shows a user',
    validate: validation.id
  }
}, {
  method: 'GET',
  path: `${endpointA}`,
  handler: controllers.list,
  config: {
    description: 'List all users',
    notes: 'List all users'
  }
}, {
  method: 'POST',
  path: `${endpointA}/create`,
  handler: controllers.create,
  config: {
    description: 'Create new user',
    notes: 'Create new user'
  }
}, {
  method: 'POST',
  path: `${endpointA}/delete`,
  handler: controllers.delete,
  config: {
    description: 'Create new user',
    notes: 'Create new user'
  }
}, {
  method: 'POST',
  path: `${endpointA}/login`,
  handler: controllers.login,
  config: {
    description: 'Login a user',
    notes: 'Login a user'
  }
}, {
  method: 'POST',
  path: `${endpointA}/{id}`,
  handler: controllers.update,
  config: {
    description: 'Update a user',
    notes: 'Update a user',
    validate: validation.id
  }
}]
