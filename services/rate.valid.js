const { getRateByFilmId } = require('../database/rate');

const rateValid = (rate, error) => {
  if (Math.floor(rate) * 10 != rate * 10) {
    error.isError = true;
    error.errorMessage.rate = 'Rate number is not an integer';
  } else if (rate < 1 || rate > 5) {
    error.isError = true;
    error.errorMessage.rate = 'Rate number is out of range [1 .. 5]';
  }
}


module.exports = async (req, res, next) => {
  const error = { isError: false, errorMessage: {} };
  const filmRate = await getRateByFilmId(req.query.filmId);

  if (!filmRate) {
    return res.status(400).send({
      error: {
        isError: true,
        errorMessage: {
          filmId: 'Invalid film'
        }
      }
    });
  }

  rateValid(req.body.rate, error);

  if (error.isError) return res.status(400).send({ error });
  req.filmRate = filmRate;
  next();
}