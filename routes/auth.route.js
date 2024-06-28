const express = require('express');
const router = express.Router();
const protectRoute = require('../middleware/protectRoute');
const { signup,login,logout,getMe }= require('../controllers/auth.controller')


//sign up route
router.post('/signup',signup);

//login route
router.post('/login',login);

//logout route
router.post('/logout',logout);

//get me route
router.get("/me",protectRoute,getMe);

module.exports = router;
