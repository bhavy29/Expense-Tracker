const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/auth.middleware')
const { addIncome, getIncomes, deleteIncome, monthlyIncomeSummary, categoryWiseIncome} = require('../controllers/income.controller')

router.post('/', authMiddleware, addIncome)
router.get('/', authMiddleware, getIncomes)
router.delete('/:id', authMiddleware, deleteIncome);
router.get('/monthly-summary', authMiddleware, monthlyIncomeSummary);
router.get('/category-summary', authMiddleware, categoryWiseIncome);

module.exports = router
