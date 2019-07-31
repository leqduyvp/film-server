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
  res.status(400).send({
    error: {
      isError: true,
      errorMessage: {
        database: 'User not available for delete'
      }
    }
  });
}

const deleteValid = async (req, res) => {
  const user = JSON.parse(await findUserById(req.userId));
  if (user.error) {
    userNotAvailableResponse(res);
    return false;
  }
  if (user._id != req.query.id && user.accType != 0) {
    res.status(400).send({
      error: {
        isError: true,
        errorMessage: {
          authorization: "Do not have permission to delete this account"
        }
      }
    });
    return false;
  }
  return true;
}

module.exports = async (req, res, next) => {
  try {
    const valid = await deleteValid(req, res);
    if (!valid) return;
    const deletedUser = await deleteUser(req.query.id);
    if (deletedUser.deletedCount) return sendSuccessResponse(res);
    else return userNotAvailableResponse(res);
  } catch (err) { handleServerError(err, res); }
}