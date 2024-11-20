const router = require('express').Router();
const { User } = require('../models');
const withAuth = require('../utils/auth');

// Add withAuth middleware to protect the homepage route
router.get('/', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] }
        });
        const user = userData.get({ plain: true });

        res.render('homepage', {
            ...user,
            logged_in: true,
            isDashboard: true // For active nav state
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

module.exports = router;