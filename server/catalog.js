const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Restaurant = mongoose.model(
  'Restaurant',
  new mongoose.Schema({
    name: String,
    cuisine: String,
    emoji: String,
    rating: Number,
    deliveryTime: String,
    description: String,
    offer: String,
    menu: [{ name: String, description: String, price: Number, veg: Boolean }],
  })
);

const Recipe = mongoose.model(
  'Recipe',
  new mongoose.Schema({
    title: String,
    cuisine: String,
    emoji: String,
    time: String,
    difficulty: String,
    ingredients: [String],
    steps: [String],
  })
);

const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

router.get('/cuisines', async (req, res) => {
  try {
    res.json(await Restaurant.distinct('cuisine'));
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/restaurants', async (req, res) => {
  try {
    const { cuisine, search } = req.query;
    const filter = {};
    if (cuisine && cuisine !== 'All') filter.cuisine = cuisine;
    if (search) filter.name = new RegExp(escapeRegex(search), 'i');
    res.json(await Restaurant.find(filter));
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/restaurants/:id', async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    const item = await Restaurant.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Restaurant not found' });
    res.json(item);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/recipes', async (req, res) => {
  try {
    const { cuisine } = req.query;
    const filter = cuisine && cuisine !== 'All' ? { cuisine } : {};
    res.json(await Recipe.find(filter));
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/recipes/:id', async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    const item = await Recipe.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Recipe not found' });
    res.json(item);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = { router, Restaurant, Recipe };