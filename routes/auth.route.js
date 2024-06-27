const express = require('express');
const router = express.Router();
const { signup,login,logout }= require('../controllers/auth.controller')


//sign up route
router.post('/signup',signup);

//login route
router.post('/login',login);

//logout route
router.post('/logout',logout);

module.exports = router;
