const { getWatchedFilmsByUserId } = require('../database/watchedFilms');

module.exports = async (req, res, next) => {
  try {
    const { films } = await getWatchedFilmsByUserId(req.userId);
    res.send({
      error: {
        isError: false,
        errorMessage: {}
      },
      watchedFilms: films
    });
  } catch (err) {
    res.status(500).send({
      error: {
        isError: true,
        errorMessage: {
          database: err.message
        }
      }
    })
  }
}