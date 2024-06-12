const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  name: String, // Changed from 'title' to 'name'
  image: String, // Image URL
  details: String, // Description or details
  youtube: String, // Embedded YouTube video code
  country: String,
  category: String,
  purchased_by:[""],
  likes: [],
  dislikes: [],
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
