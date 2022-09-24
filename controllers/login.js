const jwt = require('jsonwebtoken');
const { CURRENT_JWT_SECRET } = require('../utils/constants');
const User = require('../models/user');

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, CURRENT_JWT_SECRET, { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(next);
};

module.exports = { login };
