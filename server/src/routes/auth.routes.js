const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/auth.middleware')
const { registerUser, loginUser,googleLogin , getMe, logout } = require('../controllers/auth.controller')
const {allExp} = require('../controllers/allExpenses')

router.post('/signup',registerUser)
router.post('/login',loginUser)
router.get('/google',googleLogin)
router.get('/me',authMiddleware,getMe)  
router.get('/exp', authMiddleware,allExp)
router.post('/logout', authMiddleware,logout)

module.exports = router
