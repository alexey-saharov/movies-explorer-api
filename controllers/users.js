const User = require('../models/user');
const { UserNotFound } = require('../errors/userNotFound');
const { ApplicationError } = require('../errors/applicationError');
const { CODE } = require('../utils/constants');

const getUserMe = (req, res, next) => User.findById(req.user._id)
  .orFail(() => {
    throw new UserNotFound();
  })
  .then((user) => res.send(user))
  .catch((err) => {
    if (err.name === 'UserNotFound') {
      next(err);
    } else {
      next(new ApplicationError());
    }
  });

const updateUser = (req, res, next) => {
  const { email, name } = req.body;
  User.findByIdAndUpdate(req.user._id, { email, name }, { new: true, runValidators: true })
    .orFail(() => {
      throw new UserNotFound();
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'UserNotFound') {
        next(err);
      } else if (err.name === 'CastError') {
        next(new ApplicationError(CODE.NOT_VALID_DATA, `CastError - ${err.message}`));
      } else if (err.name === 'ValidationError') {
        next(new ApplicationError(CODE.NOT_VALID_DATA, `Validation error - ${err.message}`));
      } else {
        next(new ApplicationError());
      }
    });
};

module.exports = {
  getUserMe,
  updateUser,
};
