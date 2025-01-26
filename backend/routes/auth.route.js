const express = require('express');
const { registerUser, loginUser, logoutUser, refreshAccessToken, updatePassword, updateFullName, updateEmail, updateProfileImage, uploadResume, updatePhoneNumber } = require('../controllers/auth.controller.js');
const { Router } = require("express");
const {uploadFile} = require('../middlewares/multer.middlewares.js');
const { verifyJwt } = require('../middlewares/auth.middlewares.js');
const { createProject, getAllProjects } = require('../controllers/project.controller.js');


const router = Router();

router.route('/register').post(
    uploadFile('profileImage'),
    registerUser);
    router.route("/login").post(loginUser); // login API

    router.route("/logout").delete(verifyJwt, logoutUser);// logout API
    router.route('/new-token').post(refreshAccessToken); // refresh token API
    router.route('/new-password').post(verifyJwt, updatePassword) // update password API
    router.route('/update-fullname').post(verifyJwt, updateFullName) // update fullname API
    router.route('/update-email').post(verifyJwt, updateEmail)  // update email API
    router.route('/update-profileimage').post(verifyJwt, uploadFile('profileImage'), updateProfileImage) // update profile image API
    router.route("/post-project").post(verifyJwt, uploadFile('thumbnail'), createProject); // post project API
    router.route("/upload-Resume").post(verifyJwt, uploadFile('resume'), uploadResume); // upload resume api
    router.route("/add-phone-number").post(verifyJwt,  updatePhoneNumber); // add phonenumber api
    router.route("/get-project").get( getAllProjects); // create project API


module.exports = router;
