const router = require('express').Router();
const { Expense } = require('../../models');
const withAuth = require('../../utils/auth');

// Create new expense
router.post('/', withAuth, async (req, res) => {
  try {
    const newExpense = await Expense.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(201).json(newExpense);
  } catch (err) {
    console.error('Error creating expense:', err);
    res.status(400).json({ message: 'Failed to create expense', error: err.message });
  }
});

// Get all expenses for a user
router.get('/', withAuth, async (req, res) => {
  try {
    const expenseData = await Expense.findAll({
      where: {
        user_id: req.session.user_id,
      },
    });
    res.json(expenseData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router; 