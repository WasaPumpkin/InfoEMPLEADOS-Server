//config/corsOptions.js
// import allowedOrigins from './allowedOrigins.js'; // Corrected path with extension

// const corsOptions = {
//   origin: (origin, callback) => {
//     if (allowedOrigins.includes(origin) || !origin) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   credentials: true,
//   optionsSuccessStatus: 200,
// };

// export default corsOptions;

import allowedOrigins from './allowedOrigins.js'; // Ensure correct path

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (e.g., server-to-server or non-browser clients)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

export default corsOptions;