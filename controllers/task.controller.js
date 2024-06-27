const task = require('../models/task.model');
const moment = require('moment'); // Use moment.js for date parsing

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
        res.status(201).json({ message: 'Task created successfully', task: newTask });
    } catch (error) {
        console.error("Error in creating task controller", error.message);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};
//..................End of create task controller.............

const UpdateTask = (req, res) => {

}

module.exports = { CreateTask,UpdateTask };
