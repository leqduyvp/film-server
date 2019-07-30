const {
  addFilm,
  getFilmById,
  filterFilm,
  searchFilmByField,
  getAllFilms,
  searchFilm,
  deleteFilm,
  getRelatedFilms
} = require('../database/film');
const {
  setFilterFilmsToCache,
  getFilterFilmsFromCache,
  getSearchFilmByFieldFromCache,
  setSearchFilmByFieldToCache,
  getAllFilmsFromCache,
  setAllFilmsToCache,
  getSearchFilmsFromCache,
  setSearchFilmsToCache,
  getRelatedFilmsFromCache,
  setRelatedFilmsToCache
} = require('./film.cache');

const addFilmService = async input => {
  let error = {
    isError: false,
    errorMessage: {}
  }

  try {
    await addFilm(input);

    // Update in cache

    return error;
  } catch (err) {
    error.isError = true;
    error.errorMessage.database = err.message;

    return error;
  }
}

const getFilmByIdService = async id => {
  let error = {
    isError: false,
    errorMessage: {}
  }

  try {
    let film = null;
    // Get film in cache

    // If there isn't in cache, get it in database
    film = await getFilmById(id);

    return {
      error,
      film
    }
  } catch (err) {
    error.isError = true;
    error.errorMessage.database = err.message;

    return {
      error
    };
  }
}

const filterFilmsService = async (input, page, records) => {
  let error = {
    isError: false,
    errorMessage: {}
  }

  try {
    let films = [];

    // Get films in cache
    films = await getFilterFilmsFromCache(input, page, records);
    if (films) {
      return {
        error,
        films
      }
    }

    // If there isn't in cache, get it in database
    films = await filterFilm(input, page, records);

    // Set films to cache
    setFilterFilmsToCache(input, page, records, films);

    return {
      error,
      films
    }
  } catch (err) {
    error.isError = true;
    error.errorMessage.database = err.message;

    return {
      error
    };
  }
}

const searchFilmByFieldService = async (input, page, records) => {
  let error = {
    isError: false,
    errorMessage: {}
  }

  try {
    let films = [];

    // Get films in cache
    films = await getSearchFilmByFieldFromCache(input, page, records);
    if (films) {
      return {
        error,
        films
      }
    }

    // If there isn't in cache, search in database
    films = await searchFilmByField(input, page, records);

    // Set films to cache
    setSearchFilmByFieldToCache(input, page, records, films);

    return {
      error,
      films
    }
  } catch (err) {
    error.isError = true;
    error.errorMessage.database = err.message;

    return {
      error
    };
  }
}

const getAllFilmsService = async (page, records) => {
  let error = {
    isError: false,
    errorMessage: {}
  }

  try {
    let films = [];

    // Get films in cache
    films = await getAllFilmsFromCache(page, records);
    if (films) {
      return {
        error,
        films
      }
    }

    // If there isn't in cache, search in database
    films = await getAllFilms(page, records);

    // Set films to cache
    setAllFilmsToCache(page, records, films);

    return {
      error,
      films
    }
  } catch (err) {
    error.isError = true;
    error.errorMessage.database = err.message;

    return {
      error
    };
  }
}

const searchFilmService = async (value, page, records) => {
  let error = {
    isError: false,
    errorMessage: {}
  }

  try {
    let films = [];

    // Get films in cache
    films = await getSearchFilmsFromCache(value, page, records);
    if (films) {
      return {
        error,
        films
      }
    }

    // If there isn't in cache, search in database
    films = await searchFilm(value, page, records);

    // Set films to cache
    setSearchFilmsToCache(value, page, records, films);

    return {
      error,
      films
    }
  } catch (err) {
    error.isError = true;
    error.errorMessage.database = err.message;

    return {
      error
    };
  }
}

const deleteFilmService = async id => {
  let error = {
    isError: false,
    errorMessage: {}
  };

  try {
    // Delete in database
    await deleteFilm(id);

    // Delete in cache

    return error;
  } catch (err) {
    error.isError = true;
    error.errorMessage.database = err.message;

    return error;
  }
}

const getRelatedFilmsService = async (id, page, records) => {
  let error = {
    isError: false,
    errorMessage: {}
  }

  try {
    let films = [];

    // Get films in cache
    films = await getRelatedFilmsFromCache(id, page, records);
    if (films) {
      return {
        error,
        films
      }
    }

    // If there isn't in cache, search in database
    films = await getRelatedFilms(id, page, records);

    // // Set films to cache
    setRelatedFilmsToCache(id, page, records, films);

    return {
      error,
      films
    }
  } catch (err) {
    error.isError = true;
    error.errorMessage.database = err.message;

    return {
      error
    };
  }
}

module.exports = {
  addFilmService,
  getFilmByIdService,
  filterFilmsService,
  searchFilmByFieldService,
  getAllFilmsService,
  searchFilmService,
  deleteFilmService,
  getRelatedFilmsService
}