const router = require('express').Router();
const { User, Income } = require('../models');
const withAuth = require('../utils/auth');

// This will prevent a user who ISNT logged in from viewing homepage.
router.get('/', async (req, res) => {
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

        res.render('homepage', {
            ...user,
            totalIncome: totalIncome.toFixed(2),
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
    // If a session exists. redirect the request to the homepage
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

router.get('/signup', (req, res) => {
    // If the user is already logged in, redirect the request to another route
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