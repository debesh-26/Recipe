const express = require('express');
const { getRecipes, getRecipeById, addRecipe,addReaction ,getSuggestions} = require('../controllers/recipeController');
const router = express.Router();

router.get('/', getRecipes);
router.get('/:id', getRecipeById);
router.get('/suggestions', getSuggestions);
router.post('/', addRecipe);
router.post('/:id/reaction', addReaction);


module.exports = router;
