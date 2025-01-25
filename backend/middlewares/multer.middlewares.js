const multer = require("multer");
const path = require('path');


// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, path.join(__dirname, "../public/temp"));
//   },

//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, file.fieldname + "-" + uniqueSuffix);
//   },
// });

// for deployment
const storage = multer.memoryStorage(); // Use memory storage instead of disk storage
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
}).single("profileImage"); 

// const upload = multer({ storage: storage }).single('profileImage'); 


// const upload = multer({ storage: storage }).fields([{ name: 'profileImage' }]);
module.exports = { upload };