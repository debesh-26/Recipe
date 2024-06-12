import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="homepage">
      <div className="banner">
        <h2>Welcome to Recipe Sharing</h2>
        <p>Discover and share amazing recipes!</p>
        <div className="banner-buttons">
          <button onClick={() => navigate('/recipes')}>View Recipes</button>
          <button onClick={() => navigate('/add-recipe')}>Add Recipe</button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
