const Budget = require("../models/budget.model");

// SET MONTHLY BUDGET

exports.setMonthlyBudget = async (req, res) => {
  try {
    const { amount, month, year } = req.body;

    if (!amount || !month || !year) {
      return res.status(400).json({
        message: "Amount, month and year are required",
      });
    }

    let budget = await Budget.findOne({
      userId: req.user.id,
      type: "monthly",
      month,
      year,
    });

    // UPDATE
    if (budget) {
      budget.amount = amount;
      await budget.save();

      return res.json({
        message: "Monthly budget updated",
        budget,
      });
    }

    // CREATE
    budget = await Budget.create({
      userId: req.user.id,
      type: "monthly",
      amount,
      month,
      year,
    });

    res.status(201).json({
      message: "Monthly budget created",
      budget,
    });

  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: "Server error",
    });
  }
};

// SET CATEGORY BUDGET

exports.setCategoryBudget = async (req, res) => {
  try {
    const { category, amount, month, year } = req.body;

    if (!category || !amount || !month || !year) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    let budget = await Budget.findOne({
      userId: req.user.id,
      type: "category",
      category,
      month,
      year,
    });

    // UPDATE
    if (budget) {
      budget.amount = amount;
      await budget.save();

      return res.json({
        message: "Category budget updated",
        budget,
      });
    }

    // CREATE
    budget = await Budget.create({
      userId: req.user.id,
      type: "category",
      category,
      amount,
      month,
      year,
    });

    res.status(201).json({
      message: "Category budget created",
      budget,
    });

  } catch (err) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

// SET WEEKLY BUDGET

exports.setWeeklyBudget = async (req, res) => {
  try {
    const { amount, weekStart, weekEnd } = req.body;

    if (!amount || !weekStart || !weekEnd) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    let budget = await Budget.findOne({
      userId: req.user.id,
      type: "weekly",
      weekStart,
      weekEnd,
    });

    // UPDATE
    if (budget) {
      budget.amount = amount;
      await budget.save();

      return res.json({
        message: "Weekly budget updated",
        budget,
      });
    }

    // CREATE
    budget = await Budget.create({
      userId: req.user.id,
      type: "weekly",
      amount,
      weekStart,
      weekEnd,
    });

    res.status(201).json({
      message: "Weekly budget created",
      budget,
    });

  } catch (err) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

// GET MONTHLY BUDGET

exports.getMonthlyBudget = async (req, res) => {
  try {

    console.log(req.user.id);

    const { month, year } = req.params;

     const budget = await Budget.findOne({
      userId: req.user.id,
      type: "monthly",
      month: Number(month),
      year: Number(year),
    });

    res.json(budget);

  } catch (err) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

// GET CATEGORY BUDGETS

exports.getCategoryBudgets = async (req, res) => {
  try {

    const { month, year } = req.params;

    const budgets = await Budget.find({
      userId: req.user.id,
      type: "category",
      month,
      year,
    });
    console.log(budgets)
    res.json(budgets);

  } catch (err) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

// GET WEEKLY BUDGET

exports.getWeeklyBudget = async (req, res) => {
  try {

    const currentDate = new Date();

    const budget = await Budget.findOne({
      userId: req.user.id,
      type: "weekly",
      weekStart: { $lte: currentDate },
      weekEnd: { $gte: currentDate },
      amount: { $ne: null },
    });

    console.log("Weekly Budget:", budget);
    res.json(budget);

  } catch (err) {
    res.status(500).json({
      message: "Server error",
    });
  }
};