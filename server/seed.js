require('dotenv').config();
const mongoose = require('mongoose');
const { Restaurant } = require('./catalog');

const items = (list) =>
  list.map(([name, description, price, veg]) => ({ name, description, price, veg }));

const restaurants = [
  { name: 'Tandoor Tales', cuisine: 'North Indian', emoji: '🍛', image: 'tandoor-tales.jpg', area: 'Civil Lines', costForTwo: 600, rating: 4.4, deliveryTime: '30-35 min', offer: '20% OFF up to ₹100', description: 'Smoky tandoori kebabs, rich gravies and fresh naan.',
    menu: items([
      ['Butter Chicken', 'Creamy tomato gravy with tender chicken', 320, false],
      ['Dal Makhani', 'Slow-cooked black lentils with butter', 220, true],
      ['Paneer Tikka', 'Charred cottage cheese with mint chutney', 260, true],
      ['Garlic Naan', 'Soft tandoor bread with garlic', 50, true],
      ['Chicken Biryani', 'Fragrant rice layered with spiced chicken', 290, false],
      ['Gulab Jamun', 'Warm milk dumplings in sugar syrup', 80, true],
    ]) },
  { name: 'Crust & Co.', cuisine: 'Italian', emoji: '🍕', image: 'crust-and-co.jpg', area: 'Rampur Garden', costForTwo: 500, rating: 4.3, deliveryTime: '25-30 min', offer: 'Free delivery', description: 'Wood-fired style pizzas and creamy pastas.',
    menu: items([
      ['Margherita Pizza', 'Classic tomato, mozzarella and basil', 249, true],
      ['Farmhouse Pizza', 'Loaded with fresh vegetables and cheese', 349, true],
      ['Pepperoni Pizza', 'Spicy pepperoni with extra cheese', 399, false],
      ['Penne Alfredo', 'Creamy white sauce pasta', 289, true],
      ['Garlic Bread', 'Toasted with herb butter', 129, true],
      ['Tiramisu', 'Coffee-soaked layered dessert', 160, true],
    ]) },
  { name: 'Wok Express', cuisine: 'Chinese', emoji: '🥡', image: 'wok-express.jpg', area: 'Pilibhit Bypass', costForTwo: 450, rating: 4.1, deliveryTime: '30-40 min', offer: '₹75 OFF above ₹349', description: 'Indo-Chinese favourites cooked fresh on high flame.',
    menu: items([
      ['Veg Hakka Noodles', 'Stir-fried noodles with crunchy veggies', 179, true],
      ['Chilli Chicken', 'Spicy battered chicken with peppers', 249, false],
      ['Veg Manchurian', 'Crispy balls in tangy gravy', 199, true],
      ['Schezwan Fried Rice', 'Fiery rice with schezwan sauce', 189, true],
      ['Spring Rolls', 'Crispy rolls with sweet chilli dip', 149, true],
      ['Hot & Sour Soup', 'Peppery tangy soup', 119, true],
    ]) },
  { name: 'Biryani Junction', cuisine: 'Biryani', emoji: '🍚', image: 'biryani-junction.jpg', area: 'Izzatnagar', costForTwo: 550, rating: 4.5, deliveryTime: '35-45 min', offer: '30% OFF up to ₹120', description: 'Dum-cooked biryanis sealed and served hot.',
    menu: items([
      ['Chicken Dum Biryani', 'Hyderabadi style, slow cooked', 280, false],
      ['Veg Dum Biryani', 'Vegetables and saffron rice', 220, true],
      ['Mutton Biryani', 'Tender mutton with long-grain rice', 380, false],
      ['Chicken 65', 'Spicy fried chicken bites', 220, false],
      ['Burani Raita', 'Garlic yoghurt dip', 40, true],
      ['Double Ka Meetha', 'Bread pudding with rabri', 90, true],
    ]) },
  { name: 'Chaat Gali', cuisine: 'Street Food', emoji: '🥙', image: 'chaat-gali.jpg', area: 'Subhash Nagar', costForTwo: 250, rating: 4.2, deliveryTime: '20-25 min', offer: 'Flat ₹50 OFF', description: 'Tangy, crunchy chaat and street snacks.',
    menu: items([
      ['Aloo Tikki Chaat', 'Crispy potato patties with chutneys', 80, true],
      ['Pani Puri', 'Crisp puris with spicy mint water', 60, true],
      ['Dahi Bhalla', 'Lentil dumplings in sweet yoghurt', 90, true],
      ['Samosa', 'Two crispy samosas with chutney', 40, true],
      ['Chole Bhature', 'Spiced chickpeas with fluffy bread', 120, true],
      ['Kulfi Falooda', 'Chilled kulfi with falooda', 110, true],
    ]) },
  { name: 'Burger Barn', cuisine: 'Fast Food', emoji: '🍔', image: 'burger-barn.jpg', area: 'Civil Lines', costForTwo: 400, rating: 4.0, deliveryTime: '20-30 min', offer: 'Buy 1 Get 1 on shakes', description: 'Juicy burgers, loaded fries and thick shakes.',
    menu: items([
      ['Classic Veg Burger', 'Crispy patty with fresh lettuce', 119, true],
      ['Chicken Zinger Burger', 'Crunchy fried chicken fillet', 179, false],
      ['Peri Peri Fries', 'Fries with spicy seasoning', 99, true],
      ['Cheese Loaded Fries', 'Fries with melted cheese sauce', 129, true],
      ['Chocolate Shake', 'Thick chocolate milkshake', 140, true],
      ['Cold Coffee', 'Iced coffee with ice cream', 110, true],
    ]) },
  { name: 'Taco Town', cuisine: 'Mexican', emoji: '🌮', image: 'taco-town.jpg', area: 'Rampur Garden', costForTwo: 500, rating: 4.2, deliveryTime: '30-35 min', offer: '₹100 OFF above ₹499', description: 'Tacos, burrito bowls and crunchy nachos.',
    menu: items([
      ['Veg Tacos', 'Beans, corn and salsa in soft shells', 160, true],
      ['Chicken Tacos', 'Grilled chicken with creamy sauce', 190, false],
      ['Nachos with Salsa', 'Crispy chips with cheese and salsa', 150, true],
      ['Burrito Bowl', 'Rice, beans, veggies and guacamole', 230, true],
      ['Churros', 'Cinnamon sugar dough sticks', 120, true],
    ]) },
  { name: 'Tokyo Bites', cuisine: 'Japanese', emoji: '🍣', image: 'tokyo-bites.jpg', area: 'Bishop Conrad Road', costForTwo: 800, rating: 4.4, deliveryTime: '40-50 min', offer: '15% OFF', description: 'Sushi rolls, ramen and miso soup.',
    menu: items([
      ['Veg Sushi Roll', 'Cucumber, avocado and carrot', 280, true],
      ['California Roll', 'Crab, cucumber and avocado', 320, false],
      ['Veg Ramen', 'Noodle soup with mushrooms and greens', 260, true],
      ['Miso Soup', 'Warm soybean broth with tofu', 140, true],
    ]) },
  { name: 'Sattvik Thali', cuisine: 'Indian', emoji: '🍽️', image: 'sattvik-thali.jpg', area: 'Subhash Nagar', costForTwo: 450, rating: 4.5, deliveryTime: '25-35 min', offer: '₹100 OFF above ₹399', description: 'Pure vegetarian thalis and Indian sweets.',
    menu: items([
      ['Veg Thali', 'Dal, sabzi, roti, rice and sweet', 240, true],
      ['Paneer Butter Masala', 'Rich tomato gravy', 260, true],
      ['Rajma Chawal', 'Kidney beans with steamed rice', 160, true],
      ['Gulab Jamun', 'Warm syrupy dessert', 90, true],
      ['Masala Chai', 'Spiced milk tea', 40, true],
    ]) },
  { name: 'Mithai Mahal', cuisine: 'Desserts', emoji: '🍰', image: 'mithai-mahal.jpg', area: 'Civil Lines', costForTwo: 350, rating: 4.3, deliveryTime: '20-30 min', offer: 'Free sweet box above ₹499', description: 'Fresh Indian sweets, cakes and desserts.',
    menu: items([
      ['Kaju Katli (250g)', 'Cashew fudge squares', 300, true],
      ['Jalebi (250g)', 'Crispy spirals soaked in syrup', 100, true],
      ['Rasmalai', 'Soft cheese discs in saffron milk', 140, true],
      ['Motichoor Ladoo (250g)', 'Boondi ladoo with ghee', 120, true],
      ['Rabri Falooda', 'Chilled falooda with thick rabri', 130, true],
    ]) },
];

(async () => {
  await mongoose.connect(process.env.MONGO_URI);
  await Restaurant.deleteMany({});
  await Restaurant.insertMany(restaurants);
  console.log(`Seeded ${restaurants.length} restaurants`);
  await mongoose.disconnect();
})();