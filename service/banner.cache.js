const { timeoutAllBanners } = require('../config/redis.config');
const { client } = require('./redis.connection');

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