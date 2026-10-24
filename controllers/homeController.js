const Restaurant = require('../models/Restaurant');
const Order = require('../models/Order');

exports.getHome = async (req, res) => {
  const restaurants = await Restaurant.getAllRestaurants();
  const stats = await Order.getStats();
  const popularItems = await Order.getPopularItems();
  res.render('index', { title: 'Campus Eats', restaurants, stats, popularItems });
};
<<<<<<< HEAD
=======


>>>>>>> 7e7aab9f0c44566b32bfd8c8f30f8f7c3e7a83a3
