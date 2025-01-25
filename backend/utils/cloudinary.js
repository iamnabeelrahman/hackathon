const cloudinary = require("cloudinary").v2;
const fs = require("fs");

// Function to upload a local file to Cloudinary
const uploadOnCloudinary = async (fileBuffer, filename) => {
    
  // Configuration
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_CLOUD_SECRET,
  });

  try {
    if (!fileBuffer) {
      console.error("No file path provided.");
      return null;
    }
    const uploadResult = await cloudinary.uploader.upload_stream(
      { resource_type: "auto", public_id: filename },
      (error, result) => {
        if (error) {
          console.log("Upload failed ", error);
          return null;
        }
        console.log("File is uploaded", result.url);
        return result;
      }
    );

    // Stream the file buffer to Cloudinary
    uploadOnCloudinary(fileBuffer);
    return uploadResult;
    
  } catch (error) {

    console.log("Upload failed ", error);
    return null
  }

};
module.exports = { uploadOnCloudinary };




