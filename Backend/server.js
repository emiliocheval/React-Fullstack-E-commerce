const express = require('express');
const cors = require('cors'); // Import cors middleware
const mongoose = require('mongoose');
const app = express();
const productRoutes = require('./routes/productRoutes');
const messageRoutes = require('./routes/messageRoutes');
const userRoutes = require('./routes/userRoutes'); // Import user routes
const connectDB = require('./db'); // Import connectDB function
require('dotenv').config();

const PORT = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI;
const corsOptions = {
    origin: 'http://localhost:5173', // Allow requests from this origin
    optionsSuccessStatus: 200, // Optionally specify a custom success status
  };

// Start server and connect to database
const startServer = async () => {
    try {
        if (!MONGODB_URI) throw new Error('No connection string found in .env');

        await connectDB(); // Connect to MongoDB before starting the server
        console.log('Connected to DB')

        
    } catch (err) {
        console.error('Failed to start server:', err.message);
        process.exit(1);
    }
};

startServer();  

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`)
);

app.use(cors(corsOptions));

// Middleware
app.use(express.json());

// Mount routes
app.use('/api/products', productRoutes); 
app.use('/messages', messageRoutes);
app.use('/api/users', userRoutes);

// Default route
app.get('/', (req, res) => {
    res.send('Backend server is running');
});


