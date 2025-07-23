import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();  // Load environment variables

// Cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload the file to Cloudinary
const uploadOnCloudinary = async (localFilePath) => {
    if (!localFilePath) return null;

    try {
        // Check if file exists before uploading
        if (!fs.existsSync(localFilePath)) {
            throw new Error("File not found.");
        }

        // Upload the file to Cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, { resource_type: 'auto' });

        // Return file URL after successful upload
        console.log("File uploaded successfully:", response.url);
        return response;
    } catch (error) {
        console.error("Error uploading to Cloudinary:", error);

        // Delete the local file if upload fails
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath); // Delete local file if upload fails
            console.log("Local file deleted after upload failure.");
        }

        // Return custom error message to be more informative
        return { error: "File upload to Cloudinary failed", details: error.message };
    }
};

export { uploadOnCloudinary };  // Ensure proper export
