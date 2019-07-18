const checkString = str => {
  let error = {
    isError: false,
    message: ''
  }

  if (str === undefined || str === null) {
    error.isError = true;
    error.message = 'is required';

    return error;
  }

  if (typeof str !== 'string') {
    error.isError = true;
    error.message = 'must be a string';

    return error;
  }

  str = str.trim();

  if (str === '') {
    error.isError = true;
    error.message = 'must not be empty';

    return error;
  }

  return error;
}

module.exports = {
  checkString
}