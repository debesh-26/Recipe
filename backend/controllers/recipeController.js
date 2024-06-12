const Recipe = require('../models/Recipe');

const getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching recipe', error });
  }
};

const addRecipe = async (req, res) => {
  try {
    const { name, image, details,youtube,country,category, userId } = req.body;
    const recipe = new Recipe({ name, image, details,youtube,country,category, userId });
    await recipe.save();
    res.status(201).json(recipe);
  } catch (error) {
    res.status(500).json({ message: 'Error adding recipe', error });
  }
};

const addReaction = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, reaction } = req.body; // reaction can be 'like' or 'dislike'
    
    console.log(req.body);
    console.log('Received email:', email);

    // Validate email and reaction
    if (!email || !reaction || !['like', 'dislike'].includes(reaction)) {
      console.error('Invalid payload', { email, reaction });
      return res.status(400).json({ message: 'Invalid payload' });
    }

    const recipe = await Recipe.findById(id);
    if (!recipe) {
      console.error('Recipe not found:', id);
      return res.status(404).json({ message: 'Recipe not found' });
    }

    // Update likes or dislikes based on reaction
    if (reaction === 'like') {
      if (!recipe.likes.includes(email)) {
        recipe.likes.push(email);
        recipe.dislikes = recipe.dislikes.filter(user => user !== email);
      }
    } else {
      if (!recipe.dislikes.includes(email)) {
        recipe.dislikes.push(email);
        recipe.likes = recipe.likes.filter(user => user !== email);
      }
    }

    await recipe.save();
    res.status(200).json({ message: 'Reaction added/updated', recipe });
  } catch (error) {
    console.error('Error adding/updating reaction:', error);
    res.status(500).json({ message: 'Failed to add/update reaction' });
  }
};



const getRecipes = async (req, res) => {
  const { category, country, search, page } = req.query;
  const query = {};

  if (category) query.category = category;
  if (country) query.country = country;
  if (search) query.name = { $regex: search, $options: 'i' }; // Case-insensitive search

  const limit = 10; // Number of recipes per page
  const skip = (page - 1) * limit;

  try {
    const recipes = await Recipe.find(query).skip(skip).limit(limit);
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching recipes', error });
  }
};

const getSuggestions = async (req, res) => {
  try {
    const { category, country } = req.query;
    let filter = {};

    if (category) {
      filter.category = category;
    }
    if (country) {
      filter.country = country;
    }

    const recipes = await Recipe.find(filter).limit(5); // Limit the number of suggestions
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch suggestions', error });
  }
};

module.exports = { getRecipes, getRecipeById, addRecipe,addReaction,getSuggestions };
