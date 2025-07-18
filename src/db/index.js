import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
// import dotenv from "dotenv";
// import express from "express";

const  connectDB = async () => {
    try {
        const connectionInstance =      await mongoose.connect(`${process.env.MONGO_URL}/${DB_NAME}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`\n MongoDB connected successfully to ${connectionInstance.connection.host}`);
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }   
}


export default connectDB;