//routes/taskRoutes.js

// routes/taskRoutes.js
import express from 'express';
import {
  createTask,
  deleteTask,
  completeTask,
  getTasks,
} from '../controllers/taskController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

// Get tasks (admin gets tasks they created, employee gets tasks assigned to them)
router.get('/', protect, getTasks);

// Admin creates a task
router.post('/', protect, adminOnly, createTask);

// Admin deletes a task
router.delete('/:id', protect, adminOnly, deleteTask);

// Employee marks a task as complete
router.put('/:id/complete', protect, completeTask);

export default router;


