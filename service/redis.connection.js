const redis = require('redis');

const { redisPort, redisHost, redisConnectTimeout } = require('../config/redis.config');

// Create Redis Client
const client = redis.createClient({
  host: redisHost,
  port: redisPort,
  connect_timeout: redisConnectTimeout
});

// Handle error
client.on('error', error => {
  console.log(error.message);
});

module.exports = {
  client
}