const { ApplicationError } = require('./applicationError');
const { CODE } = require('../utils/constants');

class MovieNotFound extends ApplicationError {
  constructor() {
    super(CODE.NOT_FOUND, 'Movie not found');
  }
}

module.exports = { MovieNotFound };
