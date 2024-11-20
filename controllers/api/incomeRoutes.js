const router = require('express').Router();
const { Income } = require('../../models');
const withAuth = require('../../utils/auth');

// Create new income
router.post('/', withAuth, async (req, res) => {
  try {
    const newIncome = await Income.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newIncome);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// Get all incomes for a user
router.get('/', withAuth, async (req, res) => {
  try {
    const incomeData = await Income.findAll({
      where: {
        user_id: req.session.user_id,
      },
      order: [['date', 'DESC']],
    });

    res.status(200).json(incomeData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router; 