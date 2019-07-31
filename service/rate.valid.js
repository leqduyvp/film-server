const { getRateByFilmId } = require('../database/rate');
const { rateValidator } = require('./body.valid');

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

  rateValidator(req.body, error);

  if (error.isError) return res.status(400).send({ error });
  req.filmRate = filmRate;
  next();
}