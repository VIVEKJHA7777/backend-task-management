const mongoose = require('mongoose');

const historyLogSchema = new mongoose.Schema({
    task_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Task', 
        required: true 
    },
    user_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    change: { 
        type: String, 
        required: true 
    },
    changed_at: { 
        type: Date, 
        default: Date.now 
    }
});

const HistoryLog = mongoose.model('HistoryLog', historyLogSchema);

module.exports = HistoryLog;
