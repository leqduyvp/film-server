const { rateSave } = require('../database/rate');
const { userSave, findUserById } = require('../database/users');

async function calcNewRate(req, filmRate) {
  const checkRatedFilm = req.user.ratedFilms.filter((ratedFilm) => {
    return (ratedFilm.filmId.toString() == filmRate.filmId.toString());
  });

  if (checkRatedFilm.length) {
    throw new Error('This film is rated by current user');
  }

  const userRated = filmRate.rates.length;
  filmRate.ratingNumber = ((filmRate.ratingNumber * userRated) + req.body.rate) / (userRated + 1);
  filmRate.rates.push({
    userId: req.user._id,
    rating: req.body.rate
  });

  req.user.ratedFilms.push({ filmId: filmRate.filmId });

  await userSave(req.user);
  await rateSave(filmRate);
}

module.exports = async (req, res, next) => {
  try {
    req.user = await findUserById(req.userId);
    await calcNewRate(req, req.filmRate);
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