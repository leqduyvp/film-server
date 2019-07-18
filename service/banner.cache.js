const redis = require('redis');

const { redisPort, redisHost, redisConnectTimeout, timeoutAllBanners } = require('../config/redis.config');

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

const getAllBannersFromCache = () => {
  return new Promise((resolve, reject) => {
    client.get('allBanners', (error, result) => {
      if (error) {
        reject(error);
      }
        resolve(JSON.parse(result));
    });
  })
}

const setAllBannersToCache = banners => {
  const bannersString = JSON.stringify(banners);
  client.setex('allBanners', timeoutAllBanners, bannersString, () => {
    console.log('allBanners are stored to cache');
  })
}

module.exports = {
  getAllBannersFromCache,
  setAllBannersToCache
}