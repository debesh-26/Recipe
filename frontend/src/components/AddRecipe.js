import React, { useContext, useState } from 'react';
import axios from 'axios';
import './styles/AddRecipe.css'
import { Navigate, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const AddRecipe = () => {
  axios.defaults.baseURL = 'https://recipe-production-a491.up.railway.app';
  const user=useContext(UserContext)
  console.log(user);
  const navigate=useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    details: '',
    youtube: '',
    country: '',
    category: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/recipes', {
        ...formData,
        watchCount: 0,
        purchased_by: [user.user.email]
      });
      console.log('Recipe added successfully', response.data);
      navigate('/')
    } catch (error) {
      console.error('Error adding recipe', error);
    }
  };

  return (
    <div className="form-container">
      <h2>Add Recipe</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Recipe Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Recipe Image:</label>
          <input type="file" name="image" onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Recipe Details:</label>
          <textarea name="details" value={formData.details} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Embedded Youtube Video Code:</label>
          <input type="text" name="youtube" value={formData.youtube} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Country:</label>
          <input type="text" name="country" value={formData.country} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Category:</label>
          <select name="category" value={formData.category} onChange={handleChange}>
            <option value="">Select Category</option>
            <option value="Dessert">Dessert</option>
            <option value="Main Course">Main Course</option>
          </select>
        </div>
        <button type="submit">Add Recipe</button>
      </form>
    </div>
  );
};

export default AddRecipe;
