const Restaurant = require('../models/Restaurant');
const MenuItem = require('../models/MenuItem');

exports.getMenuByRestaurant = async (req, res) => {
  const restaurantId = req.params.id;
  const restaurant = await Restaurant.getRestaurantById(restaurantId);

  if (!restaurant) {
    return res.status(404).send('Restaurant not found.');
  }

  const menuItems = await MenuItem.getMenuByRestaurant(restaurantId);
  res.render('menu', { title: `Menu — ${restaurant.name}`, restaurant, menuItems });
};
<<<<<<< HEAD
=======


>>>>>>> 7e7aab9f0c44566b32bfd8c8f30f8f7c3e7a83a3
