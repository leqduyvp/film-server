const redis = require('redis');

const { redisPort, redisHost, redisConnectTimeout, timeoutAllCategories } = require('../config/redis.config');

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

const getAllCategoriesFromCache = () => {
  return new Promise((resolve, reject) => {
    client.get('allCategories', (error, result) => {
      if (error) {
        reject(error);
      }
        resolve(JSON.parse(result));
    });
  })
}

const setAllCategoriesToCache = categories => {
  const categoriesString = JSON.stringify(categories);
  client.setex('allCategories', timeoutAllCategories, categoriesString, () => {
    console.log('allCategories are stored to cache');
  })
}

module.exports = {
  getAllCategoriesFromCache,
  setAllCategoriesToCache
}