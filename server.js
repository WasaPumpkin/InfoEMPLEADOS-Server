// server.js
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import { errorHandler } from './middleware/errorMiddleware.js';
import cors from 'cors';
import path from 'path'; // Required for working with paths

// Fix for __dirname in ES modules
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
connectDB();

const app = express();

// Import the CORS options from config/corsOptions.js
import corsOptions from './config/corsOptions.js';

// Apply CORS with the imported options
app.use(cors(corsOptions));

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Route to serve your custom HTML file when accessing root
app.get('/', (req, res) => {
  const filePath = path.join(__dirname, 'views', 'index.html'); // Adjust the path here
  res.sendFile(filePath, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error loading the page');
    }
  });
});

// Routes
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

// Error Handling Middleware
app.use(errorHandler);

// 404 error handler
app.all('*', (req, res) => {
  res.status(404);
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'views', '404.html'));
  } else if (req.accepts('json')) {
    res.json({ message: '404 Not Found' });
  } else {
    res.type('txt').send('404 Not Found');
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);


//http://localhost:8000/api/tasks
