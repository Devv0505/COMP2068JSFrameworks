// routes/index.js
const express = require('express');
const router = express.Router();
const Expense = require('../models/expense');

router.get('/', async (req, res) => {
  const recentExpenses = await Expense.find()
    .sort({ date: -1 })
    .limit(5)
    .lean();

  // ============================
  //       STAT CARDS LOGIC
  // ============================

  // Total number of recent records
  const totalCount = recentExpenses.length;

  // Total amount spent in recent records
  const totalAmount = recentExpenses.reduce((sum, e) => sum + e.amount, 0);

  // Top category among recent records
  const categoryTotals = {};
  recentExpenses.forEach(e => {
    categoryTotals[e.category] = (categoryTotals[e.category] || 0) + e.amount;
  });

  let topCategory = "N/A";
  if (Object.keys(categoryTotals).length > 0) {
    topCategory = Object.keys(categoryTotals).reduce((a, b) =>
      categoryTotals[a] > categoryTotals[b] ? a : b
    );
  }

  // ============================

  res.render('index', {
    title: 'Expense Tracker',
    recentExpenses,
    totalCount,
    totalAmount,
    topCategory
  });
});

module.exports = router;
