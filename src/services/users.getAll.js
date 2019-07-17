const { findUserById, getAllUser } = require('../database/users');

module.exports = async (req, res, next) => {
  try {
    const user = await findUserById(req.userId);
    if (user.accType !== 0) {
      return res.status(400).send({
        error: {
          isError: true,
          errorMessage: {
            authorization: 'This feature is only for admin account'
          }
        }
      });
    }
    const users = await getAllUser();
    res.send({
      error: {
        isError: false,
        errorMessage: {}
      },
      users
    });
  } catch (err) {
    res.status(500).send({
      error: {
        isError: true,
        errorMessage: {
          server: err.message
        }
      }
    })
  }

}
