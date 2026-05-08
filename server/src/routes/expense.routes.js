const express = require('express')
const router = express.Router()
const { addExpense, deleteExpense, monthlyExpenseSummary, categoryWiseExpense, last7DaysExpense, getExpense } = require('../controllers/expense.controller')
const authMiddleware = require('../middleware/auth.middleware')

router.get('/', authMiddleware,getExpense)
router.post('/', authMiddleware,addExpense)
router.delete('/:id', authMiddleware, deleteExpense);
router.get('/monthly-summary', authMiddleware, monthlyExpenseSummary);
router.get('/category-summary', authMiddleware, categoryWiseExpense);
router.get('/weekly-summary', authMiddleware, last7DaysExpense);

module.exports = router
