const router = require('express').Router();
const { User } = require('../models');
const withAuth = require('../utils/auth');

// This will prevent a user who ISNT logged in from viewing homepage.
router.get('/', async (req, res) => {
    try {
        if (req.session.logged_in) {
            const userData = await User.findByPk(req.session.user_id, {
                attributes: { exclude: ['password'] }
            });
            const user = userData.get({ plain: true });

            res.render('homepage', {
                ...user,
                logged_in: true
            });
            return;
        }

        res.render('homepage', {
            logged_in: false
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

module.exports = router;