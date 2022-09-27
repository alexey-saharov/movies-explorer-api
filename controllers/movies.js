const Movie = require('../models/movie');
const { MovieNotFound } = require('../errors/movieNotFound');
const { NoAccess } = require('../errors/noAccess');
const { CODE } = require('../utils/constants');
const { ApplicationError } = require('../errors/applicationError');
const { MovieDeleteError } = require('../errors/movieDeleteError');

const getMovies = (req, res, next) => Movie.find({ owner: req.user._id })
  .then((movies) => res.send(movies))
  .catch(() => {
    next(new ApplicationError());
  });

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: req.user._id,
  })
    .then((movie) => res.status(CODE.SUCCESS_CREATED).send(movie))
    .catch((err) => {
      if (err.code === 11000) {
        next(new ApplicationError(CODE.CONFLICT, err.message));
      } else if (err.name === 'ValidationError') {
        next(new ApplicationError(CODE.NOT_VALID_DATA, `Validation error - ${err.message}`));
      } else {
        next(new ApplicationError());
      }
    });
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .populate(['owner']) // movie.owner.id is used below
    .orFail(() => {
      throw new MovieNotFound();
    })
    .then((movie) => {
      if (movie.owner.id !== req.user._id) {
        throw new NoAccess();
      }
      return Movie.findByIdAndRemove(req.params.movieId)
        .orFail(() => {
          throw new MovieDeleteError();
        })
        .then(() => res.send({ message: 'Фильм удалён' }));
    })
    .catch((err) => {
      if (err.name === 'MovieNotFound' || err.name === 'NoAccess' || err.name === 'MovieDeleteError') {
        next(err);
      } else if (err.name === 'CastError') {
        next(new ApplicationError(CODE.NOT_VALID_DATA, `CastError - ${err.message}`));
      } else {
        next(new ApplicationError());
      }
    });
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
