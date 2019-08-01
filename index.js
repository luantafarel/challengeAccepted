require('dotenv').config()

const init = async () => {
  // require('./front')
  require('./api')
}

process.on('unhandledRejection', (err) => {
  console.log(`error unhandled rejection ${err.stack}`)
})

module.exports = init()
