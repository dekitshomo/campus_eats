const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');
const { requireAuthApi } = require('../middleware/auth');

router.get('/restaurants', apiController.getRestaurants);
router.get('/restaurants/:id/menu', apiController.getRestaurantMenu);
router.get('/orders/:id', apiController.getOrder);
<<<<<<< HEAD
router.get('/stats', apiController.getStats);

=======
router.post('/orders', apiController.createOrder);
router.get('/stats', apiController.getStats);
>>>>>>> 7e7aab9f0c44566b32bfd8c8f30f8f7c3e7a83a3
router.post('/orders', requireAuthApi, apiController.createOrder);

module.exports = router;
