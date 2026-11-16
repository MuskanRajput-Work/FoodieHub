const mongoose = require('mongoose');
const { Restaurant, Recipe } = require('./catalog');

const restaurants = [
  {
    name: 'Spice Route', cuisine: 'Indian', emoji: '🍛', rating: 4.5, deliveryTime: '30-40 min',
    description: 'North Indian classics from a clay oven.',
    menu: [
      { name: 'Butter Chicken', description: 'Creamy tomato gravy', price: 320, veg: false },
      { name: 'Paneer Tikka', description: 'Char-grilled cottage cheese', price: 260, veg: true },
      { name: 'Dal Makhani', description: 'Slow-cooked black lentils', price: 220, veg: true },
      { name: 'Garlic Naan', description: 'Fresh from the tandoor', price: 60, veg: true },
      { name: 'Hyderabadi Biryani', description: 'Fragrant rice with spices', price: 340, veg: false },
    ],
  },
  {
    name: 'Little Italy', cuisine: 'Italian', emoji: '🍝', rating: 4.4, deliveryTime: '35-45 min',
    description: 'Pizza and pasta made the traditional way.',
    menu: [
      { name: 'Margherita Pizza', description: 'Tomato, mozzarella, basil', price: 280, veg: true },
      { name: 'Penne Arrabbiata', description: 'Spicy tomato sauce', price: 260, veg: true },
      { name: 'Lasagna', description: 'Baked beef and cheese layers', price: 340, veg: false },
      { name: 'Tiramisu', description: 'Coffee-soaked dessert', price: 180, veg: true },
    ],
  },
  {
    name: 'Dragon Wok', cuisine: 'Chinese', emoji: '🥡', rating: 4.2, deliveryTime: '25-35 min',
    description: 'Wok-fired noodles, rice and starters.',
    menu: [
      { name: 'Veg Hakka Noodles', description: 'Stir-fried with vegetables', price: 200, veg: true },
      { name: 'Chicken Manchurian', description: 'Crispy chicken in tangy sauce', price: 280, veg: false },
      { name: 'Veg Spring Rolls', description: 'Crunchy and golden', price: 150, veg: true },
      { name: 'Hot & Sour Soup', description: 'Peppery and warming', price: 130, veg: true },
    ],
  },
  {
    name: 'Taco Fiesta', cuisine: 'Mexican', emoji: '🌮', rating: 4.3, deliveryTime: '30-40 min',
    description: 'Street-style tacos, bowls and snacks.',
    menu: [
      { name: 'Chicken Tacos', description: 'Three soft tacos with salsa', price: 220, veg: false },
      { name: 'Veg Burrito Bowl', description: 'Rice, beans, corn, guacamole', price: 240, veg: true },
      { name: 'Nachos with Salsa', description: 'Crisp chips and cheese', price: 180, veg: true },
      { name: 'Churros', description: 'Cinnamon sugar with chocolate dip', price: 140, veg: true },
    ],
  },
  {
    name: 'Sakura Sushi', cuisine: 'Japanese', emoji: '🍣', rating: 4.6, deliveryTime: '40-50 min',
    description: 'Fresh sushi, ramen and Japanese comfort food.',
    menu: [
      { name: 'Salmon Nigiri', description: 'Six pieces', price: 380, veg: false },
      { name: 'Veg Maki Roll', description: 'Cucumber and avocado', price: 260, veg: true },
      { name: 'Chicken Ramen', description: 'Rich broth with noodles', price: 360, veg: false },
      { name: 'Miso Soup', description: 'Tofu and seaweed', price: 120, veg: true },
    ],
  },
  {
    name: 'Bangkok Street', cuisine: 'Thai', emoji: '🍜', rating: 4.4, deliveryTime: '30-40 min',
    description: 'Sweet, sour and spicy Thai favourites.',
    menu: [
      { name: 'Pad Thai', description: 'Rice noodles with peanuts', price: 290, veg: true },
      { name: 'Green Curry', description: 'Coconut curry with vegetables', price: 310, veg: true },
      { name: 'Tom Yum Soup', description: 'Hot and sour broth', price: 190, veg: false },
      { name: 'Mango Sticky Rice', description: 'Sweet coconut dessert', price: 200, veg: true },
    ],
  },
];

const recipes = [
  {
    title: 'Paneer Butter Masala', cuisine: 'Indian', emoji: '🍛', time: '40 min', difficulty: 'Easy',
    ingredients: ['250g paneer', '3 tomatoes', '2 tbsp butter', '1/2 cup cream', '1 tsp garam masala', 'Salt to taste'],
    steps: [
      'Blend the tomatoes into a smooth puree.',
      'Melt butter in a pan and cook the puree with spices for 10 minutes.',
      'Add cream and cubed paneer and simmer for 5 minutes.',
      'Serve hot with naan or rice.',
    ],
  },
  {
    title: 'Spaghetti Aglio e Olio', cuisine: 'Italian', emoji: '🍝', time: '20 min', difficulty: 'Easy',
    ingredients: ['200g spaghetti', '5 garlic cloves', '4 tbsp olive oil', '1 tsp chilli flakes', 'Parsley', 'Salt'],
    steps: [
      'Boil the spaghetti in salted water until al dente.',
      'Gently fry sliced garlic in olive oil until golden.',
      'Add chilli flakes and a ladle of pasta water.',
      'Toss in the spaghetti and finish with parsley.',
    ],
  },
  {
    title: 'Veg Fried Rice', cuisine: 'Chinese', emoji: '🍚', time: '25 min', difficulty: 'Easy',
    ingredients: ['2 cups cooked rice', 'Carrot, beans, peas', '2 tbsp soy sauce', '1 tsp vinegar', 'Spring onions', 'Pepper'],
    steps: [
      'Heat oil on high and stir-fry the chopped vegetables.',
      'Add the cold cooked rice and toss well.',
      'Season with soy sauce, vinegar and pepper.',
      'Garnish with spring onions and serve.',
    ],
  },
  {
    title: 'Chicken Tacos', cuisine: 'Mexican', emoji: '🌮', time: '30 min', difficulty: 'Medium',
    ingredients: ['300g chicken strips', '6 small tortillas', '1 tsp taco seasoning', 'Lettuce and tomato', 'Salsa', 'Lime'],
    steps: [
      'Coat the chicken with taco seasoning and cook until browned.',
      'Warm the tortillas on a dry pan.',
      'Fill with chicken, lettuce and tomato.',
      'Top with salsa and a squeeze of lime.',
    ],
  },
];

mongoose
  .connect('mongodb://127.0.0.1:27017/foodiehub')
  .then(async () => {
    await Restaurant.deleteMany({});
    await Recipe.deleteMany({});
    await Restaurant.insertMany(restaurants);
    await Recipe.insertMany(recipes);
    console.log('Seeded', restaurants.length, 'restaurants and', recipes.length, 'recipes');
    process.exit(0);
  })
  .catch((err) => {
    console.log('Seed error:', err.message);
    process.exit(1);
  });