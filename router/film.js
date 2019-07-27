const express = require('express');

const { addFilmService, getFilmByIdService, filterFilmsService } = require('../service/film.service');
const { checkFilmInput, checkId, checkPagination } = require('../service/film.validate');

const router = express.Router();

// @route   GET api/films
// @desc    Add a film
// @access  Private
router.post('/', async (req, res) => {
  let error = {
    isError: false,
    errorMessage: {}
  };

  const input = { ...req.body };

  error = checkFilmInput(input);
  if (error.isError) {
    return res.status(400).send(error);
  }

  // Store data
  error = await addFilmService(input);
  if (error.isError) {
    return res.status(500).send(error);
  }

  return res.status(201).send(error);
});

// @route   GET api/films?id=
// @desc    Get films by id
// @access  Public
router.get('/', async (req, res) => {
  const { id } = req.query;

  const check = checkId(id);
  if (check.isError) {
    return res.status(400).send(check);
  }

  const { error, film } = await getFilmByIdService(id);
  if (error.isError) {
    return res.status(500).send(error);
  }

  if (!film) {
    error.isError = true;
    error.errorMessage.film = 'Not Found';

    return res.status(404).send(error)
  }

  return res.status(200).send({
    error,
    film
  });
});

// @route   GET api/films/filter?page=?records=?
// @desc    Filter film
// @access  Public
router.get('/filter', async (req, res) => {
  const { page, records } = req.query;
  const input = { ...req.body };

  // Check pagination
  let check = checkPagination(page, records);
  if (check.isError) {
    return res.status(400).send(check);
  }

  const { error, films } = await filterFilmsService(input, page, records);
  if (error.isError) {
    return res.status(500).send(error);
  }

  if (!films || films.length === 0) {
    error.isError = true;
    error.errorMessage.films = 'Not Found';

    return res.status(404).send(error)
  }

  return res.status(200).send({
    error,
    films
  });
})

module.exports = router;