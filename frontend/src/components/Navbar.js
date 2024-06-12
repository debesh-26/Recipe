import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, googleProvider } from '../firebase';
import { UserContext } from '../context/UserContext';
import { signInWithPopup } from 'firebase/auth';
import axios from 'axios';
import './styles/Navbar.css';

const Navbar = () => {
  axios.defaults.baseURL = 'https://recipe-production-a491.up.railway.app';
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  console.log(user);
  const login = async () => {
    try {
      const result = await signInWithPopup(auth,googleProvider);
      const token = await result.user.getIdToken();
      const userData = {
        displayName: result.user.displayName,
        photoURL: result.user.photoURL,
        email: result.user.email,
        coin: 50
      };
    

      const res = await axios.post('/api/auth/login', userData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(res.data.user);
      localStorage.setItem('token', token);
    } catch (error) {
      console.error("Error during sign-in", error);
    }
  };

  const logout = () => {
    auth.signOut().then(() => {
      setUser(null);
      navigate('/');
    }).catch(error => {
      console.error("Error during sign-out", error);
    });
  };

  return (
    <nav>
      <h1>Recipe Sharing</h1>
      <div>
        <button onClick={() => navigate('/')}>Home</button>
        <button onClick={() => navigate('/recipes')}>Recipes</button>
        {user ? (
          <div className="user-info">
            <button onClick={() => navigate('/add-recipe')}>Add Recipe</button>
            <button onClick={() => navigate('/purchase-coins')}>Coins: {user.coin}</button>
            <img src={user.photoURL} alt={user.displayName} />
            <button onClick={logout}>Logout</button>
          </div>
        ) : (
          <button onClick={login}>Login with Google</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
