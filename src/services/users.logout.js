module.exports = (req, res, next) => {
  res.send({
    error: {
      isError: false,
      errorMessage: {}
    }
  });
}