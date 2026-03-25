const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/auth.middleware')
const { generateMonthlyReport,generateYearlyReport } = require('../controllers/reportController')

router.get(
  '/monthly-pdf',
  authMiddleware,
  generateMonthlyReport
);

router.get(
  '/yearly-pdf',
  authMiddleware,
  generateYearlyReport
);

module.exports = router; 