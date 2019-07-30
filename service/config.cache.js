const { client } = require('./redis.connection');

const { timeoutAllConfigs } = require('../config/redis.config');

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