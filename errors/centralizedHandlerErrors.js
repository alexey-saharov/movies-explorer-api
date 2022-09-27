const { CODE } = require('../utils/constants');

const centralizedHandlerErrors = (err, req, res, next) => {
  if (!err.status) {
    res.status(CODE.SERVER_ERROR).send({ message: 'Internal server error' });
  } else {
    res.status(err.status).send({ message: err.message });
  }
  next();
};

module.exports = { centralizedHandlerErrors };
