var Redis = require('ioredis')

// List the sentinel endpoints
let redis = new Redis({
  sentinels: [
    { host: 'localhost', port: 26379 }
  ],
  name: 'mymaster'
})

redis.set('su', 'cess', function (error, result) {
  console.log(result)
  console.log(error)
})
redis.get('su', function (error, result) {
  console.log(result)
  console.log(error)
})

redis.set('lightsId', 'test', '').then(function (result, error) {
  console.log(result)
  return result
})
redis.get('lightsId').then(function (result, error) {
  console.log(result)
  return result
})
