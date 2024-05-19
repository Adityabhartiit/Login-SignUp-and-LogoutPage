import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { UserRouter } from './routes/user.js';
import dotenv from 'dotenv';
const app = express();
const PORT = process.env.PORT || 3000; // Correctly assigning the PORT
const KEY = "jwtnewtokenkey"; // Assuming this is needed somewhere in your code

// Middleware setup
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true
}));
app.use(cookieParser());

// Routes
app.use('/auth', UserRouter);

// MongoDB connection with error handling
mongoose.connect('mongodb://127.0.0.1:27017/authentication', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

// Starting the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
