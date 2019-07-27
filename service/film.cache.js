const redis = require('redis');

const { redisPort, redisHost, redisConnectTimeout, timeoutFilterFilms, limitedPageCache } = require('../config/redis.config');
const { pageNumber, recordsNumber } = require('../config/film.config');
const { makeKeyFilter } = require('../utils/makeKeyRedis');

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


const setFilterFilmsToCache = (input, page = pageNumber, records = recordsNumber, films) => {
  // If page <= 10, cache films, else dont cache
  if (page > limitedPageCache) {
    return;
  }

  console.log('set filter films to cache');

  const key = makeKeyFilter(input, page, records);

  const filmsString = JSON.stringify(films);
  client.setex(key, timeoutFilterFilms, filmsString, () => {
    console.log(key, ' are stored to cache');
  })

}

const getFilterFilmsFromCache = (input, page = pageNumber, records = recordsNumber) => {
  // If page > limitedPageCache, films aren't in cache
  if (page > limitedPageCache) {
    return;
  }

  console.log('get filter films in cache');

  const key = makeKeyFilter(input, page, records);

  return new Promise((resolve, reject) => {
    client.get(key, (error, result) => {
      if (error) {
        reject(error);
      }
        resolve(JSON.parse(result));
    });
  })
}

module.exports = {
  setFilterFilmsToCache,
  getFilterFilmsFromCache
}