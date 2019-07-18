const redis = require('redis');

const { redisPort, redisHost, redisConnectTimeout } = require('../config/redis.config');
const { getAllCategoriesFromCache, setAllCategoriesToCache } = require('../service/category.cache');
const { getAllCategories, addCategory, updateCategory, deleteCategory } = require('../database/category');
const { checkString } = require('../utils/checkString');

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

const checkIdService = id => {
  let error = {
    isError: false,
    errorMessage: {}
  }

  const err = checkString(id);

  if (err.isError) {
    error.isError = true;
    error.errorMessage.id = 'id ' + err.message;

    return error;
  }

  return error;
}

const checkInputService = (key, values) => {
  let error = {
    isError: false,
    errorMessage: {}
  }

  const checkKey = checkString(key);

  if (checkKey.isError) {
    error.isError = true;
    error.errorMessage.key = 'key ' + checkKey.message;

    return error;
  }

  if (values === undefined || values === null) {
    // Uncomment to not Alow values undefined or null
    // error.isError = true;
    // error.errorMessage.values = 'values is required';

    return error;
  }

  if (!(values instanceof Array)) {
    error.isError = true;
    error.errorMessage.values = 'values must be an array';

    return error;
  }

  const numberValues = values.length;
  for (let i = 0; i < numberValues; i++) {
    const checkValue = checkString(values[i]);
    if (checkValue.isError) {
      error.isError = true;
      error.errorMessage.values = `values[${i}] ` + checkValue.message;

      return error;
    }
  }

  return error;
}

const trimAndToLowerCase = str => {
  return str.trim().toLowerCase();
}

const changeInputService = (key, values) => {
  const changedKey = trimAndToLowerCase(key);
  let changedValues = null;

  if (values !== undefined && values !== null) {
    changedValues = values.map(value => trimAndToLowerCase(value));
  }

  return {
    changedKey,
    changedValues
  }
}

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

const addCategoryService = async (key, values) => {
  let error = {
    isError: false,
    errorMessage: {}
  }

  try {
    await addCategory(key, values);

    // Update in cache

    return error;
  } catch (err) {
    error.isError = true;
    error.errorMessage.database = err.message;

    return error;
  }
}

const updateCategoryService = async (id, key, values) => {
  let error = {
    isError: false,
    errorMessage: {}
  };

  try {
    // Store data to database
    console.log('Update')
    await updateCategory(id, key, values);

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
  checkInputService,
  checkIdService,
  changeInputService,
  getAllCategoriesService,
  addCategoryService,
  updateCategoryService,
  deleteCategoryService
}