const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/auth.middleware')
const { setMonthlyBudget, getMonthlyBudget, updateMonthlyBudget} = require('../controllers/budget.controller')

router.post('/setMonthlyBudget', authMiddleware, setMonthlyBudget)
router.get('/getMonthlyBudget/:year/:month', authMiddleware, getMonthlyBudget)
router.put('/updateMonthlyBudget', authMiddleware, updateMonthlyBudget)

module.exports = router