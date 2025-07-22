import connectDB from "./db/index.js";
import dotenv from "dotenv";
import app from "./app.js";  // Correct import

dotenv.config({
    path: "./.env"
});

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
