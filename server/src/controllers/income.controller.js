const Income = require('../models/income.model')
const mongoose = require('mongoose');

exports.addIncome = async (req, res) => {
  const { title, amount, category, date } = req.body

  if (!title || !amount || !category) {
    return res.status(400).json({ message: 'All fields are required' })
  }

  const income = await Income.create({
    title,
    amount,
    category,
    date,
    user: req.user.id
  })

  res.status(201).json(income)
}

exports.getIncomes = async (req, res) => {
  const incomes = await Income.find({ user: req.user.id }).sort({ date: -1 })
  res.json(incomes)
}

exports.deleteIncome = async (req, res) => {
  try {
    const income = await Income.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id
    });

    if (!income) {
      return res.status(404).json({
        message: 'Income not found'
      });
    }

    res.status(200).json({
      message: 'Income deleted successfully'
    });

  } catch (error) {
    res.status(500).json({
      message: 'Server error'
    });
  }
};


exports.monthlyIncomeSummary = async (req, res) => {
  const year = Number(req.query.year);
  const month = Number(req.query.month);

  const start = new Date(year, month - 1, 1);
  const end = new Date(year, month, 1);

  try {
    const data = await Income.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(req.user.id),
          date: { $gte: start, $lt: end }
        }
      },
      {
        $group: {
          _id: null,
          totalIncome: { $sum: "$amount" }
        }
      }
    ]);

    res.json(data[0]?.totalIncome || 0);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

exports.categoryWiseIncome = async (req, res) => {
  const year = Number(req.query.year);
  const month = Number(req.query.month);

  const start = new Date(year, month - 1, 1);
  const end = new Date(year, month, 1);
  try {
    const data = await Income.aggregate([
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