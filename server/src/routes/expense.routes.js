const express = require('express')
const router = express.Router()
const { addExpense, deleteExpense, monthlyExpenseSummary, categoryWiseExpense } = require('../controllers/expense.controller')
const authMiddleware = require('../middleware/auth.middleware')

router.post('/', authMiddleware,addExpense)
router.delete('/:id', authMiddleware, deleteExpense);
router.get('/monthly-summary', authMiddleware, monthlyExpenseSummary);
router.get('/category-summary', authMiddleware, categoryWiseExpense);


module.exports = router
