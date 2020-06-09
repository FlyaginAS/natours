const reviewController = require('../controllers/reviewController');
const express = require('express');
const  authController = require('../controllers/authController');

const router = express.Router({ mergeParams: true });
//работает для двух маршрутов- один из app.js друго из tourRouter.js
//POST /tour/25sdfs/reviews
//GET /tour/25sdfs/reviews
//POST /reviews
//только авторизованным юзерам любые действия
router.use(authController.protect);

router
  .route('/')
  .get(reviewController.getAllReviews)
  .post(
    authController.restrictTo('user'),
    reviewController.setTourUserIds,
    reviewController.createReview);

router.route('/:id')
  .get(reviewController.getReview)
  .delete(authController.restrictTo('user', 'admin'), reviewController.deleteReview)
  .patch(authController.restrictTo('user', 'admin'),  reviewController.updateReview);


module.exports = router;

