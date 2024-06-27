// routes/task.route.js
const express = require('express');
const router = express.Router();
const protectRoute = require('../middleware/protectRoute');
const { CreateTask,UpdateTask } = require('../controllers/task.controller'); // Correct import

// Define your routes and associate them with controller functions
router.post('/createTask', protectRoute, CreateTask);
router.post('/updateTask', protectRoute, UpdateTask);

module.exports = router; 
