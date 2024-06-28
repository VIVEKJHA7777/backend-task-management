// routes/task.route.js
const express = require('express');
const router = express.Router();
const protectRoute = require('../middleware/protectRoute');
const { CreateTask,UpdateTask,getAllTask,deleteTask,exportTasksToCSV } = require('../controllers/task.controller'); 


router.post('/createTask', protectRoute, CreateTask);
router.post('/updateTask/:taskid', protectRoute, UpdateTask);
router.get('/getAllTask', protectRoute, getAllTask);
router.get('/export-tasks',protectRoute, exportTasksToCSV);
router.delete('/deleteTask/:taskid', protectRoute,deleteTask);

module.exports = router; 
