const express = require('express')
const router = express.Router()
const {deleteUser} = require('../controllers/user.controller')
const authMiddleware = require('../middleware/auth.middleware')

router.delete('/deleteUser',authMiddleware,deleteUser)

module.exports = router