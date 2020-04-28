const express = require('express');
const articleController = require('../controllers/articleController');

const router = express.Router();
router.param('title', articleController.checkId);

router.route('/')
    .get(articleController.getAllArticles)
    .post(articleController.createArticle);
router.route('/:title')
    .get(articleController.getArticle)
    .patch(articleController.updateArticle)
    .delete(articleController.deleteArticle);

module.exports = router;