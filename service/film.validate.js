const checkString = require('../utils/checkString');

const checkPagination = (page, records) => {
  let error = {
    isError: false,
    errorMessage: {}
  }

  if (typeof page !== 'number') {
    error.isError = true;
    error.errorMessage.page = 'page must be a number';

    return error;
  }

  if (page <= 0) {
    error.isError = true;
    error.errorMessage.page = 'page must be greater than 0';

    return error;
  }

  if (typeof records !== 'number') {
    error.isError = true;
    error.errorMessage.records = 'records must be a number';

    return error;
  }

  if (records <= 0) {
    error.isError = true;
    error.errorMessage.records = 'records must be greater than 0';

    return error;
  }

  return error;
}

const checkCategory = category => {
  let error = {
    isError: false,
    errorMessage: {}
  }

  const err = checkString(id);

  if (err.isError) {
    error.isError = true;
    error.errorMessage.id = 'category ' + err.message;

    return error;
  }

  return error;
}

module.exports = {
  checkPagination,
  checkCategory
}