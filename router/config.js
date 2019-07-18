const express = require('express');

const { checkInputService, checkIdService, checkKeyService, getAllConfigsService, addConfigService, updateConfigService, searchConfigByKeyService, deleteConfigService } = require('../service/config.service');

const router = express.Router();

// @route   GET api/configs
// @desc    Get all configs
// @access  Public
router.get('/', async (req, res) => {
  // Get data
  const { error, configs } = await getAllConfigsService();

  if (!configs || configs.length === 0) {
    error.isError = true;
    error.errorMessage.configs = 'Not Found';

    return res.status(404).send(error);
  }

  return res.status(200).send({
    error,
    configs
  });
});

// @route   POST api/configs
// @desc    Add a config
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

  // Store data
  error = await addConfigService(key, values);
  if (error.isError) {
    return res.status(500).send(error);
  }

  return res.status(201).send(error);
});

// @route   PATCH api/configss?id=
// @desc    Update a config
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
  if (error.isError === true) {
    return res.status(400).send(error);
  }

  // Check input data
  error = checkInputService(key, values);
  if (error.isError === true) {
    return res.status(400).send(error);
  }

  // Update category
  error = await updateConfigService(id, key, values);
  if (error.isError) {
    return res.status(500).send(error);
  }

  return res.status(200).send(error);
});

// @route   GET api/configs?key=
// @desc    Get config by key
// @access  Public
router.get('/search', async (req, res) => {
  const { key } = req.query;

  // Check key
  const check = checkKeyService(key);
  if (check.isError) {
    return res.status(400).send(check);
  }

  // Search config in database and return to client
  let { error, configs } = await searchConfigByKeyService(key);

  if (!configs || configs.length === 0) {
    error.isError = true;
    error.errorMessage.configs = 'Not Found';

    return res.status(404).send(error);
  }

  return res.status(200).send({
    error,
    configs
  });

})

// @route   DELETE api/configs?id=
// @desc    DELETE a config
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

  // Delete a config in database
  error = await deleteConfigService(id);

  if (error.isError) {
    return res.status(500).send(error);
  }

  return res.status(200).send(error);
});

module.exports = router;