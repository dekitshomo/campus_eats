const Order = require('../models/Order');
const MenuItem = require('../models/MenuItem');

exports.createOrder = async (req, res) => {
  const { itemId } = req.body;

  const item = await MenuItem.getMenuItemById(itemId);
  if (!item) {
    return res.status(400).send('Invalid menu item.');
  }

  const order = await Order.createOrder(item.id, item.price, req.session.user.id);
  res.redirect(`/orders/${order.id}`);
};

<<<<<<< HEAD
=======

>>>>>>> 7e7aab9f0c44566b32bfd8c8f30f8f7c3e7a83a3
exports.getOrder = async (req, res) => {
  const order = await Order.getOrderById(req.params.id);
  if (!order) {
    return res.status(404).send('Order not found.');
  }
  res.render('order_confirmation', { title: 'Order Confirmed', order });
};

<<<<<<< HEAD
=======

>>>>>>> 7e7aab9f0c44566b32bfd8c8f30f8f7c3e7a83a3
exports.updateOrder = async (req, res) => {
  const quantity = Math.max(1, parseInt(req.body.quantity, 10) || 1);
  await Order.updateQuantity(req.params.id, quantity);
  res.redirect(`/orders/${req.params.id}`);
};

<<<<<<< HEAD
=======

>>>>>>> 7e7aab9f0c44566b32bfd8c8f30f8f7c3e7a83a3
exports.cancelOrder = async (req, res) => {
  await Order.cancelOrder(req.params.id);
  res.redirect('/');
};
