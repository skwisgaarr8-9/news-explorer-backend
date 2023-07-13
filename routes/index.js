const router = require('express').Router();
const userRoutes = require('./users');
const { createUser, loginUser } = require('../controllers/users');

router.post('/signup', createUser);
router.post('/signin', loginUser);
router.use('/users', userRoutes);
module.exports = router;
