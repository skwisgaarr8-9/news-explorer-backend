const router = require('express').Router();
const auth = require('../middlewares/auth');
const { getCurrentUser } = require('../controllers/users');

router.get('/me', auth, getCurrentUser);

module.exports = router;
