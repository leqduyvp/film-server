const { client } = require('./redis.connection');

const {
  timeoutFilterFilms,
  limitedPagesCache,
  timeoutSearchFilmByField,
  timeoutAllFilms,
  timeoutSearchFilm,
  timeoutRelatedFilms } = require('../config/redis.config');
const { pageNumber, recordsNumber } = require('../config/film.config');
const { makeKey } = require('../utils/makeKeyRedis');

const fieldsFilter = ['category', 'arrange', 'country', 'type', 'year'];
const fieldsSearch = ['field', 'value'];
const fieldsAllFilms = ['allFilms'];
const fieldSearchFilm = ['value'];
const fieldRelatedFilms = ['id'];

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

const setAllFilmsToCache = (page = pageNumber, records = recordsNumber, films) => {
  // If page <= 10, cache films, else dont cache
  if (page > limitedPagesCache) {
    return;
  }

  console.log('set all films to cache');

  const key = makeKey({}, page, records, fieldsAllFilms);

  const filmsString = JSON.stringify(films);
  client.setex(key, timeoutAllFilms, filmsString, () => {
    console.log(key, ' are stored to cache');
  });
}

const getAllFilmsFromCache = (page = pageNumber, records = recordsNumber) => {
  // If page > limitedPagesCache, films aren't in cache
  if (page > limitedPagesCache) {
    return;
  }

  console.log('get all films in cache');

  const key = makeKey({}, page, records, fieldsAllFilms);

  return new Promise((resolve, reject) => {
    client.get(key, (error, result) => {
      if (error) {
        reject(error);
      }
      resolve(JSON.parse(result));
    });
  });
}

const setSearchFilmsToCache = (value, page = pageNumber, records = recordsNumber, films) => {
  // If page <= 10, cache films, else dont cache
  if (page > limitedPagesCache) {
    return;
  }

  console.log('set search films to cache');

  const key = makeKey({ value }, page, records, fieldSearchFilm);

  const filmsString = JSON.stringify(films);
  client.setex(key, timeoutSearchFilm, filmsString, () => {
    console.log(key, ' are stored to cache');
  });
}

const getSearchFilmsFromCache = (value, page = pageNumber, records = recordsNumber) => {
  // If page > limitedPagesCache, films aren't in cache
  if (page > limitedPagesCache) {
    return;
  }

  console.log('get search films in cache');

  const key = makeKey({ value }, page, records, fieldSearchFilm);

  return new Promise((resolve, reject) => {
    client.get(key, (error, result) => {
      if (error) {
        reject(error);
      }
      resolve(JSON.parse(result));
    });
  });
}

const setRelatedFilmsToCache = (id, page = pageNumber, records = recordsNumber, films) => {
  // If page <= 10, cache films, else dont cache
  if (page > limitedPagesCache) {
    return;
  }

  console.log('set related films to cache');

  const key = makeKey({ id }, page, records, fieldRelatedFilms);

  const filmsString = JSON.stringify(films);
  client.setex(key, timeoutRelatedFilms, filmsString, () => {
    console.log(key, ' are stored to cache');
  });
}

const getRelatedFilmsFromCache = (id, page = pageNumber, records = recordsNumber) => {
  // If page > limitedPagesCache, films aren't in cache
  if (page > limitedPagesCache) {
    return;
  }

  console.log('get related films in cache');

  const key = makeKey({ id }, page, records, fieldRelatedFilms);

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
  getSearchFilmByFieldFromCache,

  setAllFilmsToCache,
  getAllFilmsFromCache,

  setSearchFilmsToCache,
  getSearchFilmsFromCache,

  setRelatedFilmsToCache,
  getRelatedFilmsFromCache
}