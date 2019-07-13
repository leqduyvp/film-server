const express = require('express');
const router = new express.Router();

router.post('/', (req, res) => {
  res.send({
    error: {
      isError: false,
      errorMessage: ''
    }
  });
});

router.patch('/', (req, res) => {
  res.send({
    error: {
      isError: false,
      errorMessage: ''
    }
  });
});

module.exports = router;