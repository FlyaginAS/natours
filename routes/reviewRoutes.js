const reviewController = require('../controllers/reviewController');
const express = require('express');
const  authController = require('../controllers/authController');

const router = express.Router({ mergeParams: true });
//работает для двух маршрутов- один из app.js друго из tourRouter.js
//POST /tour/25sdfs/reviews
//POST /reviews
router
  .route('/')
  .get(reviewController.getAllReviews)
  .post(
    authController.protect,
    authController.restrictTo('user'),
    reviewController.createReview);


module.exports = router;

