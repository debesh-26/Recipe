import React, { createContext, useState, useEffect } from 'react';
import { auth } from '../firebase';
import axios from 'axios';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  axios.defaults.baseURL = 'https://recipe-production-a491.up.railway.app';

  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const token = await user.getIdToken();
        const res = await axios.post('/api/auth/login', {
          displayName: user.displayName,
          photoURL: user.photoURL,
          email: user.email,
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(res.data.user);
        localStorage.setItem('token', token);
      } else {
        setUser(null);
        localStorage.removeItem('token');
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
 