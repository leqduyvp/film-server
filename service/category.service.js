const redis = require('redis');

const { redisPort, redisHost, redisConnectTimeout } = require('../config/redis.config');
const { getAllCategoriesFromCache, setAllCategoriesToCache } = require('../service/category.cache');
const { getAllCategories, addCategory, updateCategory, deleteCategory } = require('../database/category');

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

const getAllCategoriesService = async () => {
  let error = {
    isError: false,
    errorMessage: {}
  }

  try {
    // Check all categories in cache
    console.log('Get categories from cache')
    let categories = await getAllCategoriesFromCache();
    if (categories) {
      return {
        error,
        categories
      };
    }

    // If there aren't categories in cache, get in database
    console.log('Get categories from db')
    categories = await getAllCategories();

    // Set categories to cache
    setAllCategoriesToCache(categories);

    return {
      error,
      categories
    };

  } catch (err) {
    error.isError = true;
    error.errorMessage.database = err.message;

    return error;
  }
}

const addCategoryService = async (parentCategory, childrenCategories) => {
  let error = {
    isError: false,
    errorMessage: {}
  }

  try {
    await addCategory(parentCategory, childrenCategories);

    // Update in cache

    return error;
  } catch (err) {
    error.isError = true;
    error.errorMessage.database = err.message;

    return error;
  }
}

const updateCategoryService = async (id, parentCategory, childrenCategories) => {
  let error = {
    isError: false,
    errorMessage: {}
  };

  try {
    // Store data to database
    console.log('Update')
    await updateCategory(id, parentCategory, childrenCategories);

    // Update data in cache

    return error;
  } catch (err) {
    error.isError = true;
    error.errorMessage.database = err.message;

    return error;
  }
}

const deleteCategoryService = async id => {
  let error = {
    isError: false,
    errorMessage: {}
  };

  try {
    // Delete in database
    await deleteCategory(id);

    // Delete in cache

    return error;
  } catch (err) {
    error.isError = true;
    error.errorMessage.database = err.message;

    return error;
  }
}

module.exports = {
  getAllCategoriesService,
  addCategoryService,
  updateCategoryService,
  deleteCategoryService
}