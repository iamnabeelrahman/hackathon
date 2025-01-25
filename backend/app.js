const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require('./routes/auth.route.js');

const app = express();


app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "20kb" }));
app.use(express.static("public"));
app.use(cookieParser());



app.get('/', (req, res) => {
    res.redirect('/register') // will change it to Home once home page is ready
})

//routes declaration
app.use('/api/v1/auth', authRoutes); 

// app.use('/api/v1/users', userRoutes); 

module.exports = { app };
