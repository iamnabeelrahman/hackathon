const multer = require("multer");
const path = require('path');

// Set storage engine
const storage = multer.memoryStorage(); 
const uploadFile = (fieldName) => multer({
  storage: storage,
  limits: {
    fileSize: 40 * 2048 * 2048, // 
  },
}).single(fieldName); 

const upload = multer({ storage: storage });

module.exports = { uploadFile, upload };