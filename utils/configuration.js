const { NODE_ENV, JWT_SECRET, DB_PATH } = process.env;
const CURRENT_JWT_SECRET = NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret';
const CURRENT_DB_PATH = NODE_ENV === 'production' ? DB_PATH : 'mongodb://localhost:27017/dev-moviesdb';

module.exports = {
  CURRENT_JWT_SECRET,
  CURRENT_DB_PATH,
};
