const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/auth.middleware')
const { setMonthlyBudget, getMonthlyBudget } = require('../controllers/budget.controller')

router.post('/setMonthlyBudget', authMiddleware, setMonthlyBudget)
router.get('/getMonthlyBudget/:year/:month', authMiddleware, getMonthlyBudget)

module.exports = router