const express = require('express');

const { getAllCategoriesService, addCategoryService, updateCategoryService, deleteCategoryService } = require('../service/category.service');
const { checkId, checkInput } = require('../service/category.validate');

const router = express.Router();

// @route   GET api/categories
// @desc    Get all categories
// @access  Public
router.get('/', async (req, res) => {
  // Get data
  const { error, categories } = await getAllCategoriesService();
  if (error.isError) {
    return res.status(500).send(error);
  }

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

  const { parentCategory, childrenCategories } = req.body;

  // Check input data
  error = checkInput(parentCategory, childrenCategories);
  if (error.isError) {
    return res.status(400).send(error);
  }

  // Store data
  error = await addCategoryService(parentCategory, childrenCategories);
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
  const { parentCategory, childrenCategories } = req.body;

  // Check id
  error = checkId(id);
  if (error.isError) {
    return res.status(400).send(error);
  }

  // Check input data
  error = checkInput(parentCategory, childrenCategories);
  if (error.isError) {
    return res.status(400).send(error);
  }

  // Update category
  error = await updateCategoryService(id, parentCategory, childrenCategories);
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
  error = checkId(id);
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