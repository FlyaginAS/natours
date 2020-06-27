const express = require('express');
const bookingController = require('../controllers/bookingController');
const  authController = require('../controllers/authController');

const router = express.Router();
//не соблюдаем именование rest так как  задача просто организовать сессию
router.get(
  '/checkout-session/:tourId',
  authController.protect,
  bookingController.getCheckoutSession
);
module.exports = router;

