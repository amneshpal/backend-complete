import connectDB from "./db/index.js";
import dotenv from "dotenv";
import app from "./app.js";  // Correct import

// Load environment variables from .env file
dotenv.config({
    path: "./.env",
});

// Check if required environment variables are loaded
if (!process.env.DB_NAME || !process.env.PORT) {
    console.error("Error: Missing required environment variables (DB_NAME, PORT)");
    process.exit(1);  // Exit if essential environment variables are missing
}

connectDB()
    .then(() => {
        // After DB is connected, start the server
        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server is running on port ${process.env.PORT || 8000}`);
        });
    })
    .catch((error) => {
        console.error("Failed to connect to the database:", error);
        process.exit(1);  // Exit if the DB connection fails
    });

// Graceful shutdown for process termination
process.on('SIGINT', () => {
    console.log('SIGINT received. Shutting down gracefully...');
    connectDB()
        .then(() => {
            console.log("Closing database connection...");
            process.exit(0); // Graceful exit
        })
        .catch((err) => {
            console.error('Error while closing the database connection:', err);
            process.exit(1); // Force exit on failure
        });
});
