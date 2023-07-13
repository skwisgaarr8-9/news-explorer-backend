const router = require('express').Router();
const auth = require('../middlewares/auth');
const {
  getArticles,
  addArticle,
  removeArticle,
} = require('../controllers/articles');

router.get('/', auth, getArticles);
router.post('/', auth, addArticle);
router.delete('/:articleId', auth, removeArticle);

module.exports = router;
