const { emailValidator, nameValidator, passwordValidator, accTypeValidator } = require('./body.valid');

const valid = async (user, error) => {
  await emailValidator(user, error);
  nameValidator(user, error);
  passwordValidator(user, error);
  await accTypeValidator(user, error);
}

module.exports = async (req, res, next) => {
  try {
    const error = { isError: false, errorMessage: {} };
    if (req.header('access-token')) req.body.token = req.header('access-token');
    await valid(req.body, error);
    if (error.isError) {
      return res.status(400).send({ error });
    }
    next();
  } catch (error) {
    console.log(error.message);
    res.status(500).send({
      error: {
        isError: true,
        errorMessage: {
          server: 'Valid Error'
        }
      }
    });
  }
}

// Lay token o dau de tao acc Admin ?
