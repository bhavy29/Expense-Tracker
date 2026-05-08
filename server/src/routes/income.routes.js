const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/auth.middleware')
const { addIncome, getIncomes, deleteIncome, monthlyIncomeSummary, categoryWiseIncome, last7daysIncome} = require('../controllers/income.controller')

router.get('/', authMiddleware, getIncomes)
router.post('/', authMiddleware, addIncome)
router.delete('/:id', authMiddleware, deleteIncome);
router.get('/monthly-summary', authMiddleware, monthlyIncomeSummary);
router.get('/category-summary', authMiddleware, categoryWiseIncome);
router.get('/weekly-summary', authMiddleware, last7daysIncome);

module.exports = router
