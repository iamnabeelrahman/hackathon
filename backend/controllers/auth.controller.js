const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("../models/users.model.js");
const { registerSchema } = require("../models/zod.models.js");
const ApiError = require("../utils/ApiError.js");
const { uploadOnCloudinary } = require("../utils/cloudinary.js");
const ApiResponse = require("../utils/ApiResponse.js");

const registerUser = async (req, res) => {
  const body = req.body;
  const parsedData = registerSchema.safeParse(body);

  if (!parsedData.success) {
    return res.status(403).json({
      message: "invalid input",
    });
  }

  const userByUsername = await User.findOne({ username: body.username }); 
  const userByEmail = await User.findOne({ email: body.email }); 

  const messages = [];

  if (userByUsername) {
    messages.push("Username already exists");
  }
  if (userByEmail) {
    messages.push("Email already exists");
  }
  if (messages.length > 0) {
    // console.log(messages.join(", "));
    return res.status(409).json({
      messages: messages.join(", "), // Combined messages for user existance
    });
  }

  // const userImageLocalPath = req.files?.profileImage[0]?.path;
  // const profileImage = await uploadOnCloudinary(userImageLocalPath);
  const { buffer, originalname } = req?.file || {}; // Destructure with default empty object if no file
  const fileName = originalname ? `${Date.now()}-${originalname}` : null; // Generate file name only if file exists
  
  let result = null; // Declare result variable
  
  // Check if file exists before attempting to upload
  if (buffer && originalname) {
    result = await uploadOnCloudinary(buffer, fileName);
  }

  const newUser = await User.create({
    username: body.username.toLowerCase(),
    email: body.email,
    fullName: body.fullName,
    password: body.password,
    profileImage: result?.url || "https://img.freepik.com/free-vector/user-blue-gradient_78370-4692.jpg",
  });

  const checkCreatedUser = await User.findById(newUser._id).select(
    "-password -refreshToken"
  );

  if (!checkCreatedUser) {
    return res.status(500).json({
      message: "Something went wrong while registering user",
    });
  }
  res
    .status(201)
    .json(new ApiResponse(201, "User registered successfully", checkCreatedUser));
};

const loginUser = async (req, res) => {
  const body = req.body;

  if (!(body.username || body.email)) {
    return res.status(422).json({
      message: "username or email is required",
    });
  }

  const checkUserExistence = await User.findOne({
    $or: [{ username: body.username }, { email: body.email }],
  });

  if (!checkUserExistence) {
    return res.status(400).json({
      message: "User doesn't exist",
    });
  }

  const validPassword = await checkUserExistence.isPasswordCorrect(
    body.password
  );

  if (!validPassword) {
    return res.status(401).json({
      message: "Invalid user credentials",
    });
  }

  const accessToken = await checkUserExistence.generateAccessToken();
  const refreshToken = await checkUserExistence.generateRefreshToken();

  checkUserExistence.refreshToken = refreshToken;
  await checkUserExistence.save({ validateBeforeSave: false });

  const returnUserDetails = await User.findById(checkUserExistence._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json({
      message: "sign-in successfully",
      user: returnUserDetails,
      success: true,
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
};

const logoutUser = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Clear the refreshToken and update the user in DB
    user.refreshToken = null;
    await user.save({ validateBeforeSave: false });

    // Clear the cookies from the client
    const options = {
      httpOnly: true,
      sameSite: 'None',  // Required for cross-origin requests
      secure: false,  // Set to false for local development (no HTTPS)
    };

    res.clearCookie("accessToken", options);
    res.clearCookie("refreshToken", options);

    return res.status(200).json({
      message: "Logged out successfully",
    });
  } catch (error) {
    // console.log("Logout error:", error);
    res.status(500).json({
      message: "An error occurred while logging out",
    });
  }
};


const refreshAccessToken = async (req, res) => {
  const incomingUserToken = req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingUserToken) {
    return res.status(401).json({
      message: "Unauthorized request. Refresh token is missing.",
    });
  }

  try {
    // Verify the refresh token
    const decodedToken = await jwt.verify(
      incomingUserToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    // Find the user associated with the token
    const userDetails = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    if (!userDetails) {
      return res.status(401).json({
        message: "Invalid refresh token",
      });
    }

    // Generate a new access token
    const accessToken = await userDetails.generateAccessToken();
    const newRefreshToken = await userDetails.generateRefreshToken();

    userDetails.refreshToken = newRefreshToken;
    await userDetails.save({ validateBeforeSave: false });

    // Set cookie options
    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json({
        message: "new access token set sucessfully",
        success: true,
        accessToken,
        refreshToken: newRefreshToken,
      });
  } catch (error) {
    console.error(error);
    return res.status(401).json({
      message: "Invalid or expired refresh token.",
    });
  }
};

const updatePassword = async (req, res) => {
  const { currentPassword, newPassword, confPassword } = req.body;
  const userId = req.user?._id;

  // Check if new password and confirm password match
  if (newPassword !== confPassword) {
    return res.status(400).json({
      success: false,
      message: "New password and confirm password do not match.",
      data: null,
    });
  }

  try {
    // Fetch the user's details
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found!",
        data: null,
      });
    }

    // Verify if the current password is correct
    const isPasswordValid = await user.isPasswordCorrect(currentPassword);
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid current password.",
        data: null,
      });
    }

    // Update and save the new password
    user.password = newPassword;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password updated successfully.",
      data: null,
    });
  } catch (error) {
    console.error("Error changing password:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
      data: null,
    });
  }
};

