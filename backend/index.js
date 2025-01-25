require('dotenv').config();
// const express = require('express');
const connectDB = require('./config/db.js');
// const cookieParser = require('cookie-parser');
const {app} = require('./app.js');
// const authRoutes = require('./routes/auth.route.js');

connectDB()
.then(() => {
    app.listen(process.env.PORT || 3001, () => {
        console.log(`Server is running in port ${process.env.PORT}`);
        
    })
})
.catch((error) => {
    console.error("Database connection failed:", error);
  });
// // const app = express();
// app.use(express.json()); 
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static('public'));
// app.use(cookieParser());

// app.use('/api/auth', authRoutes);


