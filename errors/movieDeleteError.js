const { ApplicationError } = require('./applicationError');
const { CODE } = require('../utils/constants');

class CardDeleteError extends ApplicationError {
  constructor() {
    super(CODE.SERVER_ERROR, 'Ошибка удаления карточки');
  }
}

module.exports = { CardDeleteError };
