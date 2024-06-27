const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    user_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    title: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String 
    },
    due_date: { 
        type: Date 
    },
    priority: { 
        type: String, 
        enum: ['low', 'medium', 'high'], 
        required: true 
    },
    status: { 
        type: String, 
        enum: ['to-do', 'in-progress', 'completed'], 
        required: true 
    },
    created_at: { 
        type: Date, 
        default: Date.now 
    },
    updated_at: { 
        type: Date, 
        default: Date.now 
    }
});

const task = mongoose.model('Task', taskSchema);

module.exports = task;
