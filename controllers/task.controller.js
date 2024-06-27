const task = require('../models/task.model') 

const CreateTask = async (req, res) => {
    const { userid } = req.params;
    const { title, description, due_date, priority, status } = req.body;

    try {
        const newTask = new Task({
            user_id: userid,
            title,
            description,
            due_date,
            priority,
            status
        });

        await newTask.save();
        res.status(201).json({ message: 'Task created successfully', task: newTask });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

module.exports = { CreateTask };


module.exports = { CreateTask };
