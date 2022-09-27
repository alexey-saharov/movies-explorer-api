require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const cors = require('cors');
const { errors } = require('celebrate');
const { limiter } = require('./utils/limiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { CURRENT_DB_PATH } = require('./utils/configuration');
const { centralizedHandlerErrors } = require('./errors/centralizedHandlerErrors');

const options = {
  origin: [
    'http://localhost:3001',
    'https://movies.lexasaharov.nomorepartiesxyz.ru',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
  credentials: true,
};

const { PORT = 3000 } = process.env;
const app = express();

app.use(requestLogger);

app.use(limiter);

app.use(helmet());

mongoose.connect(CURRENT_DB_PATH);

app.use('*', cors(options));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(require('./routes/index'));

app.use(errorLogger);

app.use(errors());

app.use(centralizedHandlerErrors);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
