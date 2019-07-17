const findUserByCredentials = require('../database/users.findByCredentials');
const generateToken = require('../services/token.generate');

const validCredentials = (req) => {
  if (!req.body.email || !req.body.password)
    return {
      error: {
        isError: true,
        errorMessage: {
          credentials: 'Email or password is missing'
        }
      }
    };
}



module.exports = async (req, res, next) => {
  const invalid = validCredentials(req);
  if (invalid) {
    return res.status(400).send(valid);
  }
  try {
    const user = await findUserByCredentials(req.body.email, req.body.password);
    if (user.error) {
      return res.status(400).send({ error: user.error });
    }
    const platform = req.get('platform');
    generateToken(user._id, platform, res);
  } catch (e) {
    console.log(e.message);
    res.status(500).send({
      error: {
        isError: true,
        errorMessage: {
          server: e.message
        }
      }
    })
  }
}