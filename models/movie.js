const mongoose = require('mongoose');
const { LINK_REGEXP } = require('../utils/constants');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return v === v.match(LINK_REGEXP)[0];
      },
      message: 'Некорректная ссылка на постер к фильму',
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return v === v.match(LINK_REGEXP)[0];
      },
      message: 'Некорректная ссылка на трейлер фильма',
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return v === v.match(LINK_REGEXP)[0];
      },
      message: 'Некорректная ссылка на миниатюрное изображение постера к фильму',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

movieSchema.index({ owner: 1, movieId: 1 }, { unique: true });

module.exports = mongoose.model('movie', movieSchema);
