const express = require('express');
const mongoose = require('mongoose');
const { Restaurant } = require('./catalog');

const router = express.Router();

const orderSchema = new mongoose.Schema({
  userId: String,
  userName: String,
  restaurantId: String,
  restaurantName: String,
  items: [{ name: String, price: Number, quantity: Number }],
  total: Number,
  address: String,
  phone: String,
  payment: { type: String, default: 'Cash on delivery' },
  status: { type: String, default: 'Placed' },
  createdAt: { type: Date, default: Date.now },
});
const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);

router.post('/orders', async (req, res) => {
  try {
    const { userId, userName, restaurantId, items, address, phone } = req.body;
    if (!userId || !restaurantId || !Array.isArray(items) || !items.length || !address || !phone) {
      return res.status(400).json({ message: 'Please fill all details and add items' });
    }
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) return res.status(404).json({ message: 'Restaurant not found' });

    const lines = [];
    for (const it of items) {
      const dish = restaurant.menu.find((m) => m.name === it.name);
      if (!dish) return res.status(400).json({ message: `${it.name} is not on the menu` });
      const quantity = Math.max(1, Math.min(20, parseInt(it.quantity, 10) || 1));
      lines.push({ name: dish.name, price: dish.price, quantity });
    }
    const total = lines.reduce((sum, l) => sum + l.price * l.quantity, 0);

    const order = await Order.create({
      userId, userName, restaurantId, restaurantName: restaurant.name,
      items: lines, total, address, phone,
    });
    res.status(201).json({ message: 'Order placed', orderId: order._id, total });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/orders/user/:userId', async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = { router, Order };