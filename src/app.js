import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet'; // Only import once
import morgan from 'morgan';

const app = express();

// CORS setup
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true,  
}));

// Middlewares
app.use(helmet());  // Add security headers
app.use(morgan('combined'));  // Logging middleware

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.static('public'));
app.use(cookieParser());

// Routers import  
import userRoutes from './routes/user.routes.js';

// Router declaration  
app.use("/api/v1/users", userRoutes);

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Something went wrong"
    });
});

export default app;
