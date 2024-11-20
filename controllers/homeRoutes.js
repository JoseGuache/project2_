const router = require('express').Router();
const { User, Income } = require('../models');
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

        const user = userData.get({ plain: true });
        const incomes = incomeData.map(income => income.get({ plain: true }));

        // Calculate total income
        const totalIncome = incomes.reduce((sum, income) => sum + parseFloat(income.amount), 0);
        
        // For now, set totalExpenses to 0 since we haven't implemented expenses yet
        const totalExpenses = 0;
        
        // Calculate total balance (income - expenses)
        const totalBalance = totalIncome - totalExpenses;

        res.render('homepage', {
            ...user,
            totalIncome: totalIncome.toFixed(2),
            totalExpenses: totalExpenses.toFixed(2),
            totalBalance: totalBalance.toFixed(2),
            incomes,
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

module.exports = router;