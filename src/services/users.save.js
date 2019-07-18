const { userSave } = require('../database/users');
const { watchedFilmsSave } = require('../database/watchedFilms');

module.exports = async (req, res) => {
  try {
    const user = await userSave(req.body);
    if (req.path == '/register') {
      await watchedFilmsSave({
        userId: user._id,
        films: []
      });
    }
    res.status(201).send({
      error: {
        isError: false,
        errorMessage: {}
      }
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({
      error: {
        isError: true,
        errorMessage: {
          server: 'Save Error'
        }
      }
    });
  }
}