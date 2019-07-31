const express = require('express');
const router = new express.Router();
const authToken = require('../services/token.auth');
const rateFilm = require('../services/rate.rateFilm');
// const changeRate = require('../services/rate.changeRate');
const rateValid = require('../services/rate.valid');

router.post('/', authToken, rateValid, rateFilm);
// (req, res) => {
//   res.send({
//     error: {
//       isError: false,
//       errorMessage: ''
//     }
//   });
// });

// router.patch('/', authToken, rateValid, changeRate);
// // (req, res) => {
// //   res.send({
// //     error: {
// //       isError: false,
// //       errorMessage: ''
// //     }
// //   });
// // });

module.exports = router;