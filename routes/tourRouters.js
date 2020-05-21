const express = require('express');
const tourControllers = require('../controllers/tourControllers');

const router = express.Router();
router.param('id', tourControllers.checkID);

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