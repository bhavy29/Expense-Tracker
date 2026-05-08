const Income = require('../models/income.model')
const mongoose = require('mongoose');
const User = require('../models/user.model')
const client = require('../db/cache')

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

  await client.del('incomes');
  res.status(201).json(income)
}

exports.getIncomes = async (req, res) => {

  const user = await User.findById(req.user.id).select('-password')
  const id = user.id

  const cacheValue = await client.get('incomes');
  if (cacheValue) {
    console.log("Data from cache")
    return res.json(JSON.parse(cacheValue));
  }

  const data = await Income.find({ user: id });
  await client.set('incomes', JSON.stringify(data))
  await client.expire('incomes', 60 * 60) // expire in one hour

  res.json(data);
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

    await client.del('incomes');
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

exports.last7daysIncome = async (req, res) => {
  try {

    const today = new Date();
    today.setHours(23, 59, 59, 999);

    const last7Days = new Date(today.getTime() - 6 * 24 * 60 * 60 * 1000);
    last7Days.setHours(0, 0, 0, 0);

    const data = await Income.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(req.user.id),
          date: { $gte: last7Days, $lte: today }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$date" }
          },
          totalIncome: { $sum: "$amount" }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ])

    // Fill missing value with 0
    const result = []
    for (let i = 0; i < 7; i++) {
      const d = new Date(last7Days.getTime());
      d.setDate(d.getDate() + i);

      if (isNaN(d)) {
        console.log("Invalid date:", d);
        continue;
      }

      const formattedDate = d.toISOString().split("T")[0];

      const found = data.find(item => item._id === formattedDate);

      result.push({
        date: formattedDate,
        income: found ? found.totalIncome : 0
      })
    }

    res.status(200).json(result);
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
}