import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './styles/Recipes.css';
import { UserContext } from '../context/UserContext';

const Recipes = () => {
  axios.defaults.baseURL = 'https://recipe-production-a491.up.railway.app';

  const [recipes, setRecipes] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get('/api/recipes');
        setRecipes(response.data);
      } catch (error) {
        console.error('Error fetching recipes', error);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <div className="recipes">
      <h2>All Recipes</h2>
      <div className="recipe-list">
        {recipes.map((recipe) => (
          <div key={recipe._id} className="recipe-card">
            <h3>{recipe.name}</h3>
            <img src={recipe.image} alt={recipe.name} className="recipe-image" />
            <p><strong>Purchased by:</strong> {recipe.purchased_by}</p>
            <p><strong>Creator:</strong> {user.user.displayName}</p>
            <p><strong>Country:</strong> {recipe.country}</p>
            <Link to={`/recipe/${recipe._id}`}>View The Recipe</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recipes;
