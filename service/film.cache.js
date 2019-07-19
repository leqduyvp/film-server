const redis = require('redis');

const { redisPort, redisHost, redisConnectTimeout, timeoutFilmsCategory } = require('../config/redis.config');

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

const getFilmsByCategoryFromCache = () => {
  return new Promise((resolve, reject) => {
    client.get('filmsCategory', (error, result) => {
      if (error) {
        reject(error);
      }
        resolve(JSON.parse(result));
    });
  })
}

const setFilmsByCategoryToCache = filmsCategory => {
  const filmsCategoryString = JSON.stringify(filmsCategory);
  client.setex('filmsCategory', timeoutFilmsCategory, filmsCategoryString, () => {
    console.log('filmsCategory are stored to cache');
  })
}

module.exports = {
  getFilmsByCategoryFromCache,
  setFilmsByCategoryToCache
}