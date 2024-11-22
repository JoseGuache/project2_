const router = require('express').Router();
const { User, Income, Expense, Transaction } = require('../models');
const withAuth = require('../utils/auth');

// Add withAuth middleware to protect the homepage route
router.get('/', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] }
    });

    // Get all incomes for the user
    const incomeData = await Income.findAll({
      where: {
        user_id: req.session.user_id
      }
    });

    // Get all expenses for the user
    const expenseData = await Expense.findAll({
      where: {
        user_id: req.session.user_id
      }
    });

    const user = userData.get({ plain: true });
    const incomes = incomeData.map(income => income.get({ plain: true }));
    const expenses = expenseData.map(expense => expense.get({ plain: true }));

    // Calculate total income
    const totalIncome = incomes.reduce((sum, income) => sum + parseFloat(income.amount), 0);

    // Calculate total expenses
    const totalExpenses = expenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);

    // Calculate total balance (income - expenses)
    const totalBalance = totalIncome - totalExpenses;

    res.render('homepage', {
      ...user,
      totalIncome: totalIncome.toFixed(2),
      totalExpenses: totalExpenses.toFixed(2),
      totalBalance: totalBalance.toFixed(2),
      incomes,
      expenses,
      logged_in: true,
      isDashboard: true
    });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If already logged in, redirect to homepage
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  // If already logged in, redirect to homepage
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});

router.get('/income', withAuth, async (req, res) => {
  try {
    res.render('income', {
      logged_in: true,
      isIncome: true // For active nav state
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/expenses', withAuth, async (req, res) => {
  try {
    res.render('expenses', {
      logged_in: true,
      isExpenses: true // For active nav state
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/transactions', withAuth, async (req, res) => {
  try {
    // Get all transactions for the logged-in user
    const transactionData = await Transaction.findAll({
      where: {
        user_id: req.session.user_id
      },
      order: [['date', 'DESC']],
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    // Serialize data so the template can read it
    const transactions = transactionData.map((transaction) => transaction.get({ plain: true }));

    res.render('transactions', {
      transactions,
      logged_in: req.session.logged_in,
      username: req.session.username,
      isTransactions: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;