const express = require('express');

const { checkInputService, checkIdService, changeInputService, getAllCategoriesService, addCategoryService, updateCategoryService, deleteCategoryService } = require('../service/category.service');

const router = express.Router();

// @route   GET api/categories
// @desc    Get all categories
// @access  Public
router.get('/', async (req, res) => {
  // Get data
  const { error, categories } = await getAllCategoriesService();

  if (!categories || categories.length === 0) {
    error.isError = true;
    error.errorMessage.categories = 'Not Found';

    return res.status(404).send(error);
  }

  return res.status(200).send({
    error,
    categories
  });
});

// @route   POST api/categories
// @desc    Add a category
// @access  Private
router.post('/', async (req, res) => {
  let error = {
    isError: false,
    errorMessage: {}
  };

  // Check Authorization

  const { key, values } = req.body;

  // Check input data
  error = checkInputService(key, values);
  if (error.isError) {
    return res.status(400).send(error);
  }

  // Change input data: trim and convert to lower case
  const { changedKey, changedValues } = changeInputService(key, values);

  // Store data
  error = await addCategoryService(changedKey, changedValues);
  if (error.isError) {
    return res.status(500).send(error);
  }

  return res.status(201).send(error);
});

// @route   PATCH api/categories?id=
// @desc    Update a category
// @access  Private
router.patch('/', async (req, res) => {
  let error = {
    isError: false,
    errorMessage: {}
  };

  const { id } = req.query;
  const { key, values } = req.body;

  // Check id
  error = checkIdService(id);
  if (error.isError) {
    return res.status(400).send(error);
  }

  // Check input data
  error = checkInputService(key, values);
  if (error.isError) {
    return res.status(400).send(error);
  }

  // Change input data: trim and convert to lower case
  const { changedKey, changedValues } = changeInputService(key, values);

  // Update category
  error = await updateCategoryService(id, changedKey, changedValues);
  if (error.isError) {
    return res.status(500).send(error);
  }

  return res.status(200).send(error);

});

// @route   DELETE api/categories?id=
// @desc    DELETE a category
// @access  Private
router.delete('/', async (req, res) => {
  let error = {
    isError: false,
    errorMessage: {}
  };

  const { id } = req.query;

  // Check id
  error = checkIdService(id);
  if (error.isError) {
    return res.status(400).send(error);
  }

  // Delete a category
  error = await deleteCategoryService(id);
  if (error.isError) {
    return res.status(500).send(error);
  }

  return res.status(200).send(error);
});

module.exports = router;