const checkPositiveNumber = number => {
  const temp = Number.parseInt(number);

  let error = {
    isError: false,
    message: ''
  }

  if (!Number.isInteger(temp)) {
    error.isError = true;
    error.message = 'must be an integer number';

    return error;
  }

  if (temp <= 0) {
    error.isError = true;
    error.message = 'must be greater than 0';

    return error;
  }

  return error;
}

module.exports = {
  checkPositiveNumber
}