const Income = require('../models/income.model')
const mongoose = require('mongoose');
const User = require('../models/user.model')
const client = require('../db/cache')

// ADD
exports.addIncome = async (req, res) => {
  try {
    const { title, amount, category, date } = req.body

    if (!title || !amount || !category) {
      return res.status(400).json({ message: 'Title, amount and category required' })
    }

    const income = await Income.create({
      title,
      amount,
      category,
      date,
      user: req.user.id
    })

    // Clear all income caches of user
    try {
      const keys = await client.keys(`incomes:${req.user.id}:*`);
      if (keys.length > 0) await client.del(...keys);
      console.log("Cache cleared for user:", req.user.id);
    } catch (cacheErr) {
      console.warn("Cache clear failed on addIncome:", cacheErr.message);
    }

    res.status(201).json({
      message: 'Income added successfully',
      income
    })
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
}

// GET
exports.getIncomes = async (req, res) => {
  try {
    const { month, year, category } = req.query;

    const cacheKey = `incomes:${req.user.id}:${month || 'all'}:${year || 'all'}:${category || 'all'}`;

    // Check cache 
    try{
      const cacheValue = await client.get(cacheKey);
      if (cacheValue) {
        console.log("Data from cache")
        return res.json(JSON.parse(cacheValue));
      }
    }catch(cacheErr){
      console.warn("Cache read failed:", cacheErr.message);
    }

    console.log("Cache miss")

    // Build query
    const query = { user: req.user.id };

    if(category){
      query.category = category
    }

    if (month && year) {
      const start = new Date(year, month - 1, 1);
      const end = new Date(year, month, 1);
      query.date = { $gte: start, $lt: end };
    }

    const indomes = await Income.find(query);

    // Save to cache
    try{
      await client.set(cacheKey, JSON.stringify(indomes), 'EX', 60 * 60);
    }catch(cacheErr){
      console.warn("Cache write failed:", cacheErr.message);
    }

    res.json(indomes);

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Server Error"
    });
  }
}

// DELETE
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

    // Clear the income cache for the user
    try {
      const keys = await client.keys(`incomes:${req.user.id}:*`);
      if (keys.length > 0) await client.del(...keys);
    } catch (cacheErr) {
      console.warn("Cache clear failed on deleteIncome:", cacheErr.message);
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

// MONTHLY SUMMARY
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