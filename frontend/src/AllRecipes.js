import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import RecipeCard from './RecipeCard';
import { UserContext } from './context/UserContext';

const AllRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [category, setCategory] = useState('');
  const [country, setCountry] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const useuser=useContext(UserContext);

  useEffect(() => {
    fetchRecipes();
  }, [category, country, search, page]);

  const fetchRecipes = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/recipes', {
        params: { category, country, search, page },
      });
      setRecipes(response.data);
      setHasMore(response.data.length > 0);
    } catch (error) {
      console.error('Error fetching recipes', error);
    } finally {
      setLoading(false);
    }
  };
  console.log(recipes);
  const handleScroll = () => {
    if (!loading && hasMore && window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
      setPage(prevPage => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, hasMore]);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setPage(1);
    setRecipes([]);
  };

  const handleCountryChange = (e) => {
    setCountry(e.target.value);
    setPage(1);
    setRecipes([]);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
    setRecipes([]);
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Search recipes..."
          value={search}
          onChange={handleSearchChange}
        />
        <select onChange={handleCategoryChange} value={category}>
          <option value="">All Categories</option>
          <option value="Dessert">Dessert</option>
          <option value="Main Course">Main Course</option>
          {/* Add more categories as needed */}
        </select>
        <select onChange={handleCountryChange} value={country}>
          <option value="">All Countries</option>
          <option value="USA">USA</option>
          <option value="India">India</option>
          {/* Add more countries as needed */}
        </select>
      </div>
      <div>
        {recipes.map(recipe => (
          <RecipeCard key={recipe._id} recipe={recipe} useuser={useuser}/>
        ))}
      </div>
      {loading && <div>Loading...</div>}
    </div>
  );
};

export default AllRecipes;
