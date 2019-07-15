const express = require('express');
const router = new express.Router();
const authToken = require('../services/token.auth');
const rateFilm = require('../services/rate.rateFilm');

router.post('/', authToken, rateFilm);
// (req, res) => {
//   res.send({
//     error: {
//       isError: false,
//       errorMessage: ''
//     }
//   });
// });

router.patch('/', (req, res) => {
  res.send({
    error: {
      isError: false,
      errorMessage: ''
    }
  });
});

module.exports = router;