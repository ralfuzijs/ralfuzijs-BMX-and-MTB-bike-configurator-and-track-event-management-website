const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/database');

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/tracks', require('./routes/tracks'));
app.use('/api/users', require('./routes/users'));

// Default route
app.get('/', (req, res) => {
  res.send('Map Tracks API is running');
});

const PORT = process.env.PORT || 27017;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});