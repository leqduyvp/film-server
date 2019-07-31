const { getDataFromRedis, storeToRedis } = require('../utils/redis');

const {
  timeoutFilterFilms,
  limitedPagesCache,
  timeoutSearchFilmByField,
  timeoutAllFilms,
  timeoutSearchFilm,
  timeoutRelatedFilms,
  timeoutTotalAllFilms,
  timeoutTotalFilterFilms,
  timeoutTotalSearchFilmsByField,
  timeoutTotalSeachFilms,
  timeoutTotalRelatedFilms
} = require('../config/redis.config');
const { pageNumber, recordsNumber } = require('../config/film.config');
const { makeKey, makeKeyTotal } = require('../utils/redis');

const fieldsFilterFilms = ['category', 'arrange', 'country', 'type', 'year'];
const fieldsSearchFilmsByField = ['field', 'value'];
const fieldsAllFilms = ['allFilms'];
const fieldSearchFilm = ['value'];
const fieldRelatedFilms = ['id'];

// ================================ FILTER FILM ================================

const setFilterFilmsToCache = (input, page = pageNumber, records = recordsNumber, films) => {
  // If page <= 10, cache films, else dont cache
  if (page > limitedPagesCache) {
    return;
  }

  console.log('set filter films to cache');

  const key = makeKey(input, page, records, fieldsFilterFilms);

  storeToRedis(key, films, timeoutFilterFilms);
}

const getFilterFilmsFromCache = (input, page = pageNumber, records = recordsNumber) => {
  // If page > limitedPagesCache, films aren't in cache
  if (page > limitedPagesCache) {
    return;
  }

  const key = makeKey(input, page, records, fieldsFilterFilms);

  console.log('get filter films in cache', key);

  return getDataFromRedis(key);
}

const setTotalFilterFilmsToCache = (input, totalRecords) => {
  console.log('set total filter films to cache');

  const key = makeKeyTotal(input, fieldsFilterFilms);

  storeToRedis(key, totalRecords, timeoutTotalFilterFilms);
}

const getTotalFilterFilmsFromCache = input => {
  console.log('get total filter films from cache');

  const key = makeKeyTotal(input, fieldsFilterFilms);

  return getDataFromRedis(key);
}

// ================================ SEARCH FILM BY FIELD ================================

const setSearchFilmByFieldToCache = (input, page = pageNumber, records = recordsNumber, films) => {
  // If page <= 10, cache films, else dont cache
  if (page > limitedPagesCache) {
    return;
  }

  console.log('set searched films by field to cache');

  const key = makeKey(input, page, records, fieldsSearchFilmsByField);

  storeToRedis(key, films, timeoutSearchFilmByField);
}

const getSearchFilmByFieldFromCache = (input, page = pageNumber, records = recordsNumber) => {
  // If page > limitedPagesCache, films aren't in cache
  if (page > limitedPagesCache) {
    return;
  }

  console.log('get searched films by field in cache');

  const key = makeKey(input, page, records, fieldsSearchFilmsByField);

  return getDataFromRedis(key);
}

const setTotalSearchFilmsByFieldToCache = (input, totalRecords) => {
  console.log('set total search films by field to cache');

  const key = makeKeyTotal(input, fieldsSearchFilmsByField);

  storeToRedis(key, totalRecords, timeoutTotalSearchFilmsByField);
}

const getTotalSearchFilmsByFieldFromCache = input => {
  console.log('get total search films by field from cache');

  const key = makeKeyTotal(input, fieldsSearchFilmsByField);

  return getDataFromRedis(key);
}

// ================================ ALL FILMS ================================

const setAllFilmsToCache = (page = pageNumber, records = recordsNumber, films) => {
  // If page <= 10, cache films, else dont cache
  if (page > limitedPagesCache) {
    return;
  }

  console.log('set all films to cache');

  const key = makeKey({}, page, records, fieldsAllFilms);

  storeToRedis(key, films, timeoutAllFilms);
}

