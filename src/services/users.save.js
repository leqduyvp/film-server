const { userSave } = require('../database/users');

module.exports = async (req, res) => {
  try {
    await userSave(req.body);
    res.status(201).send({
      error: {
        isError: false,
        errorMessage: {}
      }
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({
      error: {
        isError: true,
        errorMessage: {
          server: 'Save Error'
        }
      }
    });
  }
}