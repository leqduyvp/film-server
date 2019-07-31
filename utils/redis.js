const { client } = require('../service/redis.connection');

const makeKey = (input, page, records, fields) => {
  let key = '';

  fields.forEach(field => {
    if (input[field]) {
      key += field + '|' + input[field].toString().trim().toLowerCase() + '/';
    } else {
      key += field + '|' + input[field] + '/';
    }
  });

  key += 'page' + '|' + page + '/';
  key += 'records' + '|' + records;

  return key;
}

const makeKeyTotal = (input, fields) => {
  let key = '';

  fields.forEach(field => {
    if (input[field]) {
      key += field + '|' + input[field].toString().trim().toLowerCase() + '/';
    } else {
      key += field + '|' + input[field] + '/';
    }
  });

  return key;
}

const storeToRedis = (key, value, timeout) => {
  const valueString = JSON.stringify(value);
  client.setex(key, timeout, valueString, () => {
    console.log(key, ' are stored to cache');
  });
}

const getDataFromRedis = key => {
  return new Promise((resolve, reject) => {
    client.get(key, (error, result) => {
      if (error) {
        reject(error);
      }
      resolve(JSON.parse(result));
    });
  });
}

module.exports = {
  makeKey,
  makeKeyTotal,
  storeToRedis,
  getDataFromRedis
}