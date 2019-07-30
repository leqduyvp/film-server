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


module.exports = {
  checkPagination,
  checkAddFilmInput,
  checkId,
  checkSearchFilmByField
}