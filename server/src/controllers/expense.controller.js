const Expense = require('../models/expense.model')

exports.addExpense = async (req, res) => {
  const { title, amount, category, date } = req.body

  if (!title || !amount || !category) {
    return res.status(400).json({
      message: 'Title, amount, and category are required'
    })
  }

  const expense = await Expense.create({
    title,
    amount,
    category,
    date,
    user: req.user.id
  })

  res.status(201).json({
    message: 'Expense added successfully',
    expense
  })
}


exports.deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id
    });

    if (!expense) {
      return res.status(404).json({
        message: 'Expense not found'
      });
    }

    res.status(200).json({
      message: 'Expense deleted successfully'
    });

  } catch (error) {
    res.status(500).json({
      message: 'Server error'
    });
  }
};

const mongoose = require('mongoose');

exports.monthlyExpenseSummary = async (req, res) => {
  const year = Number(req.query.year);
  const month = Number(req.query.month);

  const start = new Date(year, month - 1, 1);
  const end = new Date(year, month, 1);

  try {
    const data = await Expense.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(req.user.id),
          date: { $gte: start, $lt: end }
        }
      },
      {
        $group: {
          _id: null,
          totalExpense: { $sum: "$amount" }
        }
      }
    ]);

    res.json(data[0]?.totalExpense || 0);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.categoryWiseExpense = async (req, res) => {
  const year = Number(req.query.year);
  const month = Number(req.query.month);

  const start = new Date(year, month - 1, 1);
  const end = new Date(year, month, 1);
  try {
    const data = await Expense.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(req.user.id),
          date: { $gte: start, $lt: end }
        }
      },
      {
        $group: {
          _id: "$category",
          total: { $sum: "$amount" }
        }
      }
    ]);

    res.status(200).json(
      data.map(item => ({
        name: item._id,
        value: item.total
      }))
    );
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};