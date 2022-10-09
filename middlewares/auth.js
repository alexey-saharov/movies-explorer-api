const jwt = require('jsonwebtoken');
const { CURRENT_JWT_SECRET } = require('../utils/configuration');
const { NotAuthorized } = require('../errors/notAuthorized');

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new NotAuthorized());
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, CURRENT_JWT_SECRET);
  } catch {
    return next(new NotAuthorized());
  }

  req.user = payload;

  return next();
};

module.exports = { auth };
