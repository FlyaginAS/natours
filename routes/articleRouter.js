const express = require('express');
const articleController = require('../controllers/articleController');



const articleRouter = express.Router();
articleRouter.route('/')
    .get(articleController.getAllArticles)
    .post(articleController.createArticle);
articleRouter.route('/:title')
    .get(articleController.getArticle)
    .patch(articleController.updateArticle)
    .delete(articleController.deleteArticle);

module.exports = articleRouter;