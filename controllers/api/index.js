const router = require('express').Router();
const userRoutes = require('./userRoutes');
const incomeRoutes = require('./incomeRoutes');
const expenseRoutes = require('./expenseRoutes');

router.use('/users', userRoutes);
router.use('/income', incomeRoutes);
router.use('/expense', expenseRoutes);

module.exports = router;