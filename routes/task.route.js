// routes/task.route.js
const express = require('express');
const router = express.Router();
const protectRoute = require('../middleware/protectRoute');
const { CreateTask } = require('../controllers/task.controller'); // Correct import

// Define your routes and associate them with controller functions
router.post('/createTask/:userid',protectRoute, CreateTask);

module.exports = router;
