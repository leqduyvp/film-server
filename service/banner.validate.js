const { checkString } = require('../utils/checkString');
const checkBanner = input => {
  let error = {
    isError: false,
    errorMessage: {}
  }

  const fields = ['image', 'action', 'payload'];
  fields.forEach(field => {
    if (input[field] === '' || input[field] === undefined || input[field] === null) {
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

module.exports = {
  checkBanner,
  checkId
}