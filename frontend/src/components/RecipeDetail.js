import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import './styles/RecipeDetail.css';
import { toast } from 'react-toastify';

const RecipeDetail = () => {
  const { user, setUser } = useContext(UserContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [showFullRecipe, setShowFullRecipe] = useState(false);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`/api/recipes/${id}`);
        setRecipe(response.data);
      } catch (error) {
        console.error('Error fetching recipe', error);
      }
    };

    fetchRecipe();
  }, [id]);
 
  const handleSpendCoins = async () => {
    if (user.coin < 10) {
      navigate('/purchase-coins');
      toast.error('Not Enough Coins');
      return;
    }

    try {
      const updatedUser = { ...user, coin: user.coin - 10 };
      await axios.post('/api/transactions/spend', { userId: user._id, amount: 10 });
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setShowFullRecipe(true);
    } catch (error) {
      console.error('Error spending coins', error);
    }
  };

  if (!recipe) return <div>Loading...</div>;

  return (
    <div className="recipe-detail">
      <h2>{recipe.name}</h2>
      <p>{recipe.description}</p>
      <h3>Instructions</h3>
      {showFullRecipe ? (
        <div>
          <p>{recipe.details}</p>
          <div className="youtube-frame">
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/VIDEO_ID"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      ) : (
        <button onClick={handleSpendCoins}>Spend 10 coins to view full recipe</button>
      )}
    </div>
  );
};

export default RecipeDetail;
