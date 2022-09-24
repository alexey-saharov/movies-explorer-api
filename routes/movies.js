const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { LINK_REGEXP, MONGO_ID_REGEXP } = require('../utils/constants');

const method = (value) => {
  if (value !== value.match(MONGO_ID_REGEXP)[0]) {
    throw new Error('invalid movieId');
  }
  return value;
};

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

router.get('/', getMovies);

router.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(LINK_REGEXP),
    trailerLink: Joi.string().required().pattern(LINK_REGEXP),
    thumbnail: Joi.string().required().pattern(LINK_REGEXP),
    movieId: Joi.string().custom(method, 'custom validation'),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
}), createMovie);

router.delete('/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().custom(method, 'custom validation'),
  }),
}), deleteMovie);

module.exports = router;
