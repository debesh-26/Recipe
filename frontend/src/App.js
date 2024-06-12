import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import Recipes from './components/Recipes';
import AddRecipe from './components/AddRecipe';
import RecipeDetail from './components/RecipeDetail';
import PurchaseCoins from './components/PurchaseCoins';
import PrivateRoute from './utils/PrivateRoute';

const App = () => {
  return (
    <UserProvider>
      <Router>
        <div className="App">
          <Navbar />
          <ToastContainer />
          <Routes>
            <Route path="/" element={<HomePage />} />
            {/* <Route exact path="/recipes" element={<AllRecipes/>} /> */}
            <Route path="/recipes" element={<Recipes />} />
            <Route path="/add-recipe" element={<PrivateRoute component={AddRecipe} />} />
            <Route path="/recipe/:id" element={<PrivateRoute component={RecipeDetail} />} />
            <Route path="/purchase-coins" element={<PrivateRoute component={PurchaseCoins} />} />
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
};

export default App;
