const jwt = require('jsonwebtoken');
const { CURRENT_JWT_SECRET } = require('../utils/configuration');
const { CODE } = require('../utils/constants');
const User = require('../models/user');
const { ApplicationError } = require('../errors/applicationError');

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, CURRENT_JWT_SECRET, { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(() => {
      next(new ApplicationError(CODE.NOT_AUTHORIZED, 'Неправильная почта или пароль'));
    });
};

module.exports = { login };
