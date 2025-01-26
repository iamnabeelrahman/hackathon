const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth.route.js");

const app = express();
const corsOptions = {
    origin: '*',  // Allow requests from any origin
    credentials: true,  // Allow sending cookies with requests
  };
  
  app.use(cors(corsOptions));
// console.log("got reeqiest and ehre i am ");
// console.log("CORS enabled for all origins");

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "20kb" }));
app.use(express.static("public"));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World");
});

//routes declaration
app.use("/api/v1/auth", authRoutes);

// app.use('/api/v1/users', userRoutes);

module.exports = { app };
