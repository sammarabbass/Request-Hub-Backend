
const express = require('express');
const { signUp, login, getProfile, roleCheck, changePassword, resetPassword, forgotPassword,refreshToken, logout} = require('../controllers/authController');
const { protect, isAdmin } = require('../middleware/authMiddleware');
const router = express.Router();



router.post('/signup', signUp)
router.post('/login', login) 
router.get('/profile',protect,getProfile)
router.get('/admin', protect,  isAdmin, roleCheck)
router.put('/change-password', changePassword)
router.post('/forgot-password', forgotPassword)
router.post('/reset-password/:token', resetPassword)
router.post("/refresh-token", refreshToken);
router.post("/logout",protect,logout)
module.exports = router;