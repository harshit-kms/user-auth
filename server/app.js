import express from 'express';
import cors from 'cors';
import connectToMongoDB from './database/connect.js';
import userRoute from './routes/user.js'; 
import appRoute from './routes/appRoute.js';
import cookieParser from 'cookie-parser';
import { restrictToLoggedInUserOnly } from './middlewares/auth.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors({
    origin: process.env.REACT_APP_FRONTEND_HOST, 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    credentials: true, 
}));

// Protected routes
app.use('/home', restrictToLoggedInUserOnly, appRoute);

// User routes
app.use('/user', userRoute);

const PORT = process.env.PORT;

connectToMongoDB(process.env.DATABASE_URL)
.then(() => {
    app.listen(PORT, () => {
        console.log("Server started on ", PORT);
    });
})
.catch((err) => {
    console.error("Failed to connect to MongoDB: ", err);
});
