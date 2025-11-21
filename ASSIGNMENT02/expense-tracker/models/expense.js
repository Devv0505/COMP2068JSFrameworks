const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  category: { type: String, required: true },   // food, rent, etc.
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now, required: true },
  note: String
}, { timestamps: true });

module.exports = mongoose.model('Expense', expenseSchema);
