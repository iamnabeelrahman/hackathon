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
      console.error("No file buffer provided.");
      return null;
    }

    // Return a promise for the upload stream
    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { resource_type: "auto", public_id: filename },
        (error, result) => {
          if (error) {
            reject(error); // Reject the promise in case of error
          } else {
            resolve(result); // Resolve the promise with the result
          }
        }
      );

      // Stream the file buffer to Cloudinary
      uploadStream.end(fileBuffer); // Use the end() method to send the buffer
    });

    console.log("File is uploaded", uploadResult.url);
    return uploadResult;

  } catch (error) {
    console.log("Upload failed", error);
    return null;
  }
};

module.exports = { uploadOnCloudinary };
