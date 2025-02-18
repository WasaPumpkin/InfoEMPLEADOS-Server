// middleware/authMiddleware.js
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

export const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check if the token is in the headers
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Extract the token from the header
      token = req.headers.authorization.split(' ')[1];
      console.log('Token:', token); // Log the token

      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Decoded Token:', decoded); // Log the decoded token

      // Attach the user to the request object
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      console.error('Error verifying token:', error); // Log the error
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  }

  // If no token is found
  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

export const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403);
    throw new Error('Not authorized as admin');
  }
};