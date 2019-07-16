const getRateByFilmId = require('../database/rate.getRateByFilmId');
const rateSave = require('../database/rate.save');

async function calcNewRate(req, filmRate) {
  const checkRatedUser = filmRate.rates.findIndex((rateElement) => {
    return rateElement.userId.toString() == req.user._id.toString()
  });

  if (checkRatedUser == -1) {
    throw new Error('This film is not rated by the current user');
  }

  const { ratingNumber, rates } = filmRate;
  filmRate.ratingNumber = ratingNumber + (req.body.rate - rates[checkRatedUser].rating) / rates.length;

  filmRate.rates[checkRatedUser].rating = req.body.rate;

  await rateSave(filmRate);
}

module.exports = async (req, res, next) => {
  try {
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

    calcNewRate(req, filmRate);

    res.send({
      error: {
        isError: false,
        errorMessage: {}
      }
    });
  } catch (e) {
    res.status(500).send({
      error: {
        isError: true,
        errorMessage: {
          server: e.message
        }
      }
    });
  }
}