const express = require('express');
const { purchaseCoins, spendCoins } = require('../controllers/transactionController');
const router = express.Router();

router.post('/purchase', purchaseCoins);
router.post('/spend', spendCoins);

module.exports = router;
