const express = require('express');

const {
  addFilmService,
  getAllFilmsService,
  getFilmByIdService,
  filterFilmsService,
  searchFilmByFieldService,
  searchFilmService,
  deleteFilmService,
  getRelatedFilmsService,
  updateFilmService
} = require('../service/film.service');
const {
  checkAddFilmInput,
  checkId,
  checkPagination,
  checkSearchFilmByField,
  checkSearchFilm,
  checkUpdateFilmInput
} = require('../service/film.validate');

const router = express.Router();

// @route   GET api/films
// @desc    Get all films
// @access  Public
router.get('/', async (req, res) => {
  const { page, records } = req.query;

  // Check pagination
  let check = checkPagination(page, records);
  if (check.isError) {
    return res.status(400).send({ error: check });
  }

  const { error, films, totalRecords } = await getAllFilmsService(page, records);
  if (error.isError) {
    return res.status(500).send({ error });
  }

  if (!films || films.length === 0) {
    error.isError = true;
    error.errorMessage.films = 'Not Found';

    return res.status(404).send({ error });
  }

  return res.status(200).send({
    error,
    films,
    totalRecords
  });
})

// @route   POST api/films
// @desc    Add a film
// @access  Private
router.post('/', async (req, res) => {
  let error = {
    isError: false,
    errorMessage: {}
  };

  const input = { ...req.body };

  error = checkAddFilmInput(input);
  if (error.isError) {
    return res.status(400).send({ error });
  }

  // Store data
  error = await addFilmService(input);
  if (error.isError) {
    return res.status(500).send({ error });
  }

  return res.status(201).send({ error });
});

// @route   PATCH api/films
// @desc    Update a film
// @access  Private
router.patch('/', async (req, res) => {
  let error = {
    isError: false,
    errorMessage: {}
  };

  const { id } = req.query;
  const input = { ...req.body };

  error = checkId(id);
  if (error.isError) {
    return res.status(400).send({ error });
  }

  error = checkUpdateFilmInput(input);
  if (error.isError) {
    return res.status(400).send({ error });
  }

  // // Store data
  // error = await updateFilmService(input);
  // if (error.isError) {
  //   return res.status(500).send({ error });
  // }

  return res.status(201).send({ error });
})

// @route   GET api/films/id?id=
// @desc    Get films by id
// @access  Public
router.get('/id', async (req, res) => {
  const { id } = req.query;

  const check = checkId(id);
  if (check.isError) {
    return res.status(400).send({ error: check });
  }

  const { error, film } = await getFilmByIdService(id);
  if (error.isError) {
    return res.status(500).send({ error });
  }

  if (!film) {
    error.isError = true;
    error.errorMessage.film = 'Not Found';

    return res.status(404).send({ error });
  }

  return res.status(200).send({
    error,
    film
  });
});

// @route   GET api/films/filter?page=&records=&category=&arrange=&country=&type=&year=
// @desc    Filter film
// @access  Public
router.get('/filter', async (req, res) => {
  const {
    page,
    records,
    category,
    arrange,
    country,
    type,
    year
  } = req.query;

  const input = {
    category,
    arrange: Number.parseInt(arrange),
    country,
    type,
    year
  }

  console.log(input)

  // Check pagination
  let check = checkPagination(page, records);
  if (check.isError) {
    return res.status(400).send({ error: check });
  }

  const { error, films, totalRecords } = await filterFilmsService(input, page, records);
  if (error.isError) {
    return res.status(500).send({ error });
  }

  if (!films || films.length === 0) {
    error.isError = true;
    error.errorMessage.films = 'Not Found';

    return res.status(404).send({ error });
  }

  return res.status(200).send({
    error,
    films,
    totalRecords
  });
});

// @route   GET api/films/field=&value=&page=&records=
// @desc    Search film by any field
// @access  Public
router.get('/field', async (req, res) => {
  const {
    field,
    value,
    page,
    records
  } = req.query;

  const input = {
    field,
    value
  }

  // Check pagination
  let check = checkPagination(page, records);
  if (check.isError) {
    return res.status(400).send({ error: check });
  }

  // Check input
  check = checkSearchFilmByField(input);
  if (check.isError) {
    return res.status(400).send({ error: check });
  }

  const { error, films, totalRecords } = await searchFilmByFieldService(input, page, records);

  if (error.isError) {
    return res.status(500).send({ error });
  }

  if (!films || films.length === 0) {
    error.isError = true;
    error.errorMessage.films = 'Not Found';

    return res.status(404).send({ error });
  }

  return res.status(200).send({
    error,
    films,
    totalRecords
  });

});

// @route   GET api/films/search?value=&page=&records=
// @desc    Search film by title, directors, characters, tags
// @access  Public
router.get('/search', async (req, res) => {
  const { value, page, records } = req.query;

  // Check pagination
  let check = checkPagination(page, records);
  if (check.isError) {
    return res.status(400).send({ error: check });
  }

  // Check input
  check = checkSearchFilm(value);
  if (check.isError) {
    return res.status(400).send({ error: check });
  }

  const { error, films, totalRecords } = await searchFilmService(value, page, records);

  if (error.isError) {
    return res.status(500).send({ error });
  }

  if (!films || films.length === 0) {
    error.isError = true;
    error.errorMessage.films = 'Not Found';

    return res.status(404).send({ error });
  }

  return res.status(200).send({
    error,
    films,
    totalRecords
  });
});

// @route   DELETE api/films?id=
// @desc    Delete film by id
// @access  Private
router.delete('/', async (req, res) => {
  let error = {
    isError: false,
    errorMessage: {}
  };

  // Check Authorization

  const { id } = req.query;

  // Check id
  error = checkId(id);
  if (error.isError) {
    return res.status(400).send({ error });
  }

  error = await deleteFilmService(id);
  if (error.isError) {
    return res.status(500).send({ error });
  }

  return res.status(200).send({ error });
});

// @route   GET api/films/related?id=
// @desc    Get list related films
// @access  Public
router.get('/related', async (req, res) => {
  const { id, page, records } = req.query;

  // Check id
  let check = checkId(id);
  if (check.isError) {
    return res.status(400).send({ error: check });
  }

  // Check pagination
  check = checkPagination(page, records);
  if (check.isError) {
    return res.status(400).send({ error: check });
  }

  const { error, films, totalRecords } = await getRelatedFilmsService(id, page, records);
  if (error.isError) {
    return res.status(500).send({ error });
  }

  if (!films) {
    error.isError = true;
    error.errorMessage.film = 'Not Found';

    return res.status(404).send({ error })
  }

  return res.status(200).send({
    error,
    films,
    totalRecords
  });
})

module.exports = router;