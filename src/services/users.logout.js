// const handleRedisError = (err, res) => {
//   res.status(500).send({
//     error: {
//       isError: true,
//       errorMessage: {
//         server: err.message
//       }
//     }
//   });
// }

module.exports = (req, res, next) => {
  // req.client.DEL(req.tokenKey, (err, reply) => {
  //   if (err) { return handleRedisError(err, res); }
  //   if (reply === 0) {
  //     return res.status(400).send({
  //       error: {
  //         isError: true,
  //         errorMessage: {
  //           token: 'Token has been removed'
  //         }
  //       }
  //     })
  //   }
  res.send({
    error: {
      isError: false,
      errorMessage: {}
    }
  });
}