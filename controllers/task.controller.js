const task = require('../models/task.model');
const moment = require('moment'); 
const historyLog = require('../models/historyLog.model')
const { Parser } = require('json2csv');
const fs = require('fs');
const path = require('path');

//.............create task controller................................
const CreateTask = async (req, res) => {
    const  userid  = req.user._id
    const { title, description, due_date, priority, status } = req.body;

    // Parse and convert custom date format "DD/MM/YYYY" to JavaScript Date object
    const formattedDate = moment(due_date, 'DD/MM/YYYY').toDate();

    try {
        const newTask = new task({
            user_id: userid,
            title,
            description,
            due_date: formattedDate,
            priority,
            status
        });

        await newTask.save();

        const newhistoryLog = new historyLog({
            task_id: newTask._id,
            user_id: userid,
            change: 'Task created'
        });

        await newhistoryLog.save();

        res.status(201).json({ message: 'Task created successfully', task: newTask });
    } catch (error) {
        console.error("Error in creating task controller", error.message);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};
//..................End of create task controller...................

//...................update task controller................................
const UpdateTask = async (req, res) => {
    const userid = req.user._id;
    const taskid = req.params.taskid; // taskid should be a string
    const { title, description, due_date, priority, status } = req.body;

    try {
        const existingTask = await task.findOne({ _id: taskid });
        if (!existingTask) {
            return res.status(400).json({ error: "Task does not exist" });
        }

        // Parse and convert custom date format "DD/MM/YYYY" to JavaScript Date object
        const formattedDate = moment(due_date, 'DD/MM/YYYY').toDate();

        // Update the task with new values
        existingTask.title = title || existingTask.title;
        existingTask.description = description || existingTask.description;
        existingTask.due_date = formattedDate || existingTask.due_date;
        existingTask.priority = priority || existingTask.priority;
        existingTask.status = status || existingTask.status;

        await existingTask.save();

        const newHistoryLog = new historyLog({
            task_id: existingTask._id,
            user_id: userid,
            change: 'Task updated'
        });

        await newHistoryLog.save();

        res.status(200).json({ message: 'Task updated successfully', task: existingTask });
    } catch (error) {
        console.error("Error in updating task controller", error.message);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

//......................End of updateTaskController....................................

//....................getAllTask controller.......................................

const getAllTask = async (req, res) => {
    const userid = req.user._id;
    console.log(userid)
    try {
        const tasks = await task.find({ user_id: userid });
        if (tasks.length === 0) {
            return res.status(200).json([]);
        }
        res.status(200).json(tasks);
    } catch (error) {
        console.error("Error in creating getAllTask controller", error.message);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}
//.....................End of getAllTask controller......................................

//....................Deletetask controller...............................

const deleteTask = async (req,res)=>{
    const taskid = req.params.taskid;
    try{
      const tasks = await task.findById(taskid);
      if(!tasks){
        return res.status(404).json({error:"Task not found"});
      }
      await task.findByIdAndDelete({ _id:taskid });

      const newhistoryLog = new historyLog({
            task_id: newTask._id,
            user_id: userid,
            change: 'Task deleted'
        });

        await newhistoryLog.save();

      res.status(200).json({message:"task deleted successfully"});
    }
    catch(error){
       console.error("Error in creating deleteTask controller", error.message);
       res.status(500).json({ message: 'Internal server error', error: error.message }); 
    }
}
//..........................End of deleteTaskController...............................................

//.......................Export task to csv controller.................................................

const exportTasksToCSV = async (req, res) => {
    try {
        const tasks = await task.find({ user_id: req.user._id });

        if (!tasks || tasks.length === 0) {
            return res.status(404).json({ message: 'No tasks found' });
        }

        const fields = ['_id', 'user_id', 'title', 'description', 'status']; // Adjust fields according to your schema
        const json2csvParser = new Parser({ fields });
        const csv = json2csvParser.parse(tasks);

        const filePath = path.join(__dirname, '..', 'exports', 'tasks.csv');
        fs.writeFileSync(filePath, csv);

        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename=tasks.csv');
        res.status(200).send(csv);
    } catch (error) {
        console.error('Error in exportTasksToCSV controller', error.message);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}

//........................getTaskHistory controllers......................................

const getTaskHistory = async (req,res)=>{
    const taskid = req.params.taskid;
    console.log(taskid);

    try {
        const historyLogs = await historyLog.find({ task_id: taskid }).sort({ changed_at: -1 });

        if (historyLogs.length === 0) {
            return res.status(404).json({ message: 'No history found for this task' });
        }

        res.status(200).json(historyLogs);
    } catch (error) {
        console.error("Error in getting task history controller", error.message);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}

module.exports = {
    CreateTask,
    UpdateTask,
    getAllTask,
    deleteTask,
    exportTasksToCSV,
    getTaskHistory
}