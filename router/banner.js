const express = require('express');

const { getAllBannersService, addBannerService, updateBannerService, deleteBannerService } = require('../service/banner.service');
const { checkBanner, checkId } = require('../service/banner.validate');

const router = express.Router();

// @route   GET api/banners
// @desc    Get all banners
// @access  Public
router.get('/', async (req, res) => {
  // Get data
  const { error, banners } = await getAllBannersService();
  if (error.isError) {
    return res.status(500).send(error);
  }

  if (!banners || banners.length === 0) {
    error.isError = true;
    error.errorMessage.banners = 'Not Found';

    return res.status(404).send(error);
  }

  return res.status(200).send({
    error,
    banners
  });
});

// @route   POST api/banners
// @desc    Add a banner
// @access  Private
router.post('/', async (req, res) => {
  let error = {
    isError: false,
    errorMessage: {}
  };

  // Check Authorization

  const { image, action, payload } = req.body;
  const input = {
    image,
    action,
    payload
  }

  // Check input
  error = checkBanner(input);
  if (error.isError) {
    return res.status(400).send(error);
  }

  // Store data
  error = await addBannerService(input);
  if (error.isError) {
    return res.status(500).send(error);
  }

  return res.status(201).send(error);
});

// @route   PATCH api/banners?id=
// @desc    Update a banner
// @access  Private
router.patch('/', async (req, res) => {
  let error = {
    isError: false,
    errorMessage: {}
  };

  // Check Authorization

  const { id } = req.query;
  const { image, action, payload } = req.body;
  const input = {
    image,
    action,
    payload
  }

  // Check id
  error = checkId(id);
  if (error.isError) {
    return res.status(400).send(error);
  }

  // Check input
  error = checkBanner(input);
  if (error.isError) {
    return res.status(400).send(error);
  }

  // Update data
  error = await updateBannerService(id, input);
  if (error.isError) {
    return res.status(500).send(error);
  }

  return res.status(200).send(error);
});

// @route   DELETE api/banners?id=
// @desc    Delete a banner
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
    return res.status(400).send(error);
  }

  error = await deleteBannerService(id);
  if (error.isError) {
    return res.status(500).send(error);
  }

  return res.status(200).send(error);
});


module.exports = router;