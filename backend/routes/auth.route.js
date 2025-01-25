const express = require('express');
const { registerUser, loginUser, logoutUser, refreshAccessToken, updatePassword, updateFullName, updateEmail, updateProfileImage } = require('../controllers/auth.controller.js');
const { Router } = require("express");
const {upload} = require('../middlewares/multer.middlewares.js');
const { verifyJwt } = require('../middlewares/auth.middlewares.js');


const router = Router();

router.route('/register').post(
    upload,
    registerUser);
    router.route("/login").post(loginUser); // login API

    router.route("/logout").delete(verifyJwt, logoutUser);// logout API
    router.route('/new-token').post(refreshAccessToken); // refresh token API
    router.route('/new-password').post(verifyJwt, updatePassword) // update password API
    router.route('/update-fullname').post(verifyJwt, updateFullName) // update fullname API
    router.route('/update-email').post(verifyJwt, updateEmail)  // update email API
    router.route('/update-profileimage').post(verifyJwt, upload, updateProfileImage) // update profile image API


module.exports = router;
