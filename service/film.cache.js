const { getDataFromRedis, storeToRedis } = require('../utils/redis');

const {
  timeoutFilterFilms,
  limitedPagesCache,
  timeoutSearchFilmByField,
  timeoutAllFilms,
  timeoutSearchFilm,
  timeoutRelatedFilms } = require('../config/redis.config');
const { pageNumber, recordsNumber } = require('../config/film.config');
const { makeKey } = require('../utils/redis');

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

  storeToRedis(key, films, timeoutFilterFilms);
}

const getFilterFilmsFromCache = (input, page = pageNumber, records = recordsNumber) => {
  // If page > limitedPagesCache, films aren't in cache
  if (page > limitedPagesCache) {
    return;
  }

  console.log('get filter films in cache');

  const key = makeKey(input, page, records, fieldsFilter);

  return getDataFromRedis(key);
}

const setSearchFilmByFieldToCache = (input, page = pageNumber, records = recordsNumber, films) => {
  // If page <= 10, cache films, else dont cache
  if (page > limitedPagesCache) {
    return;
  }

  console.log('set searched films by field to cache');

  const key = makeKey(input, page, records, fieldsSearch);

  storeToRedis(key, films, timeoutSearchFilmByField);
}

const getSearchFilmByFieldFromCache = (input, page = pageNumber, records = recordsNumber) => {
  // If page > limitedPagesCache, films aren't in cache
  if (page > limitedPagesCache) {
    return;
  }

  console.log('get searched films by field in cache');

  const key = makeKey(input, page, records, fieldsSearch);

  return getDataFromRedis(key);
}

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

const setSearchFilmsToCache = (value, page = pageNumber, records = recordsNumber, films) => {
  // If page <= 10, cache films, else dont cache
  if (page > limitedPagesCache) {
    return;
  }

  console.log('set search films to cache');

  const key = makeKey({ value }, page, records, fieldSearchFilm);

  storeToRedis(key, films, timeoutSearchFilm);
}

const getSearchFilmsFromCache = (value, page = pageNumber, records = recordsNumber) => {
  // If page > limitedPagesCache, films aren't in cache
  if (page > limitedPagesCache) {
    return;
  }

  console.log('get search films in cache');

  const key = makeKey({ value }, page, records, fieldSearchFilm);

  return getDataFromRedis(key);
}

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