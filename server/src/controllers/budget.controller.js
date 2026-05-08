const Budget = require('../models/budget.model')
const mongoose = require('mongoose')

exports.setMonthlyBudget = async (req, res) => {
  try {
    const { amount, month, year } = req.body

    if (!amount || !month || !year) {
      return res.status(400).json({
        message: 'Amount, month, and year are required'
      })
    }

    if (amount <= 0) {
      return res.status(400).json({
        message: 'Amount must be greater than zero'
      })
    }

    const budget = await Budget.create({
      amount,
      month,
      year,
      user: req.user.id
    })

    res.status(201).json({
      message: 'Budget added successfully',
      budget
    })

  } catch (err) {
    res.status(500).json({
      message: 'Server error'
    })
  }
}
exports.getMonthlyBudget = async (req, res) => {
  try {
    const year = Number(req.params.year);
    const month = Number(req.params.month);

    const budget = await Budget.findOne({
      user: new mongoose.Types.ObjectId(req.user.id),
      month,
      year
    });
    res.json(budget);

  } catch (err) {
    res.status(500).json({ message: 'Server error'});
  }
}

exports.updateMonthlyBudget = async (req, res) => {
  try {
    const { amount, month, year } = req.body

    if (!amount || !month || !year) {
      return res.status(400).json({
        message: 'Amount, month, and year are required'
      })
    }

    const budget = await Budget.findOne({
      user: new mongoose.Types.ObjectId(req.user.id),
      month,
      year
    });
    
    console.log(budget);

    if(budget) {
      budget.amount = amount;
      await budget.save();
      return res.json({
        message: 'Budget updated successfully',
        budget
      });
    }
  } catch (err) {
    res.status(500).json({
      message: 'Server error'
    })
  }
}