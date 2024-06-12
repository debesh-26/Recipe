const User = require('../models/User');

const login = async (req, res) => {
  try {
    const { displayName, photoURL, email, coin } = req.body;

    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ displayName, photoURL, email, coin });
      await user.save();
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
};

module.exports = { login };
