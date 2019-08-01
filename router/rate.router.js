const express = require('express');
const router = new express.Router();
const authToken = require('../service/token.auth');
const rateFilm = require('../service/rate.rateFilm');
// const changeRate = require('../services/rate.changeRate');
const rateValid = require('../service/rate.valid');

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