const updateFullName = async (req, res) => {
  const { firstName, lastName } = req.body;
  const userId = req.user?._id;

  try {
    // Fetch the user's details
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found!",
        data: null,
      });
    }

    // Update and save the new fullName
    user.fullName = firstName + " " + lastName;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Full name updated successfully.",
      data: { fullName: user.fullName },
    });
  } catch (error) {
    console.error("Error updating fullName:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
      data: null,
    });
  }
};

const updateEmail = async (req, res) => {
  const { email } = req.body;
  const userId = req.user?._id;

  try {
    // Fetch the user's details
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found!",
        data: null,
      });
    }

    // Update and save the new email
    user.email = email;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Email updated successfully.",
      data: null,
    });
  } catch (error) {
    console.error("Error updating email:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
      data: null,
    });
  }
};

const updateProfileImage = async (req, res) => {
  // const profileImage = req.file?.path;
  const { buffer, originalname } = req?.file || {}; // Destructure with default empty object if no file
  const fileName = originalname ? `${Date.now()}-${originalname}` : null; // Generate file name only if file exists
  
  let result = null; // Declare result variable
  // Check if file exists before attempting to upload
  if (buffer && originalname) {
    result = await uploadOnCloudinary(buffer, fileName);
  }

  if (!result.url) {
    return res.status(400).json({
      success: false,
      message: "error while uploading profile image",
      data: false,
    });
  }

  await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        profileImage: result.url,
      },
    },
    { new: true }
  ).select("-password -refreshToken");

  return res.status(200).json({
    success: true,
    message: "profileImage updated successfully",
    data: result.url,
  });
};
const uploadResume = async (req, res) => {
  const { buffer, originalname } = req?.file || {};
  const fileName = originalname ? `${Date.now()}-${originalname}` : null; 
  
  let result = null;
  
  // Check if file exists before attempting to upload
  if (buffer && originalname) {
    result = await uploadOnCloudinary(buffer, fileName);
  }
  if (!result.url) {
    return res.status(400).json({
      success: false,
      message: "error while uploading resume",
      data: false,
    });
  }
  await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        resume: result.url,
      },
    },
    { new: true }
  ).select("-password -refreshToken");

  return res.status(200).json({
    success: true,
    message: "resume updated successfully",
    data: result.url,
  });
};

const updatePhoneNumber = async (req, res) => {
  const { phoneNumber } = req.body;
  const userId = req.user?._id;
  if (!phoneNumber) {
    return res.status(400).json({
      success: false,
      message: "Phone number is required.",
      data: null,
    });
  }
  if (!/^\d+$/.test(phoneNumber)) {  // Check if the phoneNumber contains only digits
    return res.status(400).json({
      success: false,
      message: "Phone number must be a valid number.",
      data: null,
    });
  }

  try {
    // Fetch the user's details
    const user = await User.findById(userId);    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found!",
        data: null,
      });
    }
    // Update and save the new phoneNumber
    user.phoneNumber = phoneNumber;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Phone number updated successfully.",
      data: null,
    });
  } catch (error) {
    console.error("Error updating phoneNumber:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
      data: null,
    });
  }
};

const userData = async (req, res) => {
  try {
    // Extract userId from the authenticated user (from the token)
    const userId = req.user?._id;

    if (!userId) {
      return res.status(400).json({
        message: "User ID not found in the request.",
      });
    }

    // Fetch user data from the database using the user ID
    const user = await User.findById(userId).select("-password -refreshToken"); // Exclude password and refreshToken from the response

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    // Send the user data as a response
    return res.status(200).json({
      message: "User data fetched successfully.",
      user,
    });
  } catch (error) {
    // console.log("Error fetching user data: ", error);
    return res.status(500).json({
      message: "An error occurred while fetching user data.",
    });
  }
};



module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  updatePassword,
  updateFullName,
  updateEmail,
  updateProfileImage,
  uploadResume,
  updatePhoneNumber,
  userData
}
