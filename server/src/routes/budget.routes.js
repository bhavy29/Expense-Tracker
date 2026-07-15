const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");

const {
  setMonthlyBudget,
  setCategoryBudget,
  setWeeklyBudget,
  getMonthlyBudget,
  getCategoryBudgets,
  getWeeklyBudget,
} = require("../controllers/budget.controller");


// Protect all routes
router.use(authMiddleware);

// Monthly
router.post("/monthly", setMonthlyBudget);
router.get("/monthly/:month/:year", getMonthlyBudget);

  
// Category
router.post("/category", setCategoryBudget);
router.get("/category/:month/:year", getCategoryBudgets);


// Weekly
router.post("/weekly", setWeeklyBudget);
router.get("/weekly", getWeeklyBudget);

module.exports = router;