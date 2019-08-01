const Film = require('../database/Film.model');
const { getWatchedFilmsByUserId, updateWatchedFilmsByUserId } = require('../database/watchedFilms');
module.exports = async (req, res, next) => {
  try {
    if (!req.body.filmId) return res.status(400).send({ error: { isError: true, errorMessage: { filmId: 'filmId missing' } } });
    const filmId = req.body.filmId;
    const userWatchedFilms = JSON.parse(await getWatchedFilmsByUserId(req.userId));
    const filmWatched = (userWatchedFilms.films.findIndex((film) => (film.id === filmId)) > -1) ? 1 : 0;
    if (filmWatched) return res.send({ error: { isError: false, errorMessage: {} } });

    const film = await Film.findById(req.body.filmId);
    if (!film) return res.status(404).send({ error: { isError: true, errorMessage: { filmId: 'Invalid filmId' } } });
    const watchedFilmsUpdates = {
      id: filmId,
      title: film.title,
      episodeNumber: film.episodeNumber,
      episodeNumberCurrent: film.links.length,
      thumb: film.thumb
    }
    userWatchedFilms.films.push(watchedFilmsUpdates);
    await updateWatchedFilmsByUserId(req.userId, userWatchedFilms);
    res.send({ error: { isError: false, errorMessage: {} } });
  } catch (err) {
    res.status(500).send({ error: { isError: true, errorMessage: { database: err.message } } });
  }
}