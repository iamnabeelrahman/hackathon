const multer = require("multer");
const path = require('path');

// Set storage engine
const storage = multer.memoryStorage(); 
const uploadFile = (fieldName) => multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
}).single(fieldName); 



module.exports = { uploadFile };