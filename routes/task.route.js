const express = require('express');
const router = express.Router();
const protectRoute = require('../middleware/protectRoute');
const { CreateTask, UpdateTask, getAllTask, deleteTask, exportTasksToCSV, getTaskHistory } = require('../controllers/task.controller');

router.post('/createTask', protectRoute, CreateTask);
router.post('/updateTask/:taskid', protectRoute, UpdateTask);
router.get('/getAllTask', protectRoute, getAllTask);
router.get('/export-tasks', protectRoute, exportTasksToCSV);
router.get('/:taskid/history', protectRoute, getTaskHistory); // Changed to match the requested URL
router.delete('/deleteTask/:taskid', protectRoute, deleteTask);

module.exports = router;
