const Restaurant = require('../models/Restaurant');
const MenuItem = require('../models/MenuItem');
const Feedback = require('../models/Feedback');
<<<<<<< HEAD

=======
>>>>>>> 7e7aab9f0c44566b32bfd8c8f30f8f7c3e7a83a3
exports.dashboard = async (req, res) => {
  const restaurant = await Restaurant.getRestaurantByOwnerId(req.session.user.id);
  if (!restaurant) {
    return res.render('admin-dashboard', { title: 'My Dashboard', restaurant: null, items: [], feedback: [] });
  }
  const items = await MenuItem.getMenuByRestaurant(restaurant.id);
  const feedback = await Feedback.getFeedbackForRestaurant(restaurant.id);
  res.render('admin-dashboard', { title: 'My Dashboard', restaurant, items, feedback });
};

exports.addMenuItem = async (req, res) => {
  const restaurant = await Restaurant.getRestaurantByOwnerId(req.session.user.id);
  const { name, price } = req.body;
  if (!restaurant || !name || !price || Number(price) <= 0) {
    return res.redirect('/admin/dashboard');
  }
  await MenuItem.createMenuItem({ restaurantId: restaurant.id, name, price: Number(price) });
  res.redirect('/admin/dashboard');
};
<<<<<<< HEAD
=======

>>>>>>> 7e7aab9f0c44566b32bfd8c8f30f8f7c3e7a83a3
