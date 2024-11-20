const router = require('express').Router();
const userRoutes = require('./userRoutes');
const incomeRoutes = require('./incomeRoutes');

router.use('/users', userRoutes);
router.use('/income', incomeRoutes);

module.exports = router;