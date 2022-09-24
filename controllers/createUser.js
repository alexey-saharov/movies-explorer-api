const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { CODE } = require('../utils/constants');
const { ApplicationError } = require('../errors/applicationError');

const createUser = (req, res, next) => {
  const reqUser = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };

  bcrypt.hash(reqUser.password, 10)
    .then((hash) => User.create({ ...reqUser, password: hash })
      .then((user) => {
        const { name, email } = user;
        res.status(CODE.SUCCESS_CREATED).send({ name, email });
      }))
    .catch((err) => {
      if (err.name === 'UserAlreadyExist') {
        next(err);
      } else if (err.code === 11000) {
        next(new ApplicationError(CODE.CONFLICT, err.message));
      } else if (err.name === 'ValidationError') {
        next(new ApplicationError(CODE.NOT_VALID_DATA, `Validation error - ${err.message}`));
      } else {
        next(new ApplicationError());
      }
    });
};

module.exports = { createUser };
