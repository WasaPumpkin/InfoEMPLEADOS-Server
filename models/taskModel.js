// models/taskModel.js
// models/taskModel.js
import mongoose from 'mongoose';

const taskSchema = mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, 'Please add task text'],
    },
    // The admin who created (assigned) the task
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    // The employee to whom the task is assigned
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    status: {
      type: String,
      enum: ['pending', 'completed'],
      default: 'pending',
    },
    completedAt: {
      type: Date,
    },
    completionMessage: {
      type: String, // New field to store the user's message
    },
  },
  { timestamps: true }
);

export default mongoose.model('Task', taskSchema);
