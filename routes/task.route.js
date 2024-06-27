// routes/task.route.js
const express = require('express');
const router = express.Router();
const protectRoute = require('../middleware/protectRoute');
const { CreateTask,UpdateTask } = require('../controllers/task.controller'); 


router.post('/createTask', protectRoute, CreateTask);
router.post('/updateTask/:taskid', protectRoute, UpdateTask);

module.exports = router; 
