import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import './Recipes.css';


const RecipeCard = ({ recipe, useuser }) => {
  // const handleReaction = async (reaction) => {
  //   console.log(recipe);
  //   if (!useuser) {
  //     alert("Please log in to react to recipes.");
  //     return;
  //   }

  //   try {
  //     const response = await axios.post(`/api/recipes/${recipe._id}/reaction`, {
  //       email: useuser.email,
  //       reaction,
  //     });
  //     console.log("Reaction added/updated", response.data);
  //   } catch (error) {
  //     console.error("Error adding/updating reaction", error);
  //   }
  // };


  const [recipes, setRecipes] = useState([]);

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
      <h2>Recipes</h2>
      <div className="recipe-list">
        {recipes.map((recipe) => (
          <div key={recipe._id} className="recipe-card">
            <h3>{recipe.title}</h3>
            <p>{recipe.description}</p>
            <Link to={`/recipe/${recipe._id}/`}>View Details</Link>
          </div>
        ))}
      </div>
      {/* <button onClick={() => handleReaction("like")}>Like</button>
      <button onClick={() => handleReaction("dislike")}>Dislike</button> */}
    </div>
  );
};

export default RecipeCard;
