const express = require('express');

const { getFilmsByCategoryService } = require('../service/film.service');

const router = express.Router();

// @route   GET api/films
// @desc    Get films by category
// @access  Public
router.get('/film', async (req, res) => {
  const { category, page, records } = req.query;

  // Get films
  const { error, filmsCategory } = await getFilmsByCategoryService(category, page, records);

  if (error.isError) {
    res.json
  }
})