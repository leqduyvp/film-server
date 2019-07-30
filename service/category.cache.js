const { client } = require('./redis.connection');
<<<<<<< HEAD

const { timeoutAllCategories } = require('../config/redis.config');
=======
>>>>>>> feature/category

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