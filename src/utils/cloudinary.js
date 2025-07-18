import { v2 as cloudinary } from 'cloudinary';
import {fs} from 'fs';


    // Configuration
    cloudinary.config({ 
        cloud_name: 'process.env.CLOUDINARY_CLOUD_NAME', // Click 'View API Keys' above to copy your cloud namePRO
        api_key: 'process.env.CLOUDINARY_CLOUD_KEY', // Click 'View API Keys' above to copy your API key
        api_secret: 'process.env.CLOUDINARY_API_SECRET' // Click 'View API Keys' above to copy your API secret
    });

const uploadonCloudinary = async (localFilePath) => {

    try{
        if (!localFilePath) return null;
        // upload the file on cloudnary 
        const response = await cloudinary.uploader.upload(localFilePath, {resource_type: 'auto'});

        // file has been uploaded to Cloudinary successfully
        console.log("File uploaded successfully:", response.url);
        return response;

    }catch (error) {
        fs.unlinkSync(localFilePath); // Delete the local file if upload fails
        console.error("Error uploading to Cloudinary:", error); 
        return null; // Return null if upload fails
        throw error;
    }
}


export {uploadonCloudinary}