const { rateSave } = require('../database/rate');
const { userSave, findUserById } = require('../database/users');

async function calcNewRate(req) {
  const filmRate = req.filmRate;
  const checkRatedFilm = filmRate.rates.findIndex((rateValue) => {
    return (rateValue.userId.toString() === req.user._id.toString());
  });

  if (checkRatedFilm === -1) {
    filmRate.rates.push({
      userId: req.user._id,
      rating: req.body.rate
    });
    req.user.ratedFilms.push({ filmId: filmRate.filmId });
  }
  else filmRate.rates[checkRatedFilm].rating = req.body.rate;

  let newRate = 0;
  filmRate.rates.forEach((rateValue) => {
    newRate += rateValue.rating;
  });
  filmRate.ratingNumber = newRate / filmRate.rates.length;

  await userSave(req.user);
  await rateSave(filmRate);
}

module.exports = async (req, res, next) => {
  try {
    req.user = await findUserById(req.userId);
    await calcNewRate(req);
    res.status(201).send({
      error: {
        isError: false,
        errorMessage: {}
      }
    });
  } catch (e) {
    console.log(e.message);
    return res.status(500).send({
      error: {
        isError: true,
        errorMessage: {
          server: e.message
        }
      }
    });
  }
}