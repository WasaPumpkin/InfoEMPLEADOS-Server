// routes/userRoutes.js
// routes/userRoutes.js
import express from 'express';
import {
  registerUser,
  loginUser,
  getCurrentUser,
  getEmployees,
} from '../controllers/userController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

// Register a new user
router.post('/', registerUser);

// User login
router.post('/login', loginUser);

// Get current user info
router.get('/current', protect, getCurrentUser);

// Get all employees (admin only)
router.get('/employees', protect, adminOnly, getEmployees);

export default router;
