const validation = require('./validation')
const controllers = require('./controllers')
const endpointA = 'baseA'
module.exports = [
  {
    method: 'GET',
    path: `${endpointA}`,
    handler: controllers.baseA,
    config: {
      description: 'Makes the consult according to base A',
      notes: 'Makes the consult according to base A',
      validate: validation.baseA
    }
  }
]
