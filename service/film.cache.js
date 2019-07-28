const redis = require('redis');

const { redisPort, redisHost, redisConnectTimeout, timeoutFilterFilms, limitedPagesCache, timeoutSearchFilmByField } = require('../config/redis.config');
const { pageNumber, recordsNumber } = require('../config/film.config');
const { makeKey } = require('../utils/makeKeyRedis');

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

const fieldsFilter = ['category', 'arrange', 'country', 'type', 'year'];
const fieldsSearch = ['field', 'value'];

const setFilterFilmsToCache = (input, page = pageNumber, records = recordsNumber, films) => {
  // If page <= 10, cache films, else dont cache
  if (page > limitedPagesCache) {
    return;
  }

  console.log('set filter films to cache');

  const key = makeKey(input, page, records, fieldsFilter);

  const filmsString = JSON.stringify(films);
  client.setex(key, timeoutFilterFilms, filmsString, () => {
    console.log(key, ' are stored to cache');
  });
}

const getFilterFilmsFromCache = (input, page = pageNumber, records = recordsNumber) => {
  // If page > limitedPagesCache, films aren't in cache
  if (page > limitedPagesCache) {
    return;
  }

  console.log('get filter films in cache');

  const key = makeKey(input, page, records, fieldsFilter);

  return new Promise((resolve, reject) => {
    client.get(key, (error, result) => {
      if (error) {
        reject(error);
      }
        resolve(JSON.parse(result));
    });
  });
}

const setSearchFilmByFieldToCache = (input, page = pageNumber, records = recordsNumber, films) => {
   // If page <= 10, cache films, else dont cache
   if (page > limitedPagesCache) {
    return;
  }

  console.log('set searched films by field to cache');

  const key = makeKey(input, page, records, fieldsSearch);

  const filmsString = JSON.stringify(films);
  client.setex(key, timeoutSearchFilmByField, filmsString, () => {
    console.log(key, ' are stored to cache');
  });
}

const getSearchFilmByFieldFromCache = (input, page = pageNumber, records = recordsNumber) => {
// If page > limitedPagesCache, films aren't in cache
if (page > limitedPagesCache) {
  return;
}

console.log('get searched films by field in cache');

const key = makeKey(input, page, records, fieldsSearch);

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
  setFilterFilmsToCache,
  getFilterFilmsFromCache,
  setSearchFilmByFieldToCache,
  getSearchFilmByFieldFromCache
}