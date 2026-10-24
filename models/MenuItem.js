const db = require('../config/db');

exports.getMenuByRestaurant = (restaurantId) => {
  return db.any('SELECT * FROM menu_items WHERE restaurant_id = $1 ORDER BY id', [restaurantId]);
};

exports.getMenuItemById = (id) => {
  return db.oneOrNone('SELECT * FROM menu_items WHERE id = $1', [id]);
};
<<<<<<< HEAD

exports.createMenuItem = ({ restaurantId, name, price }) => {
  return db.one(
    'Insert INTO menu_items (restaurantId, name, price) VALUES ($1, $2, $3) RETURNING *',
    [restaurantId, name, price]
  );
};
=======
>>>>>>> 7e7aab9f0c44566b32bfd8c8f30f8f7c3e7a83a3
