const cloudinary = require("cloudinary").v2;
const fs = require("fs");

// Function to upload a local file to Cloudinary
const uploadOnCloudinary = async (fileBuffer, filename) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_CLOUD_SECRET,
  });

  try {
    if (!fileBuffer) {
      console.error("No file buffer provided.");
      return null;
    }

    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { resource_type: "auto", public_id: filename },
        (error, result) => {
          if (error) {
            reject(error); 
          } else {
            resolve(result); 
          }
        }
      );

      uploadStream.end(fileBuffer);
    });

    // console.log("File is uploaded", uploadResult.url);
    return uploadResult;

  } catch (error) {
    // console.log("Upload failed", error);
    return null;
  }
};

module.exports = { uploadOnCloudinary };
