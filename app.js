require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { errors, celebrate, Joi } = require('celebrate');
const { login } = require('./controllers/login');
const { createUser } = require('./controllers/createUser');
const { auth } = require('./middlewares/auth');
const usersRouter = require('./routes/users');
const moviesRouter = require('./routes/movies');
const incorrectRouter = require('./routes/incorrectUrl');
// const { requestLogger, errorLogger } = require('./middlewares/logger');
const { CODE } = require('./utils/constants');

// исправить 2ой url
const options = {
  origin: [
    'http://localhost:3001',
    'https://mesto.lexasaharov.nomoredomains.sbs',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
  credentials: true,
};

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/bitfilmsdb');

app.use('*', cors(options));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.use(requestLogger);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().required().min(2).max(30),
  }),
}), createUser);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

app.use(auth);

app.use('/users', usersRouter);
app.use('/movies', moviesRouter);

app.use('/', incorrectRouter);

// app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  if (!err.status) {
    res.status(CODE.SERVER_ERROR).send({ message: 'Internal server error' });
  } else {
    res.status(err.status).send({ message: err.message });
  }
  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
