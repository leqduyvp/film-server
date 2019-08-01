const { checkString } = require('../utils/checkString');
const { checkPositiveNumber } = require('../utils/checkPositiveNumber');

const checkPagination = (page, records) => {
  let error = {
    isError: false,
    errorMessage: {}
  }

  // Comment this to not alow page and records undefined
  if (page === undefined && records === undefined) {
    return error;
  }

  let check = checkPositiveNumber(page);
  if (check.isError) {
    error.isError = true;
    error.errorMessage.page = 'page ' + check.message;

    return error;
  }

  check = checkPositiveNumber(records);
  if (check.isError) {
    error.isError = true;
    error.errorMessage.page = 'records ' + check.message;

    return error;
  }

  return error;
}

const checkAddFilmInput = input => {
  let error = {
    isError: false,
    errorMessage: {}
  }

  // Required fields
  const fields = [
    'title',
    'category',
    'episodeNumber',
    'scripts',
    'directors',
    'characters',
    'description',
    'image',
    'thumb',
    'type',
    'links',
    'ratingNumber',
    'views',
    'tags'
  ];

  fields.forEach(field => {
    if (input[field] === '' || !input[field]) {
      error.isError = true;
      error.errorMessage[field] = field + ' must not be empty';

      return error;
    }
  });

  return error;
}

const checkId = id => {
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

const checkSearchFilmByField = input => {
  let error = {
    isError: false,
    errorMessage: {}
  }

  // Required fields
  const fields = [
    'field',
    'value'
  ];

  fields.forEach(field => {
    if (input[field] === '' || !input[field]) {
      error.isError = true;
      error.errorMessage[field] = field + ' must not be empty';

      return error;
    }
  });

  return error;
}

const checkSearchFilm = value => {
  const error = {
    isError: false,
    errorMessage: {}
  }

  const err = checkString(value);

  if (err.isError) {
    error.isError = true;
    error.errorMessage.value = 'value ' + err.message;

    return error;
  }

  return error;
}

const checkUpdateFilmInput = input => {
  let error = {
    isError: false,
    errorMessage: {}
  }

  if (!Object.keys(input).length) {
    error.isError = true;
    error.errorMessage.input = 'input is empty';

    return error;
  }

  // Required fields
  const fields = [
    'title',
    'supportedResolution',
    'dateReleased',
    'dateUpdated',
    'category',
    'country',
    'time',
    'episodeNumber',
    'scripts',
    'directors',
    'characters',
    'description',
    'image',
    'thumb',
    'type',
    'tags'
  ];

  fields.forEach(field => {
    if (input[field]) {
      if (input[field] === '' || input[field].length === 0) {
        error.isError = true;
        error.errorMessage[field] = field + ' must not be empty';
      }

      return error;
    }
  });

  return error;
}

module.exports = {
  checkPagination,
  checkAddFilmInput,
  checkId,
  checkSearchFilmByField,
  checkSearchFilm,
  checkUpdateFilmInput
}