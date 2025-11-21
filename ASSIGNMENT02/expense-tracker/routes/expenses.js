// routes/expenses.js
const express = require('express');
const router = express.Router();
const Expense = require('../models/expense');
const { ensureAuth } = require('../middleware/auth');

// list (dashboard)
router.get('/', ensureAuth, async (req, res) => {
  const expenses = await Expense
    .find({ user: req.user._id })
    .sort({ date: -1 })
    .lean();

  // build totals by category for Chart.js
  const totals = {};
  expenses.forEach(e => {
    const cat = e.category.trim();
    totals[cat] = (totals[cat] || 0) + e.amount;
  });

  const chartLabels = Object.keys(totals);
  const chartData = Object.values(totals);
console.log("Expenses:", expenses);
console.log("Totals:", totals);
console.log("Labels:", chartLabels);
console.log("Data:", chartData);

  res.render('expenses/list', {
    title: 'My Expenses',
    expenses,
    chartLabels: JSON.stringify(chartLabels),
    chartData: JSON.stringify(chartData)
  });
});

// add form
router.get('/add', ensureAuth, (req, res) => {
  res.render('expenses/form', { title: 'Add Expense' });
});

// add POST
router.post('/add', ensureAuth, async (req, res) => {
  const { title, category, amount, date, note } = req.body;
  await Expense.create({
    user: req.user._id,
    title,
    category,
    amount,
    date,
    note
  });
  res.redirect('/expenses');
});

// edit form
router.get('/edit/:id', ensureAuth, async (req, res) => {
  const expense = await Expense
    .findOne({ _id: req.params.id, user: req.user._id })
    .lean();
  if (!expense) return res.redirect('/expenses');

  res.render('expenses/form', { title: 'Edit Expense', expense });
});

// edit POST
router.post('/edit/:id', ensureAuth, async (req, res) => {
  const { title, category, amount, date, note } = req.body;
  await Expense.updateOne(
    { _id: req.params.id, user: req.user._id },
    { title, category, amount, date, note }
  );
  res.redirect('/expenses');
});

// delete confirmation
router.get('/delete/:id', ensureAuth, async (req, res) => {
  const expense = await Expense
    .findOne({ _id: req.params.id, user: req.user._id })
    .lean();
  if (!expense) return res.redirect('/expenses');

  res.render('expenses/delete', { title: 'Delete Expense', expense });
});

// delete POST
router.post('/delete/:id', ensureAuth, async (req, res) => {
  await Expense.deleteOne({ _id: req.params.id, user: req.user._id });
  res.redirect('/expenses');
});

module.exports = router;
