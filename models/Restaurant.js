const db = require('../config/db');

<<<<<<< HEAD
=======

>>>>>>> 7e7aab9f0c44566b32bfd8c8f30f8f7c3e7a83a3
exports.getAllRestaurantsForAdmin = () => {
  return db.any('SELECT * FROM restaurants ORDER BY id');
};

exports.createRestaurantBySuperAdmin = ({ name, cuisine }) => {
  return db.one(
    'INSERT INTO restaurants (name, cuisine, rating) VALUES ($1, $2, 0) RETURNING *',
    [name, cuisine]
  );
};

exports.deactivateRestaurant = (id) => {
  return db.none('UPDATE restaurants SET is_active = false WHERE id = $1', [id]);
};
<<<<<<< HEAD
=======

>>>>>>> 7e7aab9f0c44566b32bfd8c8f30f8f7c3e7a83a3
exports.getAllRestaurants = () => {
  return db.any('SELECT * FROM restaurants WHERE is_active = true ORDER BY id');
};

<<<<<<< HEAD
=======

>>>>>>> 7e7aab9f0c44566b32bfd8c8f30f8f7c3e7a83a3
exports.getRestaurantById = (id) => {
  return db.oneOrNone(
    'SELECT * FROM restaurants WHERE id = $1 AND is_active = true',
    [id]
  );
};
<<<<<<< HEAD

exports.getRestaurantByOwnerId = (ownerId) => {
  return db.oneOrNone('SELECT * FROM restaurants WHERE owner_id = $1', [ownerId]);
};
=======
>>>>>>> 7e7aab9f0c44566b32bfd8c8f30f8f7c3e7a83a3
