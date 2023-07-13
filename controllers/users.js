require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { ConflictError } = require('../utils/errors/ConflictError');
const { NotFoundError } = require('../utils/errors/NotFoundError');

const { JWT_SECRET } = process.env;

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new NotFoundError('No user with that id'))
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.createUser = (req, res, next) => {
  const { email, password, username } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ email, password: hash, username }))
    .then((user) => {
      const newUser = {
        username: user.username,
        email: user.email,
      };
      res.send({ data: newUser });
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError('Email already in use'));
      } else {
        next(err);
      }
    });
};

module.exports.loginUser = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: '1d',
      });
      res.send({ token });
    })
    .catch((err) => {
      next(err);
    });
};