const getAllFilmsFromCache = (page = pageNumber, records = recordsNumber) => {
  // If page > limitedPagesCache, films aren't in cache
  if (page > limitedPagesCache) {
    return;
  }

  console.log('get all films in cache');

  const key = makeKey({}, page, records, fieldsAllFilms);

  return getDataFromRedis(key);
}

const setTotalAllFilmsToCache = totalRecords => {
  console.log('set total all films to cache');

  const key = makeKeyTotal({}, fieldsAllFilms);

  storeToRedis(key, totalRecords, timeoutTotalAllFilms);
}

const getTotalAllFilmsFromCache = () => {
  console.log('get total all films from cache');

  const key = makeKeyTotal({}, fieldsAllFilms);

  return getDataFromRedis(key);
}

// ================================ SEARCH FILM ================================

const setSearchFilmsToCache = (input, page = pageNumber, records = recordsNumber, films) => {
  // If page <= 10, cache films, else dont cache
  if (page > limitedPagesCache) {
    return;
  }

  console.log('set search films to cache');

  const key = makeKey({ input }, page, records, fieldSearchFilm);

  storeToRedis(key, films, timeoutSearchFilm);
}

const getSearchFilmsFromCache = (input, page = pageNumber, records = recordsNumber) => {
  // If page > limitedPagesCache, films aren't in cache
  if (page > limitedPagesCache) {
    return;
  }

  console.log('get search films in cache');

  const key = makeKey({ input }, page, records, fieldSearchFilm);

  return getDataFromRedis(key);
}

const setTotalSearchFilmsToCache = (input, totalRecords) => {
  console.log('set total search films to cache');

  const key = makeKeyTotal(input, fieldSearchFilm);

  storeToRedis(key, totalRecords, timeoutTotalSeachFilms);
}

const getTotalSearchFilmsFromCache = input => {
  console.log('get total all films from cache');

  const key = makeKeyTotal(input, fieldsAllFilms);

  return getDataFromRedis(key);
}

// ================================ RELATED FILMS ================================

const setRelatedFilmsToCache = (id, page = pageNumber, records = recordsNumber, films) => {
  // If page <= 10, cache films, else dont cache
  if (page > limitedPagesCache) {
    return;
  }

  console.log('set related films to cache');

  const key = makeKey({ id }, page, records, fieldRelatedFilms);

  storeToRedis(key, films, timeoutRelatedFilms);
}

const getRelatedFilmsFromCache = (id, page = pageNumber, records = recordsNumber) => {
  // If page > limitedPagesCache, films aren't in cache
  if (page > limitedPagesCache) {
    return;
  }

  console.log('get related films in cache');

  const key = makeKey({ id }, page, records, fieldRelatedFilms);

  return getDataFromRedis(key);
}

const setTotalRelatedFilmsToCache = (id, totalRecords) => {
  console.log('set total related films to cache');

  const key = makeKeyTotal({ id }, fieldRelatedFilms);

  storeToRedis(key, totalRecords, timeoutRelatedFilms);
}

const getTotalRelatedFilmsFromCache = id => {
  console.log('get total related films from cache');

  const key = makeKeyTotal({ id }, fieldRelatedFilms);

  return getDataFromRedis(key);
}

module.exports = {
  setFilterFilmsToCache,
  getFilterFilmsFromCache,
  setTotalFilterFilmsToCache,
  getTotalFilterFilmsFromCache,

  setSearchFilmByFieldToCache,
  getSearchFilmByFieldFromCache,
  setTotalSearchFilmsByFieldToCache,
  getTotalSearchFilmsByFieldFromCache,

  setAllFilmsToCache,
  getAllFilmsFromCache,
  setTotalAllFilmsToCache,
  getTotalAllFilmsFromCache,

  setSearchFilmsToCache,
  getSearchFilmsFromCache,
  setTotalSearchFilmsToCache,
  getTotalSearchFilmsFromCache,

  setRelatedFilmsToCache,
  getRelatedFilmsFromCache,
  setTotalRelatedFilmsToCache,
  getTotalRelatedFilmsFromCache
}