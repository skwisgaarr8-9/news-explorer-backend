const router = require('express').Router();
const auth = require('../middlewares/auth');
const {
  getArticles,
  addArticle,
  removeArticle,
} = require('../controllers/articles');
const {
  validateArticleInfoBody,
  validateArticleId,
} = require('../middlewares/validation');

router.get('/', auth, getArticles);
router.post('/', auth, validateArticleInfoBody, addArticle);
router.delete('/:articleId', auth, validateArticleId, removeArticle);

module.exports = router;
