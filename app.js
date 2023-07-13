const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const { errors } = require('celebrate');

const routes = require('./routes/index');
const { handleError } = require('./utils/handleError');
const { limiter } = require('./utils/rateLimiter');

const { PORT = 3001 } = process.env;
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/newsexplorer_db');

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(helmet());
app.use(limiter);

app.use(routes);
app.use(handleError);

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
