const Transaction = require('../models/Transaction');
const User = require('../models/User');

const purchaseCoins = async (req, res) => {
  try {
    const { userId, amount, coins } = req.body;

    const transaction = new Transaction({ userId, amount, coins, type: 'purchase' });
    await transaction.save();

    const user = await User.findById(userId);
    user.coin += coins;
    await user.save();

    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: 'Error purchasing coins', error });
  }
};

const spendCoins = async (req, res) => {
  try {
    const { userId, amount } = req.body;

    const transaction = new Transaction({ userId, amount, type: 'spend' });
    await transaction.save();

    const user = await User.findById(userId);
    user.coin -= amount;
    await user.save();

    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: 'Error spending coins', error });
  }
};

module.exports = { purchaseCoins, spendCoins };
