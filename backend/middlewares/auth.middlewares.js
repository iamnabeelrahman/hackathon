const jwt = require("jsonwebtoken");
const {User} = require("../models/users.model.js");

const verifyJwt = async (req, res, next) => {
    try {
      const token =
        req.cookies?.accessToken ||
        req.header("Authorization")?.replace("Bearer ", "");
        // console.log("Cookies:", req.cookies);

  
      if (!token) {
       return res.status(401).json({
          message: "unauthorized request",
        });
      }
      // console.log("ACCESS_TOKEN_SECRET in use:", process.env.ACCESS_TOKEN_SECRET);

  
      const decodedToken = await jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET
      );
  
      // console.log("Decoded token:", decodedToken);

      const userDetails = await User.findById(decodedToken?._id).select(
        "-password -refreshToken"
      );
  
      if (!userDetails) {
       return res.status(401).json({
          message: "Invalid access token",
        });
      }
      // console.log(userDetails._id);
      
      req.user = userDetails;
      next();
  
    } catch (error) {
    return  res.status(401).json({
        message: "Invalid access token",
      });
    }
  };
  
  module.exports = { verifyJwt };
  