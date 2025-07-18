import connectDB from "./db/index.js";
import dotenv from "dotenv";

dotenv.config({
    path: "./.env"

});





connectDB()
.then(() => {
    // console.log("Database connection established successfully.");  
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running on port ${process.env.PORT || 8000}`);
    }
        
    );})
.catch((error) => {
    console.error("Failed to connect to the database:", error);
    // process.exit(1);
    
})
.catch((error) => {     
    console.error("Failed to connect to the database:", error);
    process.exit(1);
});     












// import dotenv from "dotenv";
// import express from "express";

// dotenv.config();

// const app = express();

// (async () => {
//   try {
//     // MongoDB connection
//     await mongoose.connect(`${process.env.MONGO_URL}/${DB_NAME}`, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });

//     console.log("MongoDB connected successfully");

//     // Error handler
//     app.on("error", (err) => {
//       console.error("App error:", err);
//       throw err;
//     });

//     // Start server
//     const PORT = process.env.PORT || 8000;
//     app.listen(PORT, () => {
//       console.log(`Server is running on port ${PORT}`);
//     });

//   } catch (error) {
//     console.error("Error connecting to MongoDB:", error);
//   }
// })();
