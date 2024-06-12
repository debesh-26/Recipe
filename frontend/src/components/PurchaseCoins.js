import React, { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import './styles/PurchaseCoins.css';

const PurchaseCoins = () => {
  const { user, setUser } = useContext(UserContext);
  const [amount, setAmount] = useState('');

  const handlePurchase = async () => {
    const coinPackages = {
      '1': 100,
      '5': 500,
      '10': 1000,
    };

    const coins = coinPackages[amount];
    if (!coins) {
      alert('Invalid amount!');
      return;
    }

    try {
      await axios.post('/api/transactions/purchase', { userId: user._id, amount, coins });
      const updatedUser = { ...user, coin: user.coin + coins };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    } catch (error) {
      console.error('Error purchasing coins', error);
    }
  };

  return (
    <div className="purchase-coins">
      <h2>Purchase Coins</h2>
      <select value={amount} onChange={(e) => setAmount(e.target.value)}>
        <option value="">Select an amount</option>
        <option value="1">$1 for 100 coins</option>
        <option value="5">$5 for 500 coins</option>
        <option value="10">$10 for 1000 coins</option>
      </select>
      <button onClick={handlePurchase}>Purchase</button>
    </div>
  );
};

export default PurchaseCoins;
