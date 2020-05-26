const express = require('express');
const tourControllers = require('../controllers/tourControllers');

const router = express.Router();

router
  .route('/top-5-cheap')
  .get(tourControllers.aliasTopTours, tourControllers.getAllTours);

router
  .route('/tour-stats')
  .get(tourControllers.getTourStats);

router
  .route('/monthly-plan/:year')
  .get(tourControllers.getMonthlyPlan);

router
  .route('/')
  .get(tourControllers.getAllTours)
  .post(tourControllers.createTour);

router
  .route('/:id')
  .get(tourControllers.getTour)
  .delete(tourControllers.deleteTour)
  .patch(tourControllers.updateTour);

module.exports = router;
