const redis = require('redis');

const { redisPort, redisHost, redisConnectTimeout, timeoutAllConfigs } = require('../config/redis.config');

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

const getAllConfigsFromCache = () => {
  return new Promise((resolve, reject) => {
    client.get('allConfigs', (error, result) => {
      if (error) {
        reject(error);
      }
        resolve(JSON.parse(result));
    });
  })
}

const setAllConfigsToCache = configs => {
  const categoriesString = JSON.stringify(configs);
  client.setex('allConfigs', timeoutAllConfigs, categoriesString, () => {
    console.log('allConfigs are stored to cache');
  })
}

module.exports = {
  getAllConfigsFromCache,
  setAllConfigsToCache
}