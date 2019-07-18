const { findUserById, deleteUser } = require('../database/users');

const handleServerError = (err, res) => {
  res.status(500).send({
    error: {
      isError: true,
      errorMessage: {
        server: err.message
      }
    }
  });
}

const sendSuccessResponse = (res) => {
  res.send({
    error: {
      isError: false,
      errorMessage: {}
    }
  });
}

const userNotAvailableResponse = (res) => {
  return res.status(400).send({
    error: {
      isError: true,
      errorMessage: {
        database: 'User not available for delete'
      }
    }
  });
}

const deleteValid = async (req, res) => {
  const user = await findUserById(req.userId);
  if (user.error) return userNotAvailableResponse(res);
  if (user._id != req.query.id && user.accType != 0) {
    return res.status(400).send({
      error: {
        isError: true,
        errorMessage: {
          authorization: "Do not have permission to delete this account"
        }
      }
    });
  }
}

module.exports = async (req, res, next) => {
  try {
    await deleteValid(req, res);
    const deletedUser = await deleteUser(req.query.id);
    if (deletedUser.deletedCount) return sendSuccessResponse(res);
    else return userNotAvailableResponse(res);
  } catch (err) { return handleServerError(err, res); }
}