const redis = require('redis');

const { redisPort, redisHost, redisConnectTimeout } = require('../config/redis.config');
const { getAllConfigsFromCache, setAllConfigsToCache } = require('../service/config.cache');
const { getAllConfigs, addConfig, updateConfig, deleteConfig, searchConfigByKey } = require('../database/config');
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

const checkArrayStrings = arrayStrings => {
  let error = {
    isError: false,
    message: ''
  }

  if (arrayStrings === undefined || arrayStrings === null) {
    error.isError = true;
    error.message = 'must not be empty';

    return error;
  }

  if (!(arrayStrings instanceof Array)) {
    error.isError = true;
    error.message = 'must not be an array';

    return error;
  }

  arrayStrings.forEach((element, id) => {
    const err = checkString(element);
    if (err.isError) {
      error.isError = true;
      error.message = id + ' ' + err.message;

      return error;
    }
  });

  return error;
}

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

const checkKeyService = key => {
  let error = {
    isError: false,
    errorMessage: {}
  }

  const check = checkString(key);
  if (check.isError) {
    error.isError = true;
    error.errorMessage.key = 'key ' + check.message;

    return error;
  }

  return error;
}

const checkInputService = (key, values) => {
  let error = {
    isError: false,
    errorMessage: {}
  }

  // Check key
  const checkKey = checkKeyService(key);
  if (checkKey.isError) {
    return checkKey;
  }

  if (values === undefined || values === null) {
    error.isError = true;
    error.errorMessage.values = 'values is required';

    return error;
  }

  // Check values
  if (!(values instanceof Array)) {
    error.isError = true;
    error.errorMessage.values = 'values must be an array';

    return error;
  }

  const numberValues = values.length;
  for (let i = 0; i < numberValues; i++) {
    const value = values[i];

    // Check type
    if (typeof value !== 'object') {
      error.isError = true;
      error.errorMessage.values = `values[${i}] must be an object`;

      return error;
    }

    // Check title
    const checkTitle = checkString(value.title);
    if (checkTitle.isError) {
      error.isError = true;
      error.errorMessage.title = `values[${i}].title ` + checkKey.message;

      return error;
    }

    // Check paragraphs
    const err = checkArrayStrings(value.paragraphs);
    if (err.isError) {
      error.isError = true;
      error.errorMessage.valueParagraphs = `values[${i}] paragraphs ` + err.message;
    }
  }

  return error;
}

const getAllConfigsService = async () => {
  let error = {
    isError: false,
    errorMessage: {}
  }

  try {
    // Check all configs in cache
    console.log('Get allConfigs from cache')
    let configs = await getAllConfigsFromCache();
    if (configs) {
      return {
        error,
        configs
      };
    }

    // If there aren't configs in cache, get in database
    console.log('Get allConfigs from db')
    configs = await getAllConfigs();

    // Set configs to cache
    console.log('Set allConfigs to cache');
    setAllConfigsToCache(configs);

    return {
      error,
      configs
    };

  } catch (err) {
    error.isError = true;
    error.errorMessage.database = err.message;

    return error;
  }
}

const addConfigService = async (key, values) => {
  let error = {
    isError: false,
    errorMessage: {}
  }

  try {
    await addConfig(key, values);

    // Update in cache

    return error;
  } catch (err) {
    error.isError = true;
    error.errorMessage.database = err.message;

    return error;
  }
}

const updateConfigService = async (id, key, values) => {
  let error = {
    isError: false,
    errorMessage: {}
  };

  try {
    // Store data to database
    await updateConfig(id, key, values);

    // Update data in cache

    return error;
  } catch (err) {
    error.isError = true;
    error.errorMessage.database = err.message;

    return error;
  }
}

const searchConfigByKeyService = async key => {
  let error = {
    isError: false,
    errorMessage: {}
  };

  try {
    // Search data in database
    const configs = await searchConfigByKey(key);
    return {
      error,
      configs
    };

    // Update data in cache

  } catch (err) {
    error.isError = true;
    error.errorMessage.database = err.message;

    return error;
  }
}

const deleteConfigService = async id => {
  let error = {
    isError: false,
    errorMessage: {}
  };

  try {
    // Delete in database
    await deleteConfig(id);

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
  checkKeyService,
  getAllConfigsService,
  addConfigService,
  updateConfigService,
  searchConfigByKeyService,
  deleteConfigService
}