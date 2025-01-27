import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true
    },
    taskItems: [
        {
            taskName: {
            type: String,
            required: true,
          },
          details: {
            type: String,
            required: true,
          },
          status: {
            type: String,
            enum: ['pending', 'completed', 'done'], // Only allow these statuses
            default: 'pending',
          }
        }
    ]
}, { timestamps: true })

const Task = mongoose.model('Task', taskSchema);

export default Task